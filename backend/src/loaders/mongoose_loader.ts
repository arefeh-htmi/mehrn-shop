import mongoose from 'mongoose';
import { Db } from 'mongodb';
import { config } from '@src/config';

export const mongooseLoader = async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
