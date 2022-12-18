export interface ICategory {
  _id: string;
  user: string;
  image: string;
  slug: string;
  description: string;
  products: string[];
  isActive: boolean;
  updated: Date;
  created: Date;
}

export interface ICategoryInputDTO {
  name: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}
