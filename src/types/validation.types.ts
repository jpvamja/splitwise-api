import { ZodTypeAny } from 'zod'

export type ValidationSchemaShape = {
  body?: ZodTypeAny
  params?: ZodTypeAny
  query?: ZodTypeAny
}

export type ValidationIssue = {
  path: PropertyKey[]
  message: string
}

export type FormattedValidationIssue = {
  field: string
  message: string
}
