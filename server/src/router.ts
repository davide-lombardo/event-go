import { Router } from 'express';
import { body } from "express-validator";
import { handleInputErrors } from './modules/middleware';
import { createEvent, deleteEvent, getEvents, updateEvent } from './handlers/event';

const router = Router();

/**
 * Protected Event Routes
 */
router.post(
  '/events',
  body('name').isString(),
  body('location').isString(),
  body('description').isString(),
  body('link').isString(),
  body('paid').isBoolean(),
  body('userImage').isString(),
  body('userName').isString(),
  body('eventDate').isString(),
  body('category').isString(),
  handleInputErrors,
  createEvent
);
router.put(
  '/events/:id',
  body('name').optional().isString(),
  body('location').optional().isString(),
  body('description').optional().isString(),
  body('link').optional().isString(),
  body('paid').optional().isBoolean(),
  body('userImage').optional().isString(),
  body('userName').optional().isString(),
  body('eventDate').optional().isString(),
  body('category').optional().isString(),
  handleInputErrors,
  updateEvent
);
router.delete('/events/:id', deleteEvent);

export default router