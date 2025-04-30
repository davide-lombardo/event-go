import { Router } from 'express';
import eventRoutes from './event.routes';
import { protect } from '../modules/auth';

const router = Router();

// Event routes under /api
router.use('/events', eventRoutes.publicRoutes);
router.use('/events', protect, eventRoutes.protectedRoutes);

export default router;