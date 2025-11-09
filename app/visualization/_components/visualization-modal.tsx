import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Process } from '../types'
import { ArrowDown, ChevronLeft, ChevronRight, X } from 'lucide-react'
import ProcessTable from './process-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/ui/glass-button'

interface Flow extends Process {
  status: 'waiting' | 'done'
  currentBurstTime: number
}

interface IProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFinish: () => void
  step: number
  currentStepVisualization: number
  onPreviousStep: () => void
  onNextStep: () => void
  process: Process[]
  table: Process[]
  ganttChart: Process[]
  averageWaitingTime: number
  averageTurnaroundTime: number
  processFlow: Flow[][]
  algorithm: 'fcfs' | 'sjf' | 'rr'
}

const VisualizationModal = ({
  open,
  onOpenChange,
  ganttChart,
  onFinish,
  onNextStep,
  onPreviousStep,
  step,
  currentStepVisualization,
  process = [],
  table,
  averageWaitingTime,
  averageTurnaroundTime,
  processFlow
}: IProps) => {
  const totalBurstTime = process.reduce((acc, p) => acc + p.burstTime, 0)
  const currentFlowStep = processFlow[currentStepVisualization] || []

  console.log('Current Flow Step:', currentFlowStep)

  console.log({ ganttChart, process, table, step, currentStepVisualization, onFinish, processFlow, currentFlowStep })

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-6xl w-full mx-auto space-y-4 bg-[#0b1d28] border-4 border-[#032b23] min-h-[600px] max-h-[700px] overflow-y-auto">
        <button
          className="hidden sm:block absolute top-6 right-6"
          onClick={() => {
            onOpenChange(false)
          }}>
          <X />
        </button>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Visualisasi Process - Step {currentStepVisualization} of {processFlow.length > 0 ? processFlow.length - 1 : 0}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {currentStepVisualization === 0
              ? 'Initial state - All processes are waiting'
              : `Step ${currentStepVisualization}: ${
                  currentFlowStep.find((p) => p.status === 'done' && p.currentBurstTime === 0)?.name || 'Processing'
                } completed`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-10">
          <div className="border border-emerald-500/30 rounded-lg">
            <Table className="min-w-full max-w-full overflow-x-auto">
              <TableHeader>
                <TableRow className="hover:bg-emerald-950/30 border-emerald-500/30">
                  <TableHead className="text-emerald-400 font-semibold text-center">Process Name</TableHead>
                  <TableHead className="text-emerald-400 font-semibold text-center">Original Burst Time</TableHead>
                  <TableHead className="text-emerald-400 font-semibold text-center">Current Burst Time</TableHead>
                  <TableHead className="text-emerald-400 font-semibold text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFlowStep.length > 0 ? (
                  [...currentFlowStep]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((flowProcess: Flow) => (
                      <TableRow key={flowProcess.id} className="hover:bg-emerald-950/30 border-emerald-500/30">
                        <TableCell className="text-center font-semibold text-white">{flowProcess.name}</TableCell>
                        <TableCell className="text-center text-gray-200">
                          {process.find((p) => p.id === flowProcess.id)?.burstTime || 0}
                        </TableCell>
                        <TableCell className="text-center text-gray-200">
                          <span className={cn(flowProcess.currentBurstTime === 0 && 'text-green-500 font-bold')}>
                            {flowProcess.currentBurstTime}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-semibold',
                              flowProcess.status === 'done'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            )}>
                            {flowProcess.status === 'done' ? 'Done' : 'Waiting'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-400">
                      No data available for this step
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div>
            <div
              className="grid m-6 pt-32"
              style={{
                gridTemplateColumns: `repeat(${totalBurstTime || 1}, minmax(0, 1fr))`
              }}>
              {ganttChart.map((p: Process, index: number) => (
                <div
                  key={index}
                  className={cn(
                    'relative border border-emerald-500/50 bg-emerald-950/30 p-4 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out',
                    index + 1 > currentStepVisualization && 'opacity-5'
                  )}
                  style={{ gridColumn: `span ${p.burstTime}` }}>
                  <div
                    className={cn(
                      'absolute -top-36 bg-[#032b23] rounded-md border border-emerald-500/50 font-bold w-max p-4 transition-opacity duration-500 ease-in-out',
                      currentStepVisualization === index + 1 ? 'opacity-100' : 'opacity-0'
                    )}>
                    <div className="relative">
                      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
                        <ArrowDown className="animate-bounce w-6 h-6 text-emerald-400" />
                      </div>
                      <ul className="flex flex-col gap-1 text-xs text-white">
                        <li>Waiting Time: {p.waitingTime}</li>
                        <li>Burst Time: {p.burstTime}</li>
                        <li>Turnaround Time: {p.turnaroundTime}</li>
                      </ul>
                    </div>
                  </div>
                  {index === 0 && <div className="absolute -bottom-7 -left-2 text-gray-300">0</div>}
                  <div className="absolute -bottom-7 -right-2 text-gray-300">{p.turnaroundTime}</div>
                  <p className="font-bold text-xs text-white">{p.name}</p>
                  <p className="text-xs text-gray-300">BT: {p.burstTime}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 pt-5">
              <GlassButton className="gap-2" disabled={currentStepVisualization <= 0} onClick={() => onPreviousStep()}>
                <ChevronLeft className="w-4 h-4 text-white" />
                Previous
              </GlassButton>
              <span className="text-sm text-gray-300">
                Step {currentStepVisualization} / {processFlow.length > 0 ? processFlow.length - 1 : 0}
              </span>
              <GlassButton
                className="gap-2"
                disabled={currentStepVisualization >= (processFlow.length > 0 ? processFlow.length - 1 : 0)}
                onClick={() => onNextStep()}>
                Next
                <ChevronRight className="w-4 h-4 text-white" />
              </GlassButton>
            </div>
          </div>
          {currentStepVisualization === processFlow.length - 1 && (
            <ProcessTable
              averageWaitingTime={averageWaitingTime}
              averageTurnaroundTime={averageTurnaroundTime}
              data={table}
            />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default VisualizationModal
