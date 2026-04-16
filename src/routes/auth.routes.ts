import { Router } from 'express'
import {
  changeCurrentUserPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
  updateCurrentUser
} from '../controllers/auth.controller'
import requireAuth from '../middleware/authMiddleware'
import validateRequest from '../middleware/validateRequest'
import { asyncHandler } from '../utils'
import {
  changePasswordBodySchema,
  loginBodySchema,
  refreshTokenBodySchema,
  registerBodySchema,
  updateMeBodySchema
} from '../validations'

const authRouter = Router()

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password]
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
authRouter.post(
  '/register',
  validateRequest({ body: registerBodySchema }),
  asyncHandler(registerUser)
)

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
authRouter.post(
  '/login',
  validateRequest({ body: loginBodySchema }),
  asyncHandler(loginUser)
)

/**
 * @openapi
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh access and refresh tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
authRouter.post(
  '/refresh-token',
  validateRequest({ body: refreshTokenBodySchema }),
  asyncHandler(refreshUserToken)
)

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRouter.post('/logout', requireAuth, asyncHandler(logoutUser))

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 */
authRouter.get('/me', requireAuth, asyncHandler(getCurrentUser))

/**
 * @openapi
 * /api/v1/auth/me:
 *   patch:
 *     summary: Update current user profile
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
authRouter.patch(
  '/me',
  requireAuth,
  validateRequest({ body: updateMeBodySchema }),
  asyncHandler(updateCurrentUser)
)

/**
 * @openapi
 * /api/v1/auth/change-password:
 *   patch:
 *     summary: Change current user password
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
authRouter.patch(
  '/change-password',
  requireAuth,
  validateRequest({ body: changePasswordBodySchema }),
  asyncHandler(changeCurrentUserPassword)
)

export default authRouter
