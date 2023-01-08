import mongoose from 'mongoose';
import { Db } from 'mongodb';
import { config } from '@src/config';

export const mongooseLoader = async (): Promise<Db> => {
  const connection = await mongoose.createConnection(config.databaseURL);
  return connection.db as unknown as Db;
};
