import { Document, Model } from 'mongoose';
import { IUser } from '@src/interfaces/IUser';
import { IProduct } from '@src/interfaces/IProduct';
import { IReview } from '@src/interfaces/IReview';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type ProductModel = Model<IProduct & Document>;
    export type ReviewModel = Model<IReview & Document>;
  }
}
