import { IMerchant } from '@src/interfaces/IMerchant';
import mongoose from 'mongoose';

const Merchant = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    brand: {
      type: String,
    },
    business: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'WaitingApproval',
      enum: ['WaitingApproval', 'Rejected', 'Approved'],
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IMerchant & mongoose.Document>('Merchant', Merchant);
