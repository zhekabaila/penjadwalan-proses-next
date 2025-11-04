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
          className="relative border border-foreground p-4 flex flex-col items-center justify-center"
          style={{ gridColumn: `span ${p.burstTime}` }}>
          {index === 0 && <div className="absolute -bottom-7 -left-2">0</div>}
          <div className="absolute -bottom-7 -right-2">{p.turnaroundTime}</div>
          <p className="font-bold text-xs">{p.name}</p>
          <p className="text-xs">Burst Time: {p.burstTime}</p>
        </div>
      ))}
    </div>
  )
}

export default GanttChart
