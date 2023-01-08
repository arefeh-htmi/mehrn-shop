export interface IOrder {
  _id: string;
  user: string;
  orderItems: orderedItem[];
  shippingAddress: Address;
  currency: string;
  paymentMethod: string; //TODO: cange to tpe enum mabe
  paymentResult: PaymentResult;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paidAt: Date;
  deliveredAt: Date;
  isPaid: boolean;
  isDelivered: boolean;
}

interface orderedItem {
  orderedPrice: number;
  product: string;
}

interface Address {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrderInputDTO {
  name: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}
