export type ErrorCode = string

export type AppErrorLike = {
  status?: number
  statusCode?: number
  message?: string
  code?: ErrorCode
}

export type ErrorResponseBody = {
  success: false
  message: string
  code?: ErrorCode
  details?: unknown
}

export type SuccessResponseBody<T> = {
  success: true
  message: string
  data: T
}
