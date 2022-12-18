import { IUser } from '@src/interfaces/IUser';
import { AuthenticationProvider, UserRoles } from '@src/types';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
      default: 'email',
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: 'ROLE_MEMBER',
      enum: ['ROLE_MEMBER', 'ROLE_ADMIN', 'ROLE_MERCHANT'],
    },
    phoneNumber: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant',
      default: null,
    },
    googleId: {
      type: String,
      unique: true,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
    salt: String,
    password: String,
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    updated: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
