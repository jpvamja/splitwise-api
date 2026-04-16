import { Router } from 'express'
import mongoose from 'mongoose'
import ENV from '../config/env'
import { ApiResponse, asyncHandler } from '../utils'
import validateRequest from '../middleware/validateRequest'
import { pingQuerySchema } from '../validations'
import { API_VERSION, APP_NAME, APP_SLUG, ROUTES } from '../constants'
import authRouter from './auth.routes'

const router = Router()

router.use(ROUTES.AUTH_BASE.replace(ROUTES.API_BASE, ''), authRouter)

const mongoConnectionStateMap: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
}

/**
 * @openapi
 * /api/v1:
 *   get:
 *     summary: API metadata
 *     tags:
 *       - Meta
 *     responses:
 *       200:
 *         description: API metadata response
 */
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.status(200).json(
      new ApiResponse(200, {
        name: 'Splitwise API',
        version: API_VERSION,
        environment: ENV.NODE_ENV
      })
    )
  })
)

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API and process health information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   example: 128.3
 *                 timestamp:
 *                   type: string
 *                   example: 2026-04-16T12:00:00.000Z
 */
router.get(
  ROUTES.HEALTH.replace(ROUTES.API_BASE, ''),
  asyncHandler(async (_req, res) => {
    res.status(200).json(
      new ApiResponse(200, {
        status: 'ok',
        service: APP_SLUG,
        name: APP_NAME,
        environment: ENV.NODE_ENV,
        nodeVersion: process.version,
        uptime: Number(process.uptime().toFixed(2)),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString()
      })
    )
  })
)

/**
 * @openapi
 * /api/v1/health/live:
 *   get:
 *     summary: Liveness probe
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service process is alive
 */
router.get(
  ROUTES.HEALTH_LIVE.replace(ROUTES.API_BASE, ''),
  asyncHandler(async (_req, res) => {
    res.status(200).json(
      new ApiResponse(200, {
        status: 'alive',
        timestamp: new Date().toISOString()
      })
    )
  })
)

/**
 * @openapi
 * /api/v1/ping:
 *   get:
 *     summary: Ping endpoint with query validation example
 *     tags:
 *       - Meta
 *     parameters:
 *       - in: query
 *         name: message
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Pong response
 */
router.get(
  '/ping',
  validateRequest({ query: pingQuerySchema }),
  asyncHandler(async (req, res) => {
    const message =
      typeof req.query.message === 'string' ? req.query.message : 'pong'

    res.status(200).json(
      new ApiResponse(200, {
        message
      })
    )
  })
)

/**
 * @openapi
 * /api/v1/health/ready:
 *   get:
 *     summary: Readiness probe (checks database connection)
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is ready to handle traffic
 *       503:
 *         description: Service is not ready
 */
router.get(
  ROUTES.HEALTH_READY.replace(ROUTES.API_BASE, ''),
  asyncHandler(async (_req, res) => {
    const connectionState = mongoose.connection.readyState
    const databaseStatus = mongoConnectionStateMap[connectionState] || 'unknown'
    const isReady = connectionState === 1

    res.status(isReady ? 200 : 503).json(
      new ApiResponse(isReady ? 200 : 503, {
        status: isReady ? 'ready' : 'not_ready',
        checks: {
          database: databaseStatus
        },
        timestamp: new Date().toISOString()
      })
    )
  })
)

export { router }
