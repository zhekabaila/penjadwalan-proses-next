import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Play, Plus, Trash2 } from 'lucide-react'
import { ALGORITHMS } from '../_constants'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
      <AlertDialogContent
        overlayClassName="bg-black/70"
        className="sm:max-w-2xl w-full mx-auto space-y-4 bg-[#0b1d28] border-4 border-[#032b23] min-h-[600px] max-h-[85vh] overflow-y-auto">
        {/* <button
          className="hidden sm:block absolute top-6 right-6"
          onClick={() => {
            onOpenChange(false)
          }}>
          <X />
        </button> */}
        <AlertDialogHeader>
          <AlertDialogTitle className="m-0 p-0">Enter Process</AlertDialogTitle>
          <AlertDialogDescription className="m-0 p-0">Add a new process with name and burst time.</AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="border border-emerald-500/30 rounded-lg">
              <Table className="min-w-full max-w-full overflow-x-auto">
                <TableHeader>
                  <TableRow className="hover:bg-emerald-950/30 border-emerald-500/30">
                    <TableHead className="text-emerald-400 font-semibold text-center">Process Name</TableHead>
                    <TableHead className="text-emerald-400 font-semibold text-center">Burst Time</TableHead>
                    <TableHead className="text-emerald-400 font-semibold text-center w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.watch('process').map((p, index) => (
                    <TableRow key={p.id} className="hover:bg-emerald-950/30 border-emerald-500/30">
                      <TableCell className="text-center">
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
                                  placeholder={'P' + (index + 1)}
                                  className={cn(
                                    'text-center border-none border-transparent focus-visible:ring-0',
                                    fieldState.error && 'caret-destructive'
                                  )}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <FormField
                          control={form.control}
                          name={`process.${index}.burstTime`}
                          render={({ field, fieldState }) => (
                            <FormItem className="space-y-0">
                              <FormLabel className="sr-only">Burst Time</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  autoComplete="off"
                                  placeholder="Burst Time"
                                  className={cn(
                                    'text-center border-none border-transparent focus-visible:ring-0',
                                    fieldState.error && 'caret-destructive'
                                  )}
                                  onChange={(e) => {
                                    if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
                                      field.onChange(Number(e.target.value))
                                    }
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="w-7 h-7"
                            onClick={() => handleRemoveProcess(p.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <GlassButton type="button" onClick={() => handleAddProcess()} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New Process
              </GlassButton>
            </div>

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
                    <p className="font-semibold text-white">{algo.shortName}</p>
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
