import mongoose from 'mongoose'

export const isValidMongoId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id)
}
