import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TimerForm from '../../components/TimerForm';
import TimerGroup from '../../components/TimerGroup';
import CompletionModal from '../../components/CompletionModal';
import { useTimers } from '../../hooks/useTimers';

export default function TimersScreen() {
  const [showForm, setShowForm] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Set<string>
  >(new Set());
  const {
    timers,
    completedTimer,
    addTimer,
    updateTimer,
    updateTimersByCategory,
    clearCompletedTimer,
  } = useTimers();

  const categories = useMemo(() => {
    const categoryMap = new Map();
    
    timers.forEach((timer) => {
      if (!categoryMap.has(timer.category)) {
        categoryMap.set(timer.category, []);
      }
      categoryMap.get(timer.category).push(timer);
    });

    return Array.from(categoryMap.entries()).map(([category, timers]) => ({
      category,
      timers,
    }));
  }, [timers]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((current) => {
      const updated = new Set(current);
      if (updated.has(category)) {
        updated.delete(category);
      } else {
        updated.add(category);
      }
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {categories.map(({ category, timers }) => (
          <TimerGroup
            key={category}
            category={category}
            timers={timers}
            expanded={expandedCategories.has(category)}
            onToggle={() => toggleCategory(category)}
            onStartAll={() => updateTimersByCategory(category, 'start')}
            onPauseAll={() => updateTimersByCategory(category, 'pause')}
            onResetAll={() => updateTimersByCategory(category, 'reset')}
            onTimerAction={updateTimer}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowForm(true)}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {showForm && (
        <View style={styles.modal}>
          <TimerForm
            onSubmit={addTimer}
            onClose={() => setShowForm(false)}
          />
        </View>
      )}

      {completedTimer && (
        <CompletionModal
          timerName={completedTimer.name}
          onClose={clearCompletedTimer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});