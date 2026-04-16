import { Request, Response } from 'express'
import { ApiResponse } from '../utils'
import {
  changePassword,
  getMe,
  login,
  logout,
  refreshToken,
  register,
  updateMe
} from '../services/auth.service'
import {
  ChangePasswordInput,
  LoginInput,
  RefreshTokenInput,
  RegisterInput,
  UpdateMeInput
} from '../types'

export const registerUser = async (req: Request, res: Response) => {
  const result = await register(req.body as RegisterInput)

  res
    .status(201)
    .json(new ApiResponse(201, result, 'User registered successfully'))
}

export const loginUser = async (req: Request, res: Response) => {
  const result = await login(req.body as LoginInput)

  res.status(200).json(new ApiResponse(200, result, 'Login successful'))
}

export const refreshUserToken = async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body as RefreshTokenInput
  const result = await refreshToken(token)

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Token refreshed successfully'))
}

export const logoutUser = async (req: Request, res: Response) => {
  await logout(req.userId as string)

  res.status(200).json(new ApiResponse(200, null, 'Logout successful'))
}

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await getMe(req.userId as string)

  res.status(200).json(new ApiResponse(200, user))
}

export const updateCurrentUser = async (req: Request, res: Response) => {
  const user = await updateMe(req.userId as string, req.body as UpdateMeInput)

  res
    .status(200)
    .json(new ApiResponse(200, user, 'Profile updated successfully'))
}

export const changeCurrentUserPassword = async (
  req: Request,
  res: Response
) => {
  await changePassword(req.userId as string, req.body as ChangePasswordInput)

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Password changed successfully'))
}
