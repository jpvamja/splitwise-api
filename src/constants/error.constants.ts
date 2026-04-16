export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CORS_FORBIDDEN: 'CORS_FORBIDDEN',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND'
} as const

export const ERROR_MESSAGES = {
  VALIDATION_FAILED: 'Validation failed',
  CORS_FORBIDDEN: 'Not allowed by CORS',
  TOO_MANY_REQUESTS: 'Too many requests, please try again later.',
  ROUTE_NOT_FOUND: 'Route not found'
} as const
