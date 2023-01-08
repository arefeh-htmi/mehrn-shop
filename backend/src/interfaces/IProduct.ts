export interface IProduct {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  description: string;
  reviews: string[];
  rating: number;
  numReviews: number;
  price: number;
  currency: string;
  countInStock: number;
}

export interface IProductInputDTO {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  countInStock?: number;
}
