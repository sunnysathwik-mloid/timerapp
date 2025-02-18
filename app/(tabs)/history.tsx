import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTimers } from '../../hooks/useTimers';

export default function HistoryScreen() {
  const { history } = useTimers();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes === 0) {
      return `${seconds} seconds`;
    }
    if (remainingSeconds === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Timer History</Text>
        
        {history.map((entry) => (
          <View key={entry.id} style={styles.historyItem}>
            <View style={styles.header}>
              <Text style={styles.name}>{entry.name}</Text>
              <Text style={styles.category}>{entry.category}</Text>
            </View>
            
            <View style={styles.details}>
              <Text style={styles.time}>
                Completed: {formatDate(entry.completedAt)}
              </Text>
              <Text style={styles.duration}>
                Duration: {formatDuration(entry.duration)}
              </Text>
            </View>
          </View>
        ))}

        {history.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No completed timers yet. Start a timer to see its history here!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  historyItem: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  category: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#E5F0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  details: {
    gap: 4,
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
  },
  duration: {
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});