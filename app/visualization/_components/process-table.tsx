import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Process } from '../types'
import { cn } from '@/lib/utils'

interface IProps {
  data: Process[]
  averageWaitingTime: number
  averageTurnaroundTime: number
  show?: boolean
}

const ProcessTable = ({ data, averageWaitingTime, averageTurnaroundTime, show = true }: IProps) => {
  return (
    <div className={cn('grid border border-emerald-500/30 rounded-lg', !show && 'opacity-10')}>
      <Table className="min-w-full max-w-full overflow-x-auto">
        <TableHeader>
          <TableRow className="hover:bg-emerald-950/30 border-emerald-500/30">
            <TableHead className="text-emerald-400 font-semibold text-center">Process</TableHead>
            <TableHead className="text-emerald-400 font-semibold text-center">Burst Time</TableHead>
            <TableHead className="text-emerald-400 font-semibold text-center">Waiting Time</TableHead>
            <TableHead className="text-emerald-400 font-semibold text-center">Turnaround Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p: Process) => (
            <TableRow key={p.id} className="hover:bg-emerald-950/30 border-emerald-500/30">
              <TableCell className="text-center font-semibold text-white">{p.name}</TableCell>
              <TableCell className="text-center text-gray-200">{p.burstTime}</TableCell>
              <TableCell className="text-center text-gray-200">{p.waitingTime}</TableCell>
              <TableCell className="text-center text-gray-200">{p.turnaroundTime}</TableCell>
            </TableRow>
          ))}
          <TableRow className="hover:bg-emerald-950/30 border-emerald-500/30">
            <TableCell className="text-center font-bold text-emerald-400" colSpan={2}>
              Rata-rata
            </TableCell>
            <TableCell className="text-center font-bold text-emerald-400">{averageWaitingTime.toFixed(2)}</TableCell>
            <TableCell className="text-center font-bold text-emerald-400">{averageTurnaroundTime.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ProcessTable
