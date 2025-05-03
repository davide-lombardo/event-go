import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { getEnvVar } from '../utils/utils';

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createAccessToken = (user: User) => {
  const secret = getEnvVar('JWT_SECRET');

  return jwt.sign(
    { id: user.id, username: user.username },
    secret,
    { expiresIn: '15m' }
  );
};

export const createRefreshToken = (user: User) => {
  const secret = getEnvVar('REFRESH_TOKEN_SECRET');

  return jwt.sign(
    { id: user.id },
    secret,
    { expiresIn: '7d' }
  );
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'Not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'Not authorized' });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      return;
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    // @ts-ignore
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: 'Not authorized' });
    return;
  }
};
