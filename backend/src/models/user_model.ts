import { IUser, IUserMethods } from '@src/interfaces/IUser';
import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';

type UserModel = Model<IUser, any, IUserMethods>;

const User = new mongoose.Schema<IUser, UserModel, IUserMethods>(
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
      default: '',
    },
    facebookId: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
    },
    salt: String,
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

User.methods.validatePassword = async function (enteredPassword: string): Promise<boolean> {
  /**
   * TOKNOW: verifying using argon2 to prevent 'timing based' attacks
   */
  //using crypto and argon2
  return await argon2.verify(this.password, enteredPassword);

  //if you don't want to use argon2 and crpto, uncomment these
  // return await bcrypt.compare(enteredPassword, this.password);
};

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  //if you don't want to use argon2 and crpto, uncomment these
  // const salt = await bcrypt.genSalt(10);
  // const resultPassword = await bcrypt.hash(hashedPassword, salt);
  // this.password = resultPassword;
  // this.salt = salt;

  //using crypto and argon2
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(this.password, { salt });
  this.salt = salt.toString('hex');
  this.password = await bcrypt.hash(hashedPassword, salt);
});

export default mongoose.model<IUser, UserModel>('User', User);
