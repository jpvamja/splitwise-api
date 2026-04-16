import bcrypt from 'bcryptjs'
import { HydratedDocument, Model, Schema, model } from 'mongoose'
import ENV from '../config/env'

type User = {
  fullName: string
  email: string
  password: string
  refreshTokenHash?: string
  tokenVersion: number
}

type UserMethods = {
  isPasswordCorrect(candidatePassword: string): Promise<boolean>
}

type UserModel = Model<User, Record<string, never>, UserMethods>

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    refreshTokenHash: {
      type: String,
      select: false
    },
    tokenVersion: {
      type: Number,
      required: true,
      default: 0,
      select: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.pre('save', async function savePassword() {
  if (!this.isModified('password')) {
    return
  }

  this.tokenVersion += 1
  this.password = await bcrypt.hash(this.password, ENV.BCRYPT_SALT_ROUNDS)
})

userSchema.methods.isPasswordCorrect = async function isPasswordCorrect(
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.set('toJSON', {
  transform: (_doc, ret: Record<string, unknown>) => {
    delete ret.password
    delete ret.refreshTokenHash
    return ret
  }
})

export type UserDocument = HydratedDocument<User, UserMethods>

const UserModel = model<User, UserModel>('User', userSchema)

export default UserModel
