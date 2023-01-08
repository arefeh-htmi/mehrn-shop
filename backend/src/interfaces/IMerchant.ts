import { MerchantApprovalStatus } from '@src/types';

export interface IMerchant {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  brand: string;
  business: string;
  isActive: boolean;
  status: MerchantApprovalStatus;
  updated: Date;
  created: Date;
}

export interface IMerchantInputDTO {
  name: string;
  email: string;
  phoneNumber: string;
  brand: string;
  business: string;
  isActive: boolean;
  status: MerchantApprovalStatus;
}
