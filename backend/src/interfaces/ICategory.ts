export interface ICategory {
  _id: string;
  user: string;
  image: string;
  slug: string;
  description: string;
  isActive: boolean;
  updated: Date;
  created: Date;
}

export interface ICategoryInputDTO {
  name: string;
  description: string;
  isActive: boolean;
  image?: string;
}
