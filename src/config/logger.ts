import pino from 'pino'
import ENV from './env'

const logger = pino({
  level: ENV.LOG_LEVEL,
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie'],
    remove: true
  }
})

export default logger
