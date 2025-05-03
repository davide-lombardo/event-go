import { Request, Response, NextFunction } from 'express';
import { upload } from '../config/multer.config';

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single('profileImage')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          message: 'File size too large. Maximum size is 5MB'
        });
      }
      if (err.message.includes('Invalid file type')) {
        return res.status(400).json({
          message: err.message
        });
      }
      return res.status(500).json({
        message: 'Error uploading file',
        error: err.message
      });
    }
    next();
  });
};

export const validateUploadRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    return res.status(400).json({
      message: 'Invalid request. Must be multipart/form-data'
    });
  }
  next();
};