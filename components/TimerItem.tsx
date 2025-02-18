import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type TimerItemProps = {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export default function TimerItem({
  name,
  duration,
  remainingTime,
  status,
  onStart,
  onPause,
  onReset,
}: TimerItemProps) {
  const progress = remainingTime / duration;

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress * 100}%`,
  }));

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{formatTime(remainingTime)}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            progressStyle,
            status === 'completed' && styles.completed,
          ]}
        />
      </View>

      <View style={styles.controls}>
        {status === 'idle' || status === 'paused' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={onStart}>
            <Ionicons name="play" size={20} color="#007AFF" />
          </TouchableOpacity>
        ) : status === 'running' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={onPause}>
            <Ionicons name="pause" size={20} color="#007AFF" />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={onReset}>
          <Ionicons name="refresh" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  time: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  completed: {
    backgroundColor: '#34C759',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
});