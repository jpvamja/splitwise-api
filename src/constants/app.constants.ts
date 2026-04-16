export const APP_NAME = 'Splitwise API'
export const APP_SLUG = 'splitwise-api'
export const API_VERSION = '1.0.0'
export const DEFAULT_SERVER_HOST = '0.0.0.0'

export const ROUTES = {
  ROOT: '/',
  API_BASE: '/api/v1',
  DOCS: '/api-docs',
  DOCS_JSON: '/api-docs.json',
  HEALTH: '/api/v1/health',
  HEALTH_LIVE: '/api/v1/health/live',
  HEALTH_READY: '/api/v1/health/ready'
} as const
