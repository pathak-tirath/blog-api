import { Request, Response } from 'express';

import { logger } from '@/lib/winston';
import User from '@/models/v1/users';

import { IUser } from '@/models/v1/users';
import { generateRandomUserName, hashPassword } from '@/utils';

type UserRegistrationData = Pick<IUser, 'email' | 'password' | 'role'>;

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body as UserRegistrationData;
  const username = generateRandomUserName();
  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
  } catch (error) {
    logger.error(`Error saving user: ${error}`);
  }

  try {
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred during registration',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    logger.error(`Registration error: ${error}`);
  }
};

export default register;
