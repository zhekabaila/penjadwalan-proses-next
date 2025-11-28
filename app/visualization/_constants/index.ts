import { Process } from '../types'

export const DEFAULT_PROCESSES: Process[] = [
  { id: '1', name: '', burstTime: 0 },
  { id: '2', name: '', burstTime: 0 },
  { id: '3', name: '', burstTime: 0 },
  { id: '4', name: '', burstTime: 0 }
]

export const DEFAULT_PROCESSES_OLD: Process[] = [
  { id: '1', name: 'A', burstTime: 8 },
  { id: '2', name: 'B', burstTime: 3 },
  { id: '3', name: 'C', burstTime: 5 },
  { id: '4', name: 'D', burstTime: 9 }
]

export const ALGORITHMS = [
  {
    id: 'fcfs',
    name: 'First Come First Serve',
    shortName: 'FCFS'
  },
  {
    id: 'sjf',
    name: 'Shortest Job First',
    shortName: 'SJF'
  },
  {
    id: 'rr',
    name: 'Round Robin',
    shortName: 'Round Robin'
  }
] as const
