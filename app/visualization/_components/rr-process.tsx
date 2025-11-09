import ProcessTable from './process-table'
import { Process } from '../types'
import GanttChart from './gantt-chart'
import { GlassButton } from '@/components/ui/glass-button'
import { Play } from 'lucide-react'

interface IProps {
  ganttChart: Process[]
  table: Process[]
  averageTurnaroundTime: number
  averageWaitingTime: number
  onClickVisualize: () => void
}

const RRProcess = ({ ganttChart, table, averageTurnaroundTime, averageWaitingTime, onClickVisualize }: IProps) => {
  return (
    <div className="rounded-xl text-white shadow bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 overflow-hidden group h-full p-5">
      <h2 className="font-semibold text-lg text-white">RR Visualization</h2>
      <div className="mt-6">
        <h3 className="font-semibold text-emerald-400">Gantt Chart</h3>
        <GanttChart data={ganttChart} />
      </div>

      <div className="mt-16">
        <h2 className="font-semibold text-lg mb-6 text-white">Table</h2>
        <ProcessTable data={table} averageTurnaroundTime={averageTurnaroundTime} averageWaitingTime={averageWaitingTime} />
      </div>

      <GlassButton
        className="mt-4 gap-2"
        onClick={() => {
          onClickVisualize()
        }}>
        <Play className="w-4 h-4 text-white" />
        Visualize
      </GlassButton>
    </div>
  )
}

export default RRProcess
