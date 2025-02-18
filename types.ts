
export type TimerStatus = 'completed' | 'idle' | 'running' | 'paused';

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: TimerStatus;
  createdAt: number;
}

export interface TimerHistory {
  id: string;
  name: string;
  category: string;
  duration: number;
  completedAt: number;
}