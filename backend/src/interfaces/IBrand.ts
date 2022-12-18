export interface IBrand {
  _id: string;
  name: string;
  image: string;
  description: string;
  slug: string;
  isActive: boolean;
  merchant: string;
  updated: Date;
  created: Date;
}

export interface IBrandInputDTO {
  name: string;
  image: string;
  description: string;
  isActive: boolean;
}
