import { config } from '@/config';
import mongoose, { ConnectOptions, version } from 'mongoose';

const clientOptions: ConnectOptions = {
  dbName: 'blog',
  appName: 'Blog API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDB = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MongoURI is not defined');
  }

  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);
    console.log('Connection to mongo is successful!');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Unable to connect to MongoDB', error);
    }
  }
};

export const disconnectFromDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from DB');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }                                             
};
