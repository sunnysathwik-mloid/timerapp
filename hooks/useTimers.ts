import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, TimerHistory } from '../types';

const TIMERS_STORAGE_KEY = '@timers';
const HISTORY_STORAGE_KEY = '@timer_history';

export function useTimers() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [history, setHistory] = useState<TimerHistory[]>([]);
  const [completedTimer, setCompletedTimer] = useState<Timer | null>(null);

  useEffect(() => {
    loadTimers();
    loadHistory();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((currentTimers) => {
        let updated = false;
        const newTimers = currentTimers.map((timer) => {
          if (timer.status === 'running' && timer.remainingTime > 0) {
            updated = true;
            const newRemainingTime = timer.remainingTime - 1;
            
            if (newRemainingTime === 0) {
              setCompletedTimer(timer);
              const historyEntry: TimerHistory = {
                id: Math.random().toString(36).substr(2, 9),
                name: timer.name,
                category: timer.category,
                duration: timer.duration,
                completedAt: Date.now(),
              };
              setHistory((current) => {
                const updated = [historyEntry, ...current];
                saveHistory(updated);
                return updated;
              });
              return { ...timer, remainingTime: newRemainingTime, status: 'completed' as const };
            }
            
            return { ...timer, remainingTime: newRemainingTime };
          }
          return timer;
        });
        
        if (updated) {
          saveTimers(newTimers);
          return newTimers;
        }
        return currentTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadTimers = async () => {
    try {
      const stored = await AsyncStorage.getItem(TIMERS_STORAGE_KEY);
      if (stored) {
        setTimers(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveTimers = async (timersToSave: Timer[]) => {
    try {
      await AsyncStorage.setItem(
        TIMERS_STORAGE_KEY,
        JSON.stringify(timersToSave)
      );
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  };

  const saveHistory = async (historyToSave: TimerHistory[]) => {
    try {
      await AsyncStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(historyToSave)
      );
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const addTimer = useCallback((timer: Omit<Timer, 'id' | 'status' | 'remainingTime' | 'createdAt'>) => {
    const newTimer: Timer = {
      ...timer,
      id: Math.random().toString(36).substr(2, 9),
      status: 'idle',
      remainingTime: timer.duration,
      createdAt: Date.now(),
    };

    setTimers((current) => {
      const updated = [...current, newTimer];
      saveTimers(updated);
      return updated;
    });
  }, []);

  const updateTimer = useCallback((timerId: string, action: 'start' | 'pause' | 'reset') => {
    setTimers((current) => {
      const updated = current.map((timer) => {
        if (timer.id === timerId) {
          switch (action) {
            case 'start':
              return { ...timer, status: 'running' as const };
            case 'pause':
              return { ...timer, status: 'paused' as const };
            case 'reset':
              return {
                ...timer,
                status: 'idle' as const,
                remainingTime: timer.duration,
              };
            default:
              return timer;
          }
        }
        return timer;
      });
      saveTimers(updated);
      return updated;
    });
  }, []);

  const updateTimersByCategory = useCallback((category: string, action: 'start' | 'pause' | 'reset') => {
    setTimers((current) => {
      const updated = current.map((timer) => {
        if (timer.category === category) {
          switch (action) {
            case 'start':
              return { ...timer, status: 'running' as const };
            case 'pause':
              return { ...timer, status: 'paused' as const };
            case 'reset':
              return {
                ...timer,
                status: 'idle' as const,
                remainingTime: timer.duration,
              };
            default:
              return timer;
          }
        }
        return timer;
      });
      saveTimers(updated);
      return updated;
    });
  }, []);

  const clearCompletedTimer = useCallback(() => {
    setCompletedTimer(null);
  }, []);

  return {
    timers,
    history,
    completedTimer,
    addTimer,
    updateTimer,
    updateTimersByCategory,
    clearCompletedTimer,
  };
}