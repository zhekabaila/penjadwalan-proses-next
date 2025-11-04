import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Process } from '../types'

interface IProps {
  data: Process[]
  averageWaitingTime: number
  averageTurnaroundTime: number
}

const ProcessTable = ({ data, averageWaitingTime, averageTurnaroundTime }: IProps) => {
  return (
    <div className="grid border border-white rounded-lg">
      <Table className="min-w-full max-w-full overflow-x-auto">
        <TableHeader>
          <TableRow className="hover:bg-foreground/10">
            <TableHead className="text-foreground text-center">Process</TableHead>
            <TableHead className="text-foreground text-center">Burst Time</TableHead>
            <TableHead className="text-foreground text-center">Waiting Time</TableHead>
            <TableHead className="text-foreground text-center">Turnaround Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p: Process) => (
            <TableRow key={p.id} className="hover:bg-foreground/10">
              <TableCell className="text-center">{p.name}</TableCell>
              <TableCell className="text-center">{p.burstTime}</TableCell>
              <TableCell className="text-center">{p.waitingTime}</TableCell>
              <TableCell className="text-center">{p.turnaroundTime}</TableCell>
            </TableRow>
          ))}
          <TableRow className="hover:bg-foreground/10">
            <TableCell className="font-bold text-center" colSpan={2}>
              Rata-rata
            </TableCell>
            <TableCell className="font-bold text-center">{averageWaitingTime.toFixed(2)}</TableCell>
            <TableCell className="font-bold text-center">{averageTurnaroundTime.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ProcessTable
