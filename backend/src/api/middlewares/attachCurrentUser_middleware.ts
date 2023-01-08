import { Container } from 'typedi';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IUser } from '@src/interfaces/IUser';
import { Logger } from 'winston';
import { NextFunction } from 'express';

/**
 * Attach user to req.currentUser
 */
export const attachCurrentUser = async (req, res, next): Promise<NextFunction> => {
  const Logger: Logger = Container.get('logger');
  try {
    const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
    //if u want the jwt decoding wa, uncomment these
    // const token = await jwt.decode(req.token)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userRecord = await UserModel.findById(decoded._id).select('-password');

    const userRecord = await UserModel.findById(req.token._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }

    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};
