'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Process {
  id: string
  name: string
  burstTime: number
  turnaroundTime?: number
  waitingTime?: number
}

const DEFAULT_PROCESSES: Process[] = [
  { id: '1', name: 'A', burstTime: 8 },
  { id: '2', name: 'B', burstTime: 3 },
  { id: '3', name: 'C', burstTime: 5 },
  { id: '4', name: 'D', burstTime: 9 }
]

const ALGORITHMS = [
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

interface AlgorithmStateValues {
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

const VisualizationLayout = () => {
  const [process, setProcess] = useState<Process[]>(DEFAULT_PROCESSES)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string[]>(['fcfs', 'sjf', 'rr'])
  const [kwantan, setKwantan] = useState<number>(5)

  //? Algorithm State
  const [algorithmState, setAlgorithmState] = useState<AlgorithmStateValues>({})

  const handleProcessChange = (id: string, field: keyof Process, value: string | number) => {
    setProcess((prevProcesses) => prevProcesses.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const isAlgorithmSelected = (id: string) => selectedAlgorithm.includes(id)

  const handleAlgorithmToggle = (id: string) => {
    if (isAlgorithmSelected(id)) {
      setSelectedAlgorithm((prev) => prev.filter((algoId) => algoId !== id))
    } else {
      setSelectedAlgorithm((prev) => [...prev, id])
    }
  }

  const sortingProcessByBurstTime = (processParams: Process[]): Process[] => {
    return [...processParams].sort((a, b) => a.burstTime - b.burstTime)
  }

  const handleVisualizationStart = () => {
    // Logic to start the visualization based on selected processes and algorithms
    console.log('Starting visualization with:', { process, selectedAlgorithm })

    selectedAlgorithm.forEach((algoId) => {
      switch (algoId) {
        case 'fcfs':
          handleFCFSVisualization()
          break
        case 'sjf':
          handleSJFVisualization()
          break
        case 'rr':
          handleRRVisualization()
          break
        default:
          break
      }
    })
  }

  const handleFCFSVisualization = () => {
    // Logic for FCFS visualization
    const tempProcess = process.map((p) => ({ ...p }))

    const result = handleCalculateGanttChart(tempProcess)

    setAlgorithmState((prev) => ({
      ...prev,
      fcfs: {
        ganttChart: result,
        table: result,
        averageTurnaroundTime: result.reduce((acc, p) => acc + (p.turnaroundTime || 0), 0) / result.length,
        averageWaitingTime: result.reduce((acc, p) => acc + (p.waitingTime || 0), 0) / result.length
      }
    }))
  }

  const handleRRVisualization = () => {
    // Logic for Round Robin visualization

    console.log('Starting Round Robin Visualization with kwantan:', kwantan, process)

    // Simpan burst time asli untuk perhitungan akhir
    const originalBurstTimes = new Map(process.map((p) => [p.id, p.burstTime]))

    // Copy untuk manipulasi sisa burst time
    const remainingBurstTimes = process.map((p) => ({ ...p }))

    // Untuk gantt chart
    const ganttChart: Process[] = []

    let currentTime = 0
    let allProcessCompleted = false

    while (!allProcessCompleted) {
      allProcessCompleted = true

      for (let i = 0; i < remainingBurstTimes.length; i++) {
        const p = remainingBurstTimes[i]

        if (p.burstTime > 0) {
          allProcessCompleted = false

          // Tentukan berapa lama proses akan berjalan di round ini
          const executeTime = Math.min(p.burstTime, kwantan)

          // Tambahkan ke gantt chart
          ganttChart.push({
            id: p.id,
            name: p.name,
            burstTime: executeTime,
            turnaroundTime: currentTime + executeTime,
            waitingTime: currentTime + executeTime - (process.find((proc) => proc.id === p.id)?.burstTime || 0)
          })

          // Update waktu dan sisa burst time
          currentTime += executeTime
          p.burstTime -= executeTime
        }
      }
    }

    // Hitung turnaround time dan waiting time untuk setiap proses
    const processStats = new Map<string, { turnaroundTime: number; waitingTime: number }>()

    process.forEach((p) => {
      // Cari eksekusi terakhir dari proses ini di gantt chart
      const lastExecution = ganttChart.filter((g) => g.id === p.id).pop()

      if (lastExecution) {
        const turnaroundTime = lastExecution.turnaroundTime || 0
        const originalBurst = originalBurstTimes.get(p.id) || 0
        const waitingTime = turnaroundTime - originalBurst

        processStats.set(p.id, {
          turnaroundTime,
          waitingTime
        })
      }
    })

    // Buat table data dengan statistik lengkap
    const tableData = process.map((p) => {
      const stats = processStats.get(p.id)
      return {
        ...p,
        burstTime: originalBurstTimes.get(p.id) || p.burstTime,
        turnaroundTime: stats?.turnaroundTime || 0,
        waitingTime: stats?.waitingTime || 0
      }
    })

    const avgWaitingTime = tableData.reduce((acc, p) => acc + (p.waitingTime || 0), 0) / tableData.length
    const avgTurnaroundTime = tableData.reduce((acc, p) => acc + (p.turnaroundTime || 0), 0) / tableData.length

    setAlgorithmState((prev) => ({
      ...prev,
      rr: {
        ganttChart: ganttChart,
        table: tableData,
        averageWaitingTime: avgWaitingTime,
        averageTurnaroundTime: avgTurnaroundTime
      }
    }))

    console.log('Round Robin Gantt Chart:', ganttChart)
    console.log('Round Robin Table:', tableData)
  }

  const handleSJFVisualization = () => {
    const tempProcess = process.map((p) => ({ ...p }))
    const sortedProcess = sortingProcessByBurstTime(tempProcess)
    const result = handleCalculateGanttChart(sortedProcess)

    console.log('Sorted Process for SJF:', result)
    setAlgorithmState((prev) => ({
      ...prev,
      sjf: {
        ganttChart: result,
        table: result,
        averageWaitingTime: result.reduce((acc, p) => acc + (p.waitingTime || 0), 0) / result.length,
        averageTurnaroundTime: result.reduce((acc, p) => acc + (p.turnaroundTime || 0), 0) / result.length
      }
    }))
    console.log('Sorted SJF Process:', result)
  }

  const handleCalculateGanttChart = (processParams: Process[]): Process[] => {
    let currentTime = 0

    for (let i = 0; i < processParams.length; i++) {
      const tat = currentTime + (processParams[i]?.burstTime || 0)
      const wt = currentTime

      currentTime += processParams[i]?.burstTime || 0

      processParams[i].turnaroundTime = tat
      processParams[i].waitingTime = wt
    }

    return processParams
  }

  return (
    <div className="my-40 container mx-auto">
      <h1>Process Visualization</h1>
      <ul className="flex flex-col gap-2 max-w-[600px]">
        {process.map((p) => (
          <li key={p.id} className="grid grid-cols-2 gap-4">
            <Input
              defaultValue={p.name}
              onChange={(event) => {
                handleProcessChange(p.id, 'name', (event.target as HTMLInputElement).value)
              }}
            />
            <div className="flex items-center gap-2">
              <Input
                defaultValue={p.burstTime}
                type="number"
                onChange={(event) => {
                  handleProcessChange(p.id, 'burstTime', Number((event.target as HTMLInputElement).value))
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setProcess((prev) => prev.filter((proc) => proc.id !== p.id))}>
                <Trash2 className="" />
              </Button>
            </div>
          </li>
        ))}
        <li>
          <Button onClick={() => setProcess([...process, { id: Date.now().toString(), name: '', burstTime: 0 }])}>
            Add New Process +
          </Button>
        </li>
      </ul>

      <ul className="flex flex-col gap-2 mt-7">
        {ALGORITHMS.map((algo) => (
          <li key={algo.id} className="flex items-center gap-2">
            <Checkbox
              className="accent-foreground border-foreground"
              checked={isAlgorithmSelected(algo.id)}
              onCheckedChange={() => {
                handleAlgorithmToggle(algo.id)
              }}
            />
            <div className="flex flex-col gap-px">
              <p className="font-medium">{algo.shortName}</p>
              <p className="text-sm font-light">{algo.name}</p>
            </div>
            {algo.id === 'rr' && isAlgorithmSelected('rr') && (
              <Input
                className="w-20 ml-4"
                type="number"
                value={kwantan}
                onChange={(e) => setKwantan(Number((e.target as HTMLInputElement).value))}
                placeholder="Kwantan"
              />
            )}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            handleVisualizationStart()
          }}>
          Start Visualization
        </Button>
      </div>

      {/* Visualization Results */}
      <div className="grid grid-cols-1 gap-8 mt-10">
        {selectedAlgorithm.includes('fcfs') && algorithmState.fcfs && (
          <div className="border border-foreground p-2">
            <h2>FCFS Visualization</h2>
            <div className="mt-3">
              <h3>Gantt Chart</h3>
              <div
                className="grid m-6"
                style={{
                  gridTemplateColumns: `repeat(${algorithmState.fcfs.ganttChart?.length || 1}, minmax(0, 1fr))`
                }}>
                {algorithmState.fcfs.ganttChart?.map((p: Process, index: number) => (
                  <div
                    key={index}
                    className="relative border border-foreground p-4 flex flex-col items-center justify-center">
                    {index === 0 && <div className="absolute -bottom-7 -left-2">0</div>}
                    <div className="absolute -bottom-7 -right-2">{p.turnaroundTime}</div>
                    <p className="font-bold">{p.name}</p>
                    <p>Burst Time: {p.burstTime}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h3>Table</h3>
              <div className="grid m-6">
                <Table className="min-w-full max-w-full overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Process</TableHead>
                      <TableHead>Burst Time</TableHead>
                      <TableHead>Waiting Time</TableHead>
                      <TableHead>Turnaround Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {algorithmState.fcfs.table?.map((p: Process) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.burstTime}</TableCell>
                        <TableCell>{p.waitingTime}</TableCell>
                        <TableCell>{p.turnaroundTime}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold" colSpan={2}>
                        Rata-rata
                      </TableCell>
                      <TableCell className="font-bold">{algorithmState.fcfs.averageWaitingTime?.toFixed(2)}</TableCell>
                      <TableCell className="font-bold">{algorithmState.fcfs.averageTurnaroundTime?.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {selectedAlgorithm.includes('sjf') && algorithmState.sjf && (
          <div className="border border-foreground p-2">
            <h2>SJF Visualization</h2>
            <div className="mt-3">
              <h3>Gantt Chart</h3>
              <div
                className="grid m-6"
                style={{
                  gridTemplateColumns: `repeat(${algorithmState.sjf.ganttChart?.length || 1}, minmax(0, 1fr))`
                }}>
                {algorithmState.sjf.ganttChart?.map((p: Process, index: number) => (
                  <div
                    key={index}
                    className="relative border border-foreground p-4 flex flex-col items-center justify-center">
                    {index === 0 && <div className="absolute -bottom-7 -left-2">0</div>}
                    <div className="absolute -bottom-7 -right-2">{p.turnaroundTime}</div>
                    <p className="font-bold">{p.name}</p>
                    <p>Burst Time: {p.burstTime}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h3>Table</h3>
              <div className="grid m-6">
                <Table className="min-w-full max-w-full overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Process</TableHead>
                      <TableHead>Burst Time</TableHead>
                      <TableHead>Waiting Time</TableHead>
                      <TableHead>Turnaround Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {algorithmState.sjf.table
                      ?.sort((a, b) => a.name.localeCompare(b.name))
                      .map((p: Process) => (
                        <TableRow key={p.id}>
                          <TableCell>{p.name}</TableCell>
                          <TableCell>{p.burstTime}</TableCell>
                          <TableCell>{p.waitingTime}</TableCell>
                          <TableCell>{p.turnaroundTime}</TableCell>
                        </TableRow>
                      ))}
                    <TableRow>
                      <TableCell className="font-bold" colSpan={2}>
                        Rata-rata
                      </TableCell>
                      <TableCell className="font-bold">{algorithmState.sjf.averageWaitingTime?.toFixed(2)}</TableCell>
                      <TableCell className="font-bold">{algorithmState.sjf.averageTurnaroundTime?.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {selectedAlgorithm.includes('rr') && algorithmState.rr && (
          <div className="border border-foreground p-2">
            <h2>Round Robin Visualization</h2>
            <div className="mt-3">
              <h3>Gantt Chart</h3>
              <div
                className="grid m-6"
                style={{
                  gridTemplateColumns: `repeat(${algorithmState.rr.ganttChart?.length || 1}, minmax(0, 1fr))`
                }}>
                {algorithmState.rr.ganttChart?.map((p: Process, index: number) => (
                  <div
                    key={index}
                    className="relative border border-foreground p-4 flex flex-col items-center justify-center">
                    {index === 0 && <div className="absolute -bottom-7 -left-2">0</div>}
                    <div className="absolute -bottom-7 -right-2">{p.turnaroundTime}</div>
                    <p className="font-bold">{p.name}</p>
                    <p>Burst Time: {p.burstTime}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h3>Table</h3>
              <div className="grid m-6">
                <Table className="min-w-full max-w-full overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Process</TableHead>
                      <TableHead>Burst Time</TableHead>
                      <TableHead>Waiting Time</TableHead>
                      <TableHead>Turnaround Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {algorithmState.rr.table?.map((p: Process) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.burstTime}</TableCell>
                        <TableCell>{p.waitingTime}</TableCell>
                        <TableCell>{p.turnaroundTime}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold" colSpan={2}>
                        Rata-rata
                      </TableCell>
                      <TableCell className="font-bold">{algorithmState.rr.averageWaitingTime?.toFixed(2)}</TableCell>
                      <TableCell className="font-bold">{algorithmState.rr.averageTurnaroundTime?.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VisualizationLayout
