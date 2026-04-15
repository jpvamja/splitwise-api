import mongoose from 'mongoose'
import ENV from './env'
import logger from './logger'

const connectDb = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI as string)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export default connectDb
