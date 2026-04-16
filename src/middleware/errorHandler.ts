import { Request, Response } from 'express'
import ENV from '../config/env'
import logger from '../config/logger'
import ApiError from '../utils/apiError'
import { AppErrorLike } from '../types'

export const errorHandler = (err: unknown, _req: Request, res: Response) => {
  logger.error({ err }, 'Unhandled application error')

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      ...(ENV.NODE_ENV !== 'production' && err.details !== undefined
        ? { details: err.details }
        : {})
    })
    return
  }

  const appError = err as AppErrorLike
  const statusCode = appError.statusCode || appError.status || 500
  const isOperationalError = statusCode >= 400 && statusCode < 500
  const message = appError.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message: isOperationalError ? message : 'Internal Server Error',
    code: appError.code,
    ...(ENV.NODE_ENV !== 'production' && { details: message })
  })
}
