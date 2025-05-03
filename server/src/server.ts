import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes';
import router from './routes';
import { setupSwaggerDocs } from './swagger';

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, // Allow cookies/credentials
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/', limiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// User routes
app.use('/user', userRoutes);

// API routes
app.use('/api', router);

// Swagger documentation
setupSwaggerDocs(app);

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app