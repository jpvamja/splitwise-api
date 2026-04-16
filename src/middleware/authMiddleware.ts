import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import ENV from '../config/env'
import { ERROR_CODES, ERROR_MESSAGES } from '../constants'
import UserModel from '../models/user.model'
import ApiError from '../utils/apiError'
import { AccessTokenPayload } from '../types'

const getBearerToken = (authorizationHeader?: string) => {
  if (!authorizationHeader) return null

  const [scheme, token] = authorizationHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null

  return token
}

const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = getBearerToken(req.header('authorization'))

  if (!token) {
    next(
      new ApiError(401, ERROR_MESSAGES.UNAUTHORIZED, {
        code: ERROR_CODES.UNAUTHORIZED
      })
    )
    return
  }

  try {
    const payload = jwt.verify(
      token,
      ENV.JWT_ACCESS_SECRET
    ) as AccessTokenPayload

    const user = await UserModel.findById(payload.userId).select(
      '+tokenVersion'
    )

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      next(
        new ApiError(401, ERROR_MESSAGES.UNAUTHORIZED, {
          code: ERROR_CODES.UNAUTHORIZED
        })
      )
      return
    }

    req.userId = payload.userId
    req.userEmail = payload.email

    next()
  } catch {
    next(
      new ApiError(401, ERROR_MESSAGES.UNAUTHORIZED, {
        code: ERROR_CODES.UNAUTHORIZED
      })
    )
  }
}

export default requireAuth
