import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { router } from './routes/index.routes'
import { swaggerSpec, swaggerUiOptions } from './config/swagger'
import ENV from './config/env'
import { ApiError, ApiResponse } from './utils'
import { APP_NAME, ERROR_CODES, ROUTES } from './constants'

import { errorHandler } from './middleware/errorHandler'
import { loggerHandler } from './middleware/loggerMiddleware'
import helmetMiddleware from './middleware/helmetMiddleware'
import corsMiddleware from './middleware/corsMiddleware'
import rateLimitMiddleware from './middleware/rateLimitHandler'

const app = express()

if (ENV.TRUST_PROXY) {
  app.set('trust proxy', 1)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerHandler)
app.use(helmetMiddleware)
app.use(corsMiddleware)
app.use(rateLimitMiddleware)

app.use(
  ROUTES.DOCS,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
)
app.get(ROUTES.DOCS_JSON, (_req, res) => {
  res.json(swaggerSpec)
})

app.use(ROUTES.API_BASE, router)

app.get(ROUTES.ROOT, (_req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        docs: ROUTES.DOCS,
        health: `${ROUTES.API_BASE}${ROUTES.HEALTH}`
      },
      `${APP_NAME} is running`
    )
  )
})

app.use((req, _res, next) => {
  next(
    new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`, {
      code: ERROR_CODES.ROUTE_NOT_FOUND
    })
  )
})

app.use(errorHandler)

export default app
