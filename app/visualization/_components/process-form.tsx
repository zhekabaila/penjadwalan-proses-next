import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Play, Trash2 } from 'lucide-react'
import { ALGORITHMS } from '../_constants'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import z from 'zod'
import { processSchema } from '@/schemas/process'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/ui/glass-button'

interface IProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  handleAlgorithmToggle: (id: string) => void
  onSubmit: () => void
  isAlgorithmSelected: (id: string) => boolean
  handleAddProcess: () => void
  handleRemoveProcess: (id: string) => void
  form: UseFormReturn<z.infer<typeof processSchema>>
  kwantan: number
  setKwantan: (value: number) => void
}

const ProcessForm = ({
  open,
  onOpenChange,
  handleAlgorithmToggle,
  onSubmit,
  isAlgorithmSelected,
  handleAddProcess,
  handleRemoveProcess,
  form,
  kwantan,
  setKwantan
}: IProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-2xl w-full mx-auto space-y-4 bg-[#0b1d28] border-4 border-[#032b23] min-h-[600px] max-h-[700px] overflow-y-auto">
        {/* <button
          className="hidden sm:block absolute top-6 right-6"
          onClick={() => {
            onOpenChange(false)
          }}>
          <X />
        </button> */}
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Process</AlertDialogTitle>
          <AlertDialogDescription>Add a new process with name and burst time.</AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <ul className="flex flex-col gap-2">
              {form.watch('process').map((p, index) => (
                <li key={p.id} className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`process.${index}.name`}
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-0">
                        <FormLabel className="sr-only">Process Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Process Name"
                            className={cn(fieldState.error && 'border-destructive focus-visible:ring-destructive')}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`process.${index}.burstTime`}
                      render={({ field, fieldState }) => (
                        <FormItem className="flex-1 space-y-0">
                          <FormLabel className="sr-only">Burst Time</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              autoComplete="off"
                              placeholder="Burst Time"
                              className={cn(fieldState.error && 'border-destructive focus-visible:ring-destructive')}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveProcess(p.id)}>
                      <Trash2 className="" />
                    </Button>
                  </div>
                </li>
              ))}
              <li>
                <Button type="button" onClick={() => handleAddProcess()}>
                  Add New Process +
                </Button>
              </li>
            </ul>

            <ul className="flex flex-col gap-2 mt-7">
              {ALGORITHMS.map((algo) => (
                <li key={algo.id} className="flex items-center gap-2">
                  <Checkbox
                    className="accent-emerald-400 border-emerald-500"
                    checked={isAlgorithmSelected(algo.id)}
                    onCheckedChange={() => {
                      handleAlgorithmToggle(algo.id)
                    }}
                  />
                  <div className="flex flex-col gap-px">
                    <p className="font-medium text-white">{algo.shortName}</p>
                    <p className="text-sm font-light text-gray-300">{algo.name}</p>
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

            <AlertDialogFooter className="sm:col-span-2 pt-4">
              {/* <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false)
              }}
              className="w-full sm:w-auto"
              type="button">
              Cancel
            </Button> */}
              <GlassButton className="w-full sm:w-auto flex items-center gap-2" type="submit">
                <Play className="w-4 h-4 text-white" />
                Start
              </GlassButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProcessForm
