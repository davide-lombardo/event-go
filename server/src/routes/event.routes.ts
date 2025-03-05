import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from '../handlers/event';

const publicRouter = Router();
const protectedRouter = Router();

// Public routes
publicRouter.get('/', getEvents);

// Protected routes
protectedRouter.post(
  '/',
  body('name').isString(),
  body('location').optional().isString(),
  body('latitude').optional().isFloat(),
  body('longitude').optional().isFloat(),
  body('description').isString(),
  body('link').isString(),
  body('userImage').isString(),
  body('userName').isString(),
  body('eventDate').isString(),
  body('category').isString(),
  handleInputErrors,
  createEvent
);

protectedRouter.put(
  '/:id',
  body('name').optional().isString(),
  body('location').optional().isString(),
  body('latitude').optional().isFloat(),
  body('longitude').optional().isFloat(),
  body('description').optional().isString(),
  body('link').optional().isString(),
  body('userImage').optional().isString(),
  body('userName').optional().isString(),
  body('eventDate').optional().isString(),
  body('category').optional().isString(),
  handleInputErrors,
  updateEvent
);

protectedRouter.delete('/:id', deleteEvent);

export default {
  publicRoutes: publicRouter,
  protectedRoutes: protectedRouter
};