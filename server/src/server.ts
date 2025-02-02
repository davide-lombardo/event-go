import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, getUserProfile, signin } from './handlers/user';
import router from './router';
import { getEvents } from './handlers/event';


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * User Routes
 */
app.post('/user', createNewUser)
app.post('/signin', signin)

/**
 * Public API Routes
 */
app.get('/api/events', getEvents);

/**
 * Protected API Routes
 */
app.use('/api', protect, router);
app.get('/user/profile', protect, getUserProfile);



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.json({message: `had an error: ${err.message}`})
})

export default app