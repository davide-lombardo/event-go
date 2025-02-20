import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

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

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  return res.status(500).json({
    message: 'Internal server error'
  });
};