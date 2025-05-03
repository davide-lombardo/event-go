import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';
import { 
  createNewUser, 
  signin, 
  getUserProfile, 
  updateUserProfile, 
  uploadProfileImage 
} from '../handlers/user';
import { uploadMiddleware } from '../modules/upload.middleware';
import { protect } from '../modules/auth';
import { refreshAccessToken, logout } from '../handlers/user';


const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    handleInputErrors
  ],
  createNewUser
);

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', signin);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', protect, getUserProfile);

/**
 * @swagger
 * /user/profile:
 *   patch:
 *     summary: Update user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Validation error
 */
router.patch(
  '/profile',
  protect,
  [
    body('email').optional().isEmail(),
    body('name').optional().isString(),
    handleInputErrors
  ],
  updateUserProfile
);

/**
 * @swagger
 * /user/profile/image:
 *   post:
 *     summary: Upload a profile image
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Upload error
 */
router.post('/profile/image', protect, uploadMiddleware, uploadProfileImage);

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Refresh access token using the refresh token cookie
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: New access token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: No refresh token cookie present
 *       403:
 *         description: Invalid or expired refresh token
 *     cookies:
 *       refreshToken:
 *         description: HttpOnly refresh token stored in cookies
 */
router.post('/refresh-token', refreshAccessToken);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout user and clear refresh token cookie
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully logged out and cookie cleared
 *     cookies:
 *       refreshToken:
 *         description: HttpOnly refresh token stored in cookies
 */
router.post('/logout', logout);

export default router;
