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

const router = Router();

// Public routes
router.post(
  '/',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    handleInputErrors
  ],
  createNewUser
);
router.post('/signin', signin);

// Protected routes
router.get('/profile', protect, getUserProfile);
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
router.post('/profile/image', protect, uploadMiddleware, uploadProfileImage);

export default router;