import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import ENV from '../config/env'
import { ERROR_CODES, ERROR_MESSAGES } from '../constants'
import UserModel from '../models/user.model'
import {
  AuthTokens,
  ChangePasswordInput,
  LoginInput,
  PublicUser,
  RegisterInput,
  UpdateMeInput,
  RefreshTokenPayload
} from '../types'
import ApiError from '../utils/apiError'

type JwtExpiresIn = Exclude<jwt.SignOptions['expiresIn'], undefined>

const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex')
}

const toPublicUser = (user: {
  _id: unknown
  fullName: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}): PublicUser => {
  return {
    id: String(user._id),
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt || new Date(),
    updatedAt: user.updatedAt || new Date()
  }
}

const createTokens = (user: {
  _id: unknown
  email: string
  tokenVersion: number
}): AuthTokens => {
  const tokenPayload = {
    userId: String(user._id),
    email: user.email,
    tokenVersion: user.tokenVersion
  }

  const accessToken = jwt.sign(tokenPayload, ENV.JWT_ACCESS_SECRET, {
    expiresIn: ENV.JWT_ACCESS_EXPIRES_IN as JwtExpiresIn
  })

  const refreshToken = jwt.sign(tokenPayload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN as JwtExpiresIn
  })

  return { accessToken, refreshToken }
}

const saveRefreshTokenHash = async (userId: string, refreshToken: string) => {
  await UserModel.findByIdAndUpdate(userId, {
    $set: { refreshTokenHash: hashToken(refreshToken) }
  })
}

export const register = async (payload: RegisterInput) => {
  const existingUser = await UserModel.findOne({ email: payload.email })

  if (existingUser) {
    throw new ApiError(409, ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, {
      code: ERROR_CODES.EMAIL_ALREADY_EXISTS
    })
  }

  const user = await UserModel.create({
    fullName: payload.fullName,
    email: payload.email,
    password: payload.password
  })

  const tokens = createTokens(user)
  await saveRefreshTokenHash(String(user._id), tokens.refreshToken)

  return {
    user: toPublicUser(user),
    ...tokens
  }
}

export const login = async (payload: LoginInput) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password +tokenVersion'
  )

  if (!user) {
    throw new ApiError(401, ERROR_MESSAGES.INVALID_CREDENTIALS, {
      code: ERROR_CODES.INVALID_CREDENTIALS
    })
  }

  const isValidPassword = await user.isPasswordCorrect(payload.password)

  if (!isValidPassword) {
    throw new ApiError(401, ERROR_MESSAGES.INVALID_CREDENTIALS, {
      code: ERROR_CODES.INVALID_CREDENTIALS
    })
  }

  const tokens = createTokens(user)
  await saveRefreshTokenHash(String(user._id), tokens.refreshToken)

  return {
    user: toPublicUser(user),
    ...tokens
  }
}

export const refreshToken = async (token: string) => {
  let payload: RefreshTokenPayload

  try {
    payload = jwt.verify(token, ENV.JWT_REFRESH_SECRET) as RefreshTokenPayload
  } catch {
    throw new ApiError(401, ERROR_MESSAGES.INVALID_REFRESH_TOKEN, {
      code: ERROR_CODES.INVALID_REFRESH_TOKEN
    })
  }

  const user = await UserModel.findById(payload.userId).select(
    '+refreshTokenHash +tokenVersion'
  )

  if (!user || !user.refreshTokenHash) {
    throw new ApiError(401, ERROR_MESSAGES.INVALID_REFRESH_TOKEN, {
      code: ERROR_CODES.INVALID_REFRESH_TOKEN
    })
  }

  if (hashToken(token) !== user.refreshTokenHash) {
    throw new ApiError(401, ERROR_MESSAGES.INVALID_REFRESH_TOKEN, {
      code: ERROR_CODES.INVALID_REFRESH_TOKEN
    })
  }

  const tokens = createTokens(user)
  await saveRefreshTokenHash(String(user._id), tokens.refreshToken)

  return {
    user: toPublicUser(user),
    ...tokens
  }
}

export const logout = async (userId: string) => {
  await UserModel.findByIdAndUpdate(userId, {
    $unset: { refreshTokenHash: 1 }
  })
}

export const getMe = async (userId: string) => {
  const user = await UserModel.findById(userId)

  if (!user) {
    throw new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND, {
      code: ERROR_CODES.USER_NOT_FOUND
    })
  }

  return toPublicUser(user)
}

export const updateMe = async (userId: string, payload: UpdateMeInput) => {
  if (payload.email) {
    const existingUser = await UserModel.findOne({
      email: payload.email,
      _id: { $ne: userId }
    })

    if (existingUser) {
      throw new ApiError(409, ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, {
        code: ERROR_CODES.EMAIL_ALREADY_EXISTS
      })
    }
  }

  const user = await UserModel.findByIdAndUpdate(
    userId,
    {
      ...(payload.fullName ? { fullName: payload.fullName } : {}),
      ...(payload.email ? { email: payload.email } : {})
    },
    { new: true, runValidators: true }
  )

  if (!user) {
    throw new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND, {
      code: ERROR_CODES.USER_NOT_FOUND
    })
  }

  return toPublicUser(user)
}

export const changePassword = async (
  userId: string,
  payload: ChangePasswordInput
) => {
  const user = await UserModel.findById(userId).select(
    '+password +tokenVersion'
  )

  if (!user) {
    throw new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND, {
      code: ERROR_CODES.USER_NOT_FOUND
    })
  }

  const isCurrentPasswordValid = await user.isPasswordCorrect(
    payload.currentPassword
  )

  if (!isCurrentPasswordValid) {
    throw new ApiError(401, ERROR_MESSAGES.INVALID_CREDENTIALS, {
      code: ERROR_CODES.INVALID_CREDENTIALS
    })
  }

  user.password = payload.newPassword
  await user.save()
  await UserModel.findByIdAndUpdate(userId, {
    $unset: { refreshTokenHash: 1 }
  })
}
