import { z } from 'zod'

export const pingQuerySchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'message is required')
    .max(100, 'message must be at most 100 characters')
    .optional()
})
