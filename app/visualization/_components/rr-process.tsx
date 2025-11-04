import ProcessTable from './process-table'
import { Process } from '../types'
import GanttChart from './gantt-chart'

interface IProps {
  ganttChart: Process[]
  table: Process[]
  averageTurnaroundTime: number
  averageWaitingTime: number
}

const RRProcess = ({ ganttChart, table, averageTurnaroundTime, averageWaitingTime }: IProps) => {
  return (
    <div className="rounded-xl text-foreground shadow bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 overflow-hidden group h-full p-5">
      <h2 className="font-semibold text-lg">RR Visualization</h2>
      <div className="mt-6">
        <h3 className="font-semibold">Gantt Chart</h3>
        <GanttChart data={ganttChart} />
      </div>

      <div className="mt-16">
        <h2 className="font-semibold text-lg mb-6">Table</h2>
        <ProcessTable data={table} averageTurnaroundTime={averageTurnaroundTime} averageWaitingTime={averageWaitingTime} />
      </div>
    </div>
  )
}

export default RRProcess
