export type ApiErrorOptions = {
  code?: string
  details?: unknown
}

class ApiError extends Error {
  public readonly statusCode: number
  public readonly success: boolean
  public readonly isOperational: boolean
  public readonly code: string | undefined
  public readonly details: unknown | undefined

  constructor(
    statusCode: number,
    message = 'Something went wrong',
    options: ApiErrorOptions = {}
  ) {
    super(message)

    this.name = 'ApiError'
    this.statusCode = statusCode
    this.success = false
    this.isOperational = statusCode >= 400 && statusCode < 500
    this.code = options.code
    this.details = options.details

    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
