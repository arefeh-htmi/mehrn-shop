export interface IMerchant {
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
  
  export interface IMerchantInputDTO {
    name: string;
    description: string;
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
  }
  