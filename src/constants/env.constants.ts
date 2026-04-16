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
  JWT_ACCESS_SECRET: 'replace_with_secure_access_secret',
  JWT_REFRESH_SECRET: 'replace_with_secure_refresh_secret',
  JWT_ACCESS_EXPIRES_IN: '15m',
  JWT_REFRESH_EXPIRES_IN: '7d',
  BCRYPT_SALT_ROUNDS: 10,
  CORS_ORIGIN: 'http://localhost:3000',
  TRUST_PROXY: false,
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000,
  RATE_LIMIT_MAX: 200
} as const
