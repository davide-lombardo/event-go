import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, getUserProfile, signin, updateUserProfile, uploadProfileImage } from './handlers/user';
import router from './router';
import { getEvents } from './handlers/event';
import path from 'path';
import { uploadMiddleware } from './modules/upload.middleware';


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

/**
 * User Routes
 */
app.post('/user', createNewUser);
app.post('/signin', signin);

/**
 * Public API Routes
 */
app.get('/api/events', getEvents);

/**
 * Protected API Routes
 */
app.use('/api', protect, router);
app.get('/user/profile', protect, getUserProfile);
app.patch('/user/profile', protect, updateUserProfile);
app.post('/user/profile/image', protect, uploadMiddleware, uploadProfileImage);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.json({message: `had an error: ${err.message}`})
})

export default app