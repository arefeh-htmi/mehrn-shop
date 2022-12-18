export interface IUser {
  _id: string;
  provider: string;
  role: string;
  email: string;

  firstName: string;
  lastName: string;
  merchant: string;
  phoneNumber: string;
  googleId: string;
  facebookId: string;
  avatar: string;

  password: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  salt: string;
}

export interface IUserInputDTO {

  // provider: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
