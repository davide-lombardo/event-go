import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../handlers/event';

const publicRouter = Router();
const protectedRouter = Router();

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve a list of events
 *     tags:
 *       - Event
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
publicRouter.get('/', getEvents);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
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

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
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

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 */
protectedRouter.delete('/:id', deleteEvent);

export default {
  publicRoutes: publicRouter,
  protectedRoutes: protectedRouter,
};
