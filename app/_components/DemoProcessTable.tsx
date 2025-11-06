'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Data yang sudah dihitung sebelumnya untuk setiap algoritma
const precomputedData = {
  fcfs: {
    caption: 'Example of First-Come, First-Served results.',
    processes: [
      { name: 'P1', burstTime: 6, waitingTime: 0, turnaroundTime: 6 },
      { name: 'P2', burstTime: 2, waitingTime: 6, turnaroundTime: 8 },
      { name: 'P3', burstTime: 8, waitingTime: 8, turnaroundTime: 16 },
      { name: 'P4', burstTime: 3, waitingTime: 16, turnaroundTime: 19 },
      { name: 'P5', burstTime: 4, waitingTime: 19, turnaroundTime: 23 },
    ],
    avgWaitingTime: 9.8,
    avgTurnaroundTime: 14.4,
  },
  sjf: {
    caption: 'Example of Shortest Job First results.',
    processes: [
      { name: 'P2', burstTime: 2, waitingTime: 0, turnaroundTime: 2 },
      { name: 'P4', burstTime: 3, waitingTime: 2, turnaroundTime: 5 },
      { name: 'P5', burstTime: 4, waitingTime: 5, turnaroundTime: 9 },
      { name: 'P1', burstTime: 6, waitingTime: 9, turnaroundTime: 15 },
      { name: 'P3', burstTime: 8, waitingTime: 15, turnaroundTime: 23 },
    ],
    avgWaitingTime: 6.2,
    avgTurnaroundTime: 10.8,
  },
  priority: {
    caption: 'Example of Priority Scheduling results.',
    processes: [
      { name: 'P2', burstTime: 2, waitingTime: 0, turnaroundTime: 2 },
      { name: 'P1', burstTime: 6, waitingTime: 2, turnaroundTime: 8 },
      { name: 'P4', burstTime: 3, waitingTime: 8, turnaroundTime: 11 },
      { name: 'P5', burstTime: 4, waitingTime: 11, turnaroundTime: 15 },
      { name: 'P3', burstTime: 8, waitingTime: 15, turnaroundTime: 23 },
    ],
    avgWaitingTime: 7.2,
    avgTurnaroundTime: 11.8,
  },
  roundrobin: {
    caption: 'Example of Round Robin (Quantum=2) results.',
    processes: [
      { name: 'P1', burstTime: 6, waitingTime: 9, turnaroundTime: 15 },
      { name: 'P2', burstTime: 2, waitingTime: 2, turnaroundTime: 4 },
      { name: 'P3', burstTime: 8, waitingTime: 15, turnaroundTime: 23 },
      { name: 'P4', burstTime: 3, waitingTime: 9, turnaroundTime: 12 },
      { name: 'P5', burstTime: 4, waitingTime: 13, turnaroundTime: 17 },
    ],
    avgWaitingTime: 9.6,
    avgTurnaroundTime: 14.2,
  },
}

interface DemoProcessTableProps {
  algorithm: keyof typeof precomputedData
}

export function DemoProcessTable({ algorithm }: DemoProcessTableProps) {
  const data = precomputedData[algorithm]

  return (
    <div className="overflow-x-auto rounded-xl border border-border/30 p-4 bg-background/30 backdrop-blur-sm">
      <Table>
        <TableCaption>{data.caption}</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-white/20">
            <TableHead className="text-white">Process</TableHead>
            <TableHead className="text-white">Burst Time</TableHead>
            <TableHead className="text-white">Waiting Time</TableHead>
            <TableHead className="text-white">Turnaround Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.processes.map((p) => (
            <TableRow key={p.name} className="hover:bg-white/5 border-white/20">
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.burstTime}</TableCell>
              <TableCell>{p.waitingTime}</TableCell>
              <TableCell>{p.turnaroundTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end gap-x-8 text-sm font-medium pr-4">
        <span>Avg. Waiting Time: {data.avgWaitingTime.toFixed(2)}</span>
        <span>Avg. Turnaround Time: {data.avgTurnaroundTime.toFixed(2)}</span>
      </div>
    </div>
  )
}
