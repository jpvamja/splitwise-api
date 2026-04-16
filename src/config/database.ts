import mongoose from 'mongoose'
import ENV from './env'
import logger from './logger'

const sanitizeMongoUri = (uri: string) => {
  const credentialsMatch = /:\/\/[^@]+@/.exec(uri)

  if (!credentialsMatch?.[0]) {
    return uri
  }

  const startIndex = credentialsMatch.index
  const endIndex = startIndex + credentialsMatch[0].length

  return `${uri.slice(0, startIndex)}://***:***@${uri.slice(endIndex)}`
}

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
