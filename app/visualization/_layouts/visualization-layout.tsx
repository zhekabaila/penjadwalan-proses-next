'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { AlgorithmStateValues, Process } from '../types'
import { DEFAULT_PROCESSES } from '../_constants'
import ProcessForm from '../_components/process-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { processSchema } from '@/schemas/process'
import z from 'zod'
import FCFSProcess from '../_components/fcfs-process'
import SJFProcess from '../_components/sjf-process'
import RRProcess from '../_components/rr-process'
import { GlassButton } from '@/components/ui/glass-button'
import VisualizationModal from '../_components/visualization-modal'

interface Flow extends Process {
  status: 'waiting' | 'done'
  currentBurstTime: number
}

interface ProcessFlow {
  fcfs?: Flow[][]
  sjf?: Flow[][]
  rr?: Flow[][]
}

const VisualizationLayout = () => {
  const form = useForm<z.infer<typeof processSchema>>({
    resolver: zodResolver(processSchema),
    defaultValues: {
      process: DEFAULT_PROCESSES
    }
  })

  const [startVisualization, setStartVisualization] = useState<boolean>(false)
  const [visualizationStep, setVisualizationStep] = useState<number>(0)
  const [currentStepVisualization, setCurrentStepVisualization] = useState<number>(1)
  const [visualizationAlgorithm, setVisualizationAlgorithm] = useState<'fcfs' | 'sjf' | 'rr'>('fcfs')
  const [processFlow, setProcessFlow] = useState<ProcessFlow>({})

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string[]>(['fcfs', 'sjf', 'rr'])
  const [kwantan, setKwantan] = useState<number>(5)

  const [showResults, setShowResults] = useState<boolean>(false)

  //? Algorithm State
  const [algorithmState, setAlgorithmState] = useState<AlgorithmStateValues>({})

  const handleAddProcess = () => {
    const currentProcess = form.getValues('process')
    form.setValue('process', [...currentProcess, { id: Date.now().toString(), name: '', burstTime: 0 }])
  }

  const handleRemoveProcess = (id: string) => {
    const currentProcess = form.getValues('process')
    form.setValue(
      'process',
      currentProcess.filter((proc) => proc.id !== id)
    )
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
    const process = form.getValues('process')
    // Logic to start the visualization based on selected processes and algorithms
    console.log('Starting visualization with:', { process, selectedAlgorithm })

    selectedAlgorithm.forEach((algoId) => {
      switch (algoId) {
        case 'fcfs':
          handleFCFSVisualization(process)
          break
        case 'sjf':
          handleSJFVisualization(process)
          break
        case 'rr':
          handleRRVisualization(process)
          break
        default:
          break
      }
    })
  }

  const handleFCFSVisualization = (process: Process[]) => {
    // Logic for FCFS visualization
    const tempProcess = process.map((p) => ({ ...p }))

    const result = handleCalculateGanttChart(tempProcess, 'fcfs')

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

  const handleRRVisualization = (process: Process[]) => {
    // Logic for Round Robin visualization

    console.log('Starting Round Robin Visualization with kwantan:', kwantan, process)

    // Simpan burst time asli untuk perhitungan akhir
    const originalBurstTimes = new Map(process.map((p) => [p.id, p.burstTime]))

    // Copy untuk manipulasi sisa burst time
    const remainingBurstTimes = process.map((p) => ({ ...p }))

    // Untuk gantt chart
    const ganttChart: Process[] = []

    // Untuk flow steps RR
    const flowSteps: Flow[][] = []

    // Initial state - semua proses waiting
    const processFlow: Flow[] = process.map((p) => ({
      ...p,
      status: 'waiting' as const,
      currentBurstTime: p.burstTime,
      turnaroundTime: 0,
      waitingTime: 0
    }))

    flowSteps.push(JSON.parse(JSON.stringify(processFlow)))

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

          // Update process flow untuk step ini
          const currentProcessFlow = processFlow.map((pf) => {
            if (pf.id === remainingBurstTimes[i].id) {
              return {
                ...pf,
                currentBurstTime: p.burstTime,
                status: p.burstTime === 0 ? ('done' as const) : ('waiting' as const),
                turnaroundTime: p.burstTime === 0 ? currentTime : pf.turnaroundTime
              }
            }
            return pf
          })

          processFlow.splice(0, processFlow.length, ...currentProcessFlow)
          flowSteps.push(JSON.parse(JSON.stringify(processFlow)))
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

    // Simpan flow steps untuk RR
    setProcessFlow((prev) => ({
      ...prev,
      rr: flowSteps
    }))

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
    console.log('Round Robin Flow Steps:', flowSteps)
  }

  const handleSJFVisualization = (process: Process[]) => {
    const tempProcess = process.map((p) => ({ ...p }))
    const sortedProcess = sortingProcessByBurstTime(tempProcess)
    const result = handleCalculateGanttChart(sortedProcess, 'sjf')

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

  const handleCalculateGanttChart = (processParams: Process[], algorithm: 'fcfs' | 'sjf' | 'rr'): Process[] => {
    let currentTime = 0
    const flowSteps: Flow[][] = []

    // Initialize all processes dengan status waiting
    const processFlow: Flow[] = processParams.map((p) => ({
      ...p,
      status: 'waiting' as const,
      currentBurstTime: p.burstTime,
      turnaroundTime: 0,
      waitingTime: 0
    }))

    // Step 0: Initial state (semua proses waiting)
    flowSteps.push(JSON.parse(JSON.stringify(processFlow)))

    // Proses setiap task satu per satu
    for (let i = 0; i < processFlow.length; i++) {
      const tat = currentTime + (processFlow[i]?.burstTime || 0)
      const wt = currentTime

      currentTime += processFlow[i]?.burstTime || 0

      // Update process yang sedang dieksekusi
      processFlow[i].turnaroundTime = tat
      processFlow[i].waitingTime = wt
      processFlow[i].status = 'done'
      processFlow[i].currentBurstTime = 0

      // Simpan snapshot setelah proses selesai
      flowSteps.push(JSON.parse(JSON.stringify(processFlow)))
    }

    // Update process flow state setelah semua selesai
    setProcessFlow((prev) => ({
      ...prev,
      [algorithm]: flowSteps
    }))

    return processFlow
  }

  console.log('Process Flow State:', processFlow)

  return (
    <>
      <VisualizationModal
        open={startVisualization}
        onOpenChange={(open) => setStartVisualization(open)}
        averageTurnaroundTime={algorithmState[visualizationAlgorithm]?.averageTurnaroundTime || 0}
        averageWaitingTime={algorithmState[visualizationAlgorithm]?.averageWaitingTime || 0}
        ganttChart={algorithmState[visualizationAlgorithm]?.ganttChart || []}
        table={algorithmState[visualizationAlgorithm]?.table || []}
        onFinish={() => {
          setStartVisualization(false)
          setVisualizationStep(0)
          setCurrentStepVisualization(0)
        }}
        onNextStep={() => {
          setCurrentStepVisualization((prev) => prev + 1)
        }}
        onPreviousStep={() => {
          setCurrentStepVisualization((prev) => prev - 1)
        }}
        process={form.getValues('process')}
        processFlow={processFlow[visualizationAlgorithm] || []}
        step={visualizationStep}
        currentStepVisualization={currentStepVisualization}
        algorithm={visualizationAlgorithm}
      />
      <ProcessForm
        open={!showResults}
        onOpenChange={(open) => setShowResults(!open)}
        handleAlgorithmToggle={handleAlgorithmToggle}
        onSubmit={() => {
          setShowResults(true)
          handleVisualizationStart()
        }}
        isAlgorithmSelected={isAlgorithmSelected}
        handleAddProcess={handleAddProcess}
        handleRemoveProcess={handleRemoveProcess}
        form={form}
        kwantan={kwantan}
        setKwantan={setKwantan}
      />
      {showResults && (
        <div className="my-40 container mx-auto">
          <div className="rounded-xl text-foreground shadow bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300 overflow-hidden group h-full p-5">
            <div className="border border-foreground rounded-lg">
              <Table className="min-w-full max-w-full overflow-x-auto">
                <TableHeader>
                  <TableRow className="hover:bg-foreground/5">
                    <TableHead className="text-foreground text-center">Process Name</TableHead>
                    <TableHead className="text-foreground text-center">Burst Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(form.watch('process') || []).map((p: Process) => (
                    <TableRow key={p.id} className="hover:bg-foreground/5">
                      <TableCell className="text-center">{p.name}</TableCell>
                      <TableCell>{p.burstTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <GlassButton
              className="mt-4"
              onClick={() => {
                setShowResults(false)
              }}>
              Edit Process
            </GlassButton>
          </div>

          {/* Visualization Results */}
          <div className="grid grid-cols-1 gap-8 mt-10">
            {selectedAlgorithm.includes('fcfs') && algorithmState.fcfs && (
              <FCFSProcess
                ganttChart={algorithmState.fcfs.ganttChart || []}
                table={algorithmState.fcfs.table || []}
                averageTurnaroundTime={algorithmState.fcfs.averageTurnaroundTime || 0}
                averageWaitingTime={algorithmState.fcfs.averageWaitingTime || 0}
                onClickVisualize={() => {
                  setVisualizationStep((processFlow.fcfs?.length || 1) - 1)
                  setVisualizationAlgorithm('fcfs')
                  setCurrentStepVisualization(0)
                  setStartVisualization(true)
                }}
              />
            )}

            {selectedAlgorithm.includes('sjf') && algorithmState.sjf && (
              <SJFProcess
                ganttChart={algorithmState.sjf.ganttChart || []}
                table={(algorithmState.sjf.table || []).sort((a, b) => a.name.localeCompare(b.name))}
                averageTurnaroundTime={algorithmState.sjf.averageTurnaroundTime || 0}
                averageWaitingTime={algorithmState.sjf.averageWaitingTime || 0}
                onClickVisualize={() => {
                  setVisualizationStep((processFlow.sjf?.length || 1) - 1)
                  setVisualizationAlgorithm('sjf')
                  setCurrentStepVisualization(0)
                  setStartVisualization(true)
                }}
              />
            )}

            {selectedAlgorithm.includes('rr') && algorithmState.rr && (
              <RRProcess
                ganttChart={algorithmState.rr.ganttChart || []}
                table={algorithmState.rr.table || []}
                averageTurnaroundTime={algorithmState.rr.averageTurnaroundTime || 0}
                averageWaitingTime={algorithmState.rr.averageWaitingTime || 0}
                onClickVisualize={() => {
                  setVisualizationStep((processFlow.rr?.length || 1) - 1)
                  setVisualizationAlgorithm('rr')
                  setCurrentStepVisualization(0)
                  setStartVisualization(true)
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default VisualizationLayout
