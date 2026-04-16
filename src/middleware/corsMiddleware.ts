import cors from 'cors'
import ENV from '../config/env'
import ApiError from '../utils/apiError'
import { ERROR_CODES, ERROR_MESSAGES } from '../constants'

const allowedOrigins = ENV.CORS_ORIGIN.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const allowAllOrigins = allowedOrigins.includes('*')

export default cors({
  origin(origin, callback) {
    if (!origin) {
      callback(null, true)
      return
    }

    if (allowAllOrigins || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(
      new ApiError(403, ERROR_MESSAGES.CORS_FORBIDDEN, {
        code: ERROR_CODES.CORS_FORBIDDEN
      })
    )
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: !allowAllOrigins,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  exposedHeaders: ['X-Request-Id']
})
