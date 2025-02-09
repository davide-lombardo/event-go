import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import multer from "multer";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next()
  }
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File size is too large. Max limit is 5MB'
      });
    }
    return res.status(400).json({
      message: `Upload error: ${error.message}`
    });
  }

  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({
      message: error.message
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  return res.status(500).json({
    message: 'Internal server error'
  });
};