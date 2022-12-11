import { Document, Model } from 'mongoose';
import { IUser } from '@src/interfaces/IUser';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
  }
}