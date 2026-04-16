export type PublicUser = {
  id: string
  fullName: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type AccessTokenPayload = {
  userId: string
  email: string
  tokenVersion: number
}

export type RefreshTokenPayload = {
  userId: string
}

export type RegisterInput = {
  fullName: string
  email: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

export type RefreshTokenInput = {
  refreshToken: string
}

export type UpdateMeInput = {
  fullName?: string
  email?: string
}

export type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
}
