import rateLimit from 'express-rate-limit'
import ENV from '../config/env'
import { ERROR_MESSAGES, ROUTES } from '../constants'

export default rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max: ENV.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return (
      req.path.startsWith(`${ROUTES.API_BASE}${ROUTES.HEALTH}`) ||
      req.path.startsWith(ROUTES.DOCS) ||
      req.path === ROUTES.DOCS_JSON
    )
  },
  message: {
    success: false,
    message: ERROR_MESSAGES.TOO_MANY_REQUESTS
  }
})
