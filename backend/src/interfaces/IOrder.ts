export interface IOrder {
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
    countInStock: number;
  }
  
  export interface IOrderInputDTO {
    name: string;
    description: string;
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
  }
  