import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Check, Play, Plus, Trash2 } from 'lucide-react'
import { ALGORITHMS } from '../_constants'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import z from 'zod'
import { processSchema } from '@/schemas/process'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/ui/glass-button'
import { Label } from '@/components/ui/label'

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
          <AlertDialogTitle className="m-0 p-0">Masukkan Proses</AlertDialogTitle>
          <AlertDialogDescription className="m-0 p-0">
            Tambahkan proses baru dengan nama dan burst time.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="border border-emerald-500/30 rounded-lg">
              <Table className="min-w-full max-w-full overflow-x-auto">
                <TableHeader>
                  <TableRow className="hover:bg-emerald-950/30 border-emerald-500/30">
                    <TableHead className="text-emerald-400 font-semibold text-center">Nama Proses</TableHead>
                    <TableHead className="text-emerald-400 font-semibold text-center">Burst Time</TableHead>
                    <TableHead className="text-emerald-400 font-semibold text-center w-[100px]">Aksi</TableHead>
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
                              <FormLabel className="sr-only">Nama Proses</FormLabel>
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
              <GlassButton variant="outline" type="button" onClick={() => handleAddProcess()} className="w-full">
                <Plus className="w-4 h-4 mr-1" />
                Tambahkan Proses Baru
              </GlassButton>
            </div>

            <ul className="grid grid-cols-3 gap-3 sm:gap-4 mt-2">
              {ALGORITHMS.map((algo) => (
                <li
                  key={algo.id}
                  className={cn(
                    'relative flex flex-col items-center gap-2 border rounded-lg p-2 cursor-pointer',
                    isAlgorithmSelected(algo.id)
                      ? 'bg-emerald-950/30 border-emerald-500/30'
                      : 'bg-emerald-900/10 border-emerald-500/10'
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleAlgorithmToggle(algo.id)
                  }}>
                  <div className="flex items-center justify-center h-4 w-4 shrink-0 rounded-sm border shadow accent-emerald-400 border-emerald-500 mt-1">
                    {isAlgorithmSelected(algo.id) && <Check className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <div className="flex flex-col gap-px text-center">
                      <p className="font-semibold text-white">{algo.shortName}</p>
                      <p className="text-sm font-light text-gray-300">{algo.name}</p>
                    </div>
                    {algo.id === 'rr' && (
                      <div className="flex items-center gap-4">
                        <Label className="text-sm text-gray-300">Kwanta:</Label>
                        <Input
                          className="w-20 p-px h-auto border-0 border-b border-b-emerald-500/30 bg-transparent focus-visible:ring-0 focus-visible:border-0 focus-visible:border-b focus-visible:border-b-emerald-500 rounded-none"
                          type="text"
                          value={kwantan}
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                          }}
                          onChange={(e) => {
                            if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
                              setKwantan(Number((e.target as HTMLInputElement).value))
                            }
                          }}
                          placeholder="Kwantan"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <AlertDialogFooter className="sm:col-span-2">
              {/* <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false)
              }}
              className="w-full sm:w-auto"
              type="button">
              Cancel
            </Button> */}
              <GlassButton className="flex items-center justify-center gap-2" type="submit">
                <Play className="w-4 h-4 text-white" />
                Mulai
              </GlassButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProcessForm
