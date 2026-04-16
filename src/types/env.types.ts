import { ALLOWED_LOG_LEVELS, ALLOWED_NODE_ENVS } from '../constants'

export type NodeEnv = (typeof ALLOWED_NODE_ENVS)[number]
export type LogLevel = (typeof ALLOWED_LOG_LEVELS)[number]

export type EnvConfig = {
  PORT: number
  NODE_ENV: NodeEnv
  MONGO_URI: string
  LOG_LEVEL: LogLevel
  JWT_ACCESS_SECRET: string
  JWT_REFRESH_SECRET: string
  JWT_ACCESS_EXPIRES_IN: string
  JWT_REFRESH_EXPIRES_IN: string
  BCRYPT_SALT_ROUNDS: number
  SWAGGER_SERVER_URL: string | undefined
  CORS_ORIGIN: string
  TRUST_PROXY: boolean
  RATE_LIMIT_WINDOW_MS: number
  RATE_LIMIT_MAX: number
}
