import app from './app'
import connectDb from './config/database'
import ENV from './config/env'
import logger from './config/logger'
import mongoose from 'mongoose'
import { Server } from 'node:http'
import { DEFAULT_SERVER_HOST } from './constants'

const HOST = DEFAULT_SERVER_HOST

let isShuttingDown = false
let httpServer: Server | undefined

const closeHttpServer = () =>
  new Promise<void>((resolve, reject) => {
    if (!httpServer) {
      resolve()
      return
    }

    httpServer.close((error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })

const shutdown = async (signal: NodeJS.Signals) => {
  if (isShuttingDown) return
  isShuttingDown = true

  logger.warn({ signal }, 'Shutdown signal received, closing resources')

  try {
    await closeHttpServer()
    logger.info('HTTP server closed')

    await mongoose.connection.close()
    logger.info('MongoDB connection closed')
  } catch (error) {
    logger.error({ err: error }, 'Error during graceful shutdown')
  }

  process.exit(0)
}

const startServer = async () => {
  try {
    await connectDb()
    const PORT = ENV.PORT

    httpServer = app.listen(PORT, HOST, () => {
      logger.info({ port: PORT, host: HOST }, 'Server started successfully')
    })
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server')
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  void shutdown('SIGINT')
})

process.on('SIGTERM', () => {
  void shutdown('SIGTERM')
})

process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'Unhandled promise rejection')
})

process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught exception')
  process.exit(1)
})

startServer()
