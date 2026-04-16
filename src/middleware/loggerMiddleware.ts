import pinoHttp from 'pino-http'
import crypto from 'node:crypto'
import logger from '../config/logger'

export const loggerHandler = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const requestId = req.headers['x-request-id']
    const normalizedId = Array.isArray(requestId)
      ? (requestId[0] ?? crypto.randomUUID())
      : (requestId ?? crypto.randomUUID())

    res.setHeader('X-Request-Id', normalizedId)
    return normalizedId
  },
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`
  }
})
