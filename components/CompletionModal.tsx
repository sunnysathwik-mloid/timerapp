import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CompletionModalProps = {
  timerName: string;
  onClose: () => void;
};

export default function CompletionModal({
  timerName,
  onClose,
}: CompletionModalProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}>
          <Ionicons name="close" size={24} color="#8E8E93" />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={64} color="#34C759" />
        </View>
        
        <Text style={styles.title}>Timer Complete!</Text>
        <Text style={styles.message}>
          Congratulations! Your timer "{timerName}" has finished.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: Platform.OS === 'web' ? 400 : '90%',
    maxWidth: 400,
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});