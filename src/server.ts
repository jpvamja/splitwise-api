import app from './app'
import connectDb from './config/database'
import ENV from './config/env'
import logger from './config/logger'

const startServer = async () => {
  try {
    await connectDb()
    const PORT = ENV.PORT || 8000
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
