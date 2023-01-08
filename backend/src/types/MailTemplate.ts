export interface MailTemplateModel {
  subject: string;
  text: string;
  to: string[];
  from: string;
}

export enum MailTemplateType {
  resetEmail = 'resetEmail',
  confirmResetPasswordEmail = 'confirmResetPasswordEmail',
  signupEmail = 'signupEmail',
  merchantSignup = 'merchantSignup',
  merchantWelcome = 'merchantWelcome',
  userWelcome = 'userWelcome',
  newsletterSubscription = 'newsletterSubscription',
  contactEmail = 'contactEmail',
  merchantApplicationEmail = 'merchantApplicationEmail',
  orderConfirmation = 'orderConfirmation',
  sendMerchantApplicationAproved = 'sendMerchantApplicationAproved',
  sendMerchantApplicationRejected = 'sendMerchantApplicationRejected',
}

export interface MailMessageData {
  email: string;
  firstName?: string;
  lastName?: string;
  resetToken?: string;
  host?: string;
  item?: string;
}
