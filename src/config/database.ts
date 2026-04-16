import mongoose from 'mongoose'
import ENV from './env'
import logger from './logger'

const sanitizeMongoUri = (uri: string) =>
  uri.replace(/:\/\/([^@]+)@/, '://***:***@')

const connectDb = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI)
    logger.info(
      { mongoUri: sanitizeMongoUri(ENV.MONGO_URI) },
      'Connected to MongoDB'
    )
  } catch (error) {
    logger.error({ err: error }, 'Error connecting to MongoDB')
    throw error
  }
}

export default connectDb
