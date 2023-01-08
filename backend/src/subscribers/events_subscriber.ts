export const eventsSubscriber = {
  user: {
    signUp: 'onUserSignUp',
    signIn: 'onUserSignIn',
  },
  product: {
    addProduct: 'onAddProduct',
  },
  category: {
    addCategory: 'onAddCategory',
  },
  brand: {
    addBrand: 'onAddBrand',
  },
  review: {
    addReview: 'onaddReview',
  },
  newsletter: {
    subscribeNewsletter: 'onSubscribeNewsletter',
  },
  order: {
    addOrder: 'onAddOrder',
  },
  contactUs: {
    submitInContactUs: 'onSubmitInContactUs',
  },
  payment: {
    addPayment: 'onAddPayment',
  },
  merchant: {
    submitRequestMerchant: 'onSubmitRequestMerchant',
    approveRequestMerchant: 'onApproveRequestMerchant',
    rejectedRequestMerchant: 'onRejectedRequestMerchant',
  },
};
