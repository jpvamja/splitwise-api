export const ALLOWED_NODE_ENVS = ['development', 'test', 'production'] as const

export const ALLOWED_LOG_LEVELS = [
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
  'silent'
] as const

export const ENV_DEFAULTS = {
  PORT: 8000,
  NODE_ENV: 'development',
  MONGO_URI: 'mongodb://localhost:27017/splitwise',
  LOG_LEVEL: 'info',
  CORS_ORIGIN: 'http://localhost:3000',
  TRUST_PROXY: false,
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000,
  RATE_LIMIT_MAX: 200
} as const
