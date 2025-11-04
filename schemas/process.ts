import { z } from 'zod'

export const processModel = z.object({
  id: z.string({ required_error: 'Process ID is required' }),
  name: z
    .string({ required_error: 'Process name is required' })
    .min(1, 'Process name cannot be empty')
    .refine(
      (val) => {
        return val.trim().length > 0
      },
      { message: 'Process name cannot be empty or whitespace' }
    )
    .refine(
      (val) => {
        return !/\s/.test(val)
      },
      { message: 'Process name cannot contain spaces' }
    )
    .refine(
      (val) => {
        return /^[a-zA-Z0-9_-]+$/.test(val)
      },
      { message: 'Process name can only contain alphanumeric characters, underscores, or hyphens' }
    )
    .refine(
      (val) => {
        return val.length <= 10
      },
      { message: 'Process name cannot exceed 10 characters' }
    ),
  burstTime: z.number({ required_error: 'Burst time is required' }).min(1),
  turnaroundTime: z.number().optional(),
  waitingTime: z.number().optional()
})

export const processSchema = z
  .object({
    process: z.array(processModel).default([])
  })
  .superRefine((data, ctx) => {
    const names = data.process.map((p) => p.name.toLowerCase())
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index)

    if (duplicates.length > 0) {
      data.process.forEach((p, index) => {
        if (duplicates.includes(p.name.toLowerCase())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Process name must be unique',
            path: ['process', index, 'name']
          })
        }
      })
    }
  })
