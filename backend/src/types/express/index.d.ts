import { Document, Model } from 'mongoose';
import { IUser, IUserMethods } from '@src/interfaces/IUser';
import { IProduct } from '@src/interfaces/IProduct';
import { IReview } from '@src/interfaces/IReview';
import { ICategory } from '@src/interfaces/ICategory';
import { IBrand } from '@src/interfaces/IBrand';
import { IMerchant } from '@src/interfaces/IMerchant';
import { IOrder } from '@src/interfaces/IOrder';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser, Document, IUserMethods>;
    export type ProductModel = Model<IProduct & Document>;
    export type ReviewModel = Model<IReview & Document>;
    export type CategoryModel = Model<ICategory & Document>;
    export type BrandModel = Model<IBrand & Document>;
    export type MerchantModel = Model<IMerchant & Document>;
    export type OrderModel = Model<IOrder & Document>;
  }
}
