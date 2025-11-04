export interface Process {
  id: string
  name: string
  burstTime: number
  turnaroundTime?: number
  waitingTime?: number
}

export interface AlgorithmStateValues {
  sjf?: {
    ganttChart?: Process[]
    table?: Process[]
    averageWaitingTime?: number
    averageTurnaroundTime?: number
  }
  fcfs?: {
    ganttChart?: Process[]
    table?: Process[]
    averageWaitingTime?: number
    averageTurnaroundTime?: number
  }
  rr?: {
    ganttChart?: Process[]
    table?: Process[]
    averageWaitingTime?: number
    averageTurnaroundTime?: number
  }
}