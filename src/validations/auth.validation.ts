import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password must be at most 128 characters long')

export const registerBodySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters long')
    .max(80, 'Full name must be at most 80 characters long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address'),
  password: passwordSchema
})

export const loginBodySchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required')
})

export const refreshTokenBodySchema = z.object({
  refreshToken: z.string().min(1, 'refreshToken is required')
})

export const updateMeBodySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Full name must be at least 2 characters long')
      .max(80, 'Full name must be at most 80 characters long')
      .optional(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Please provide a valid email address')
      .optional()
  })
  .refine(
    (value) => value.fullName !== undefined || value.email !== undefined,
    {
      message: 'At least one field is required'
    }
  )

export const changePasswordBodySchema = z
  .object({
    currentPassword: z.string().min(1, 'currentPassword is required'),
    newPassword: passwordSchema
  })
  .refine((value) => value.currentPassword !== value.newPassword, {
    message: 'newPassword must be different from currentPassword',
    path: ['newPassword']
  })
