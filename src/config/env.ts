import dotenv from 'dotenv'
import {
  ALLOWED_LOG_LEVELS,
  ALLOWED_NODE_ENVS,
  ENV_DEFAULTS
} from '../constants'
import { EnvConfig, LogLevel, NodeEnv } from '../types'

dotenv.config()

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toBoolean = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) return fallback

  const normalized = value.trim().toLowerCase()

  if (normalized === 'true' || normalized === '1') return true
  if (normalized === 'false' || normalized === '0') return false

  throw new Error('Boolean env values must be true/false/1/0')
}

const parseNodeEnv = (value: string | undefined): NodeEnv => {
  const nodeEnv = (value || ENV_DEFAULTS.NODE_ENV).toLowerCase() as NodeEnv

  if ((ALLOWED_NODE_ENVS as readonly string[]).includes(nodeEnv)) {
    return nodeEnv
  }

  throw new Error('NODE_ENV must be one of: development, test, production')
}

const parseLogLevel = (value: string | undefined): LogLevel => {
  const logLevel = (value || ENV_DEFAULTS.LOG_LEVEL).toLowerCase() as LogLevel

  if ((ALLOWED_LOG_LEVELS as readonly string[]).includes(logLevel)) {
    return logLevel
  }

  throw new Error(
    'LOG_LEVEL must be one of: trace, debug, info, warn, error, fatal, silent'
  )
}

const PORT = Number(process.env.PORT ?? ENV_DEFAULTS.PORT)
const RATE_LIMIT_WINDOW_MS = toNumber(
  process.env.RATE_LIMIT_WINDOW_MS,
  ENV_DEFAULTS.RATE_LIMIT_WINDOW_MS
)
const RATE_LIMIT_MAX = toNumber(
  process.env.RATE_LIMIT_MAX,
  ENV_DEFAULTS.RATE_LIMIT_MAX
)
const NODE_ENV = parseNodeEnv(process.env.NODE_ENV)
const LOG_LEVEL = parseLogLevel(process.env.LOG_LEVEL)
const TRUST_PROXY = toBoolean(process.env.TRUST_PROXY, ENV_DEFAULTS.TRUST_PROXY)

if (!Number.isInteger(PORT) || PORT <= 0) {
  throw new Error('PORT must be a valid positive integer')
}

if (!Number.isInteger(RATE_LIMIT_WINDOW_MS) || RATE_LIMIT_WINDOW_MS <= 0) {
  throw new Error('RATE_LIMIT_WINDOW_MS must be a valid positive integer')
}

if (!Number.isInteger(RATE_LIMIT_MAX) || RATE_LIMIT_MAX <= 0) {
  throw new Error('RATE_LIMIT_MAX must be a valid positive integer')
}

const ENV: EnvConfig = {
  PORT,
  NODE_ENV,
  MONGO_URI: process.env.MONGO_URI || ENV_DEFAULTS.MONGO_URI,
  LOG_LEVEL,
  SWAGGER_SERVER_URL: process.env.SWAGGER_SERVER_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN || ENV_DEFAULTS.CORS_ORIGIN,
  TRUST_PROXY,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX
}

export default Object.freeze(ENV)
