import { config } from '@/config';
import { logger } from '@/lib/winston';
import bcrypt from 'bcrypt';

export const generateRandomUserName = (): string => {
  const username = `user_${Math.random().toString(36).substring(2, 10)}`;
  return username;
};

export const hashPassword = async (password: string) => {
  const newPassword = await bcrypt.hash(password, config.SALT_HASH)
  return newPassword
};
