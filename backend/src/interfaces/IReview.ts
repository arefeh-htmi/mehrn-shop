export interface IReview {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
}

export interface IReviewInputDTO {
  rating: number;
  comment: string;
}
