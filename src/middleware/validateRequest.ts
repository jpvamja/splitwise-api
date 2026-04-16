import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/apiError'
import { ERROR_CODES, ERROR_MESSAGES } from '../constants'
import { ValidationIssue, ValidationSchemaShape } from '../types'

const formatValidationError = (issues: ValidationIssue[]) => {
  return issues.map((issue) => ({
    field: issue.path.map((segment) => String(segment)).join('.'),
    message: issue.message
  }))
}

const validateRequest = (schema: ValidationSchemaShape) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (schema.body) {
      const parsedBody = schema.body.safeParse(req.body)
      if (!parsedBody.success) {
        next(
          new ApiError(400, ERROR_MESSAGES.VALIDATION_FAILED, {
            code: ERROR_CODES.VALIDATION_ERROR,
            details: formatValidationError(parsedBody.error.issues)
          })
        )
        return
      }
      req.body = parsedBody.data
    }

    if (schema.params) {
      const parsedParams = schema.params.safeParse(req.params)
      if (!parsedParams.success) {
        next(
          new ApiError(400, ERROR_MESSAGES.VALIDATION_FAILED, {
            code: ERROR_CODES.VALIDATION_ERROR,
            details: formatValidationError(parsedParams.error.issues)
          })
        )
        return
      }
      req.params = parsedParams.data as Request['params']
    }

    if (schema.query) {
      const parsedQuery = schema.query.safeParse(req.query)
      if (!parsedQuery.success) {
        next(
          new ApiError(400, ERROR_MESSAGES.VALIDATION_FAILED, {
            code: ERROR_CODES.VALIDATION_ERROR,
            details: formatValidationError(parsedQuery.error.issues)
          })
        )
        return
      }
      req.query = parsedQuery.data as Request['query']
    }

    next()
  }
}

export default validateRequest
