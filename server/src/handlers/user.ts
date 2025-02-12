import prisma from '../db';
import { Request, Response } from 'express';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import path from 'path';
import fs from 'fs';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  user?: {
    id: string;
    [key: string]: any;
  };
}

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error: any) {
    console.error('User creation failed:', error);

    // Generic error response
    res.status(500).json({ error: 'User creation failed. Please try again.' });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isValid = await comparePasswords(password, user.password);

    if (!isValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    console.error('Signin failed:', error);
    res.status(500).json({ error: 'Signin failed' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { id: req.user.id },
      include: {
        events: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { username, profileImage } = req.body;
    // @ts-ignore
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, photoURL: profileImage },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

export const uploadProfileImage = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Get the existing user to check if they have a previous profile image
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { photoURL: true },
    });

    // If there's an existing profile image, delete it
    if (existingUser?.photoURL) {
      const oldImagePath = path.join(
        __dirname,
        '../../uploads',
        path.basename(existingUser.photoURL)
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Create the new image URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      req.file.filename
    }`;

    // Update user with new image URL
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { photoURL: imageUrl },
      select: {
        id: true,
        username: true,
        email: true,
        photoURL: true,
        role: true,
        events: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    // If there was an error and a file was uploaded, delete it
    if (req.file) {
      const filePath = path.join(__dirname, '../../uploads', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    console.error('Error uploading profile image:', error);
    res.status(500).json({
      message: 'Error uploading profile image',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
