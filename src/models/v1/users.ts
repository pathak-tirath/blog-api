import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// Validations
const emailValidator = (email: string) => validator.isEmail(email);

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxLength: [30, 'Username cannot exceed 30 characters'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: emailValidator,
        message: 'Please fill a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either admin or user',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [50, 'First name cannot exceed 50 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: [50, 'Last name cannot exceed 50 characters'],
      trim: true,
    },
    socialLinks: {
      twitter: { type: String, trim: true },
      facebook: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      instagram: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
