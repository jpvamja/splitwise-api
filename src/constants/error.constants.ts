export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CORS_FORBIDDEN: 'CORS_FORBIDDEN',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
  USER_NOT_FOUND: 'USER_NOT_FOUND'
} as const

export const ERROR_MESSAGES = {
  VALIDATION_FAILED: 'Validation failed',
  CORS_FORBIDDEN: 'Not allowed by CORS',
  TOO_MANY_REQUESTS: 'Too many requests, please try again later.',
  ROUTE_NOT_FOUND: 'Route not found',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized',
  INVALID_REFRESH_TOKEN: 'Invalid or expired refresh token',
  USER_NOT_FOUND: 'User not found'
} as const
