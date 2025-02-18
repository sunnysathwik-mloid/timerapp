import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TimerItem from './TimerItem';
import { Timer } from '../types';

type TimerGroupProps = {
  category: string;
  timers: Timer[];
  expanded: boolean;
  onToggle: () => void;
  onStartAll: () => void;
  onPauseAll: () => void;
  onResetAll: () => void;
  onTimerAction: (
    timerId: string,
    action: 'start' | 'pause' | 'reset'
  ) => void;
};

export default function TimerGroup({
  category,
  timers,
  expanded,
  onToggle,
  onStartAll,
  onPauseAll,
  onResetAll,
  onTimerAction,
}: TimerGroupProps) {
  const hasRunningTimers = timers.some(
    (timer) => timer.status === 'running'
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={onToggle}>
        <View style={styles.titleContainer}>
          <Ionicons
            name={expanded ? 'chevron-down' : 'chevron-forward'}
            size={20}
            color="#007AFF"
          />
          <Text style={styles.title}>{category}</Text>
          <Text style={styles.count}>({timers.length})</Text>
        </View>

        <View style={styles.groupControls}>
          {hasRunningTimers ? (
            <TouchableOpacity
              style={styles.groupButton}
              onPress={onPauseAll}>
              <Ionicons name="pause" size={16} color="#007AFF" />
              <Text style={styles.groupButtonText}>Pause All</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.groupButton}
              onPress={onStartAll}>
              <Ionicons name="play" size={16} color="#007AFF" />
              <Text style={styles.groupButtonText}>Start All</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.groupButton}
            onPress={onResetAll}>
            <Ionicons name="refresh" size={16} color="#007AFF" />
            <Text style={styles.groupButtonText}>Reset All</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.timerList}>
          {timers.map((timer) => (
            <TimerItem
              key={timer.id}
              {...timer}
              onStart={() => onTimerAction(timer.id, 'start')}
              onPause={() => onTimerAction(timer.id, 'pause')}
              onReset={() => onTimerAction(timer.id, 'reset')}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  count: {
    fontSize: 16,
    color: '#8E8E93',
  },
  groupControls: {
    flexDirection: 'row',
    gap: 8,
  },
  groupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  groupButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
  timerList: {
    padding: 16,
    paddingTop: 0,
  },
});