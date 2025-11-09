import { Process } from '../types'

interface IProps {
  data: Process[]
}

const GanttChart = ({ data }: IProps) => {
  const totalBurstTime = data.reduce((acc, p) => acc + p.burstTime, 0)

  return (
    <div
      className="grid m-6"
      style={{
        gridTemplateColumns: `repeat(${totalBurstTime || 1}, minmax(0, 1fr))`
      }}>
      {data.map((p: Process, index: number) => (
        <div
          key={index}
          className="relative border border-emerald-500/50 bg-emerald-950/30 p-4 flex flex-col items-center justify-center"
          style={{ gridColumn: `span ${p.burstTime}` }}>
          {index === 0 && <div className="absolute -bottom-7 -left-2 text-gray-300">0</div>}
          <div className="absolute -bottom-7 -right-2 text-gray-300">{p.turnaroundTime}</div>
          <p className="font-bold text-xs text-white">{p.name}</p>
          <p className="text-xs text-gray-300">BT: {p.burstTime}</p>
        </div>
      ))}
    </div>
  )
}

export default GanttChart
