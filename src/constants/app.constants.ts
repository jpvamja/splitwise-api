export const APP_NAME = 'Splitwise API'
export const APP_SLUG = 'splitwise-api'
export const API_VERSION = '1.0.0'
export const DEFAULT_SERVER_HOST = '0.0.0.0'

export const ROUTES = {
  ROOT: '/',
  API_BASE: '/api/v1',
  AUTH_BASE: '/auth',
  DOCS: '/api-docs',
  DOCS_JSON: '/api-docs.json',
  HEALTH: '/health',
  HEALTH_LIVE: '/health/live',
  HEALTH_READY: '/health/ready',
  PING: '/ping'
} as const
