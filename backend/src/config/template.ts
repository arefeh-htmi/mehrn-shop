import { MailTemplateModel, MailTemplateType } from '@src/types/MailTemplate';

const resetEmail = ({
  email,
  host,
  resetToken,
}: {
  email: string;
  host: string;
  resetToken: string;
}): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Reset Password',
    text:
      `${
        'You are receiving this because you have requested to reset your password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://'
      }${host}/reset-password/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return message;
};

const confirmResetPasswordEmail = ({ email }: { email: string }): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Password Changed',
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`,
  };

  return message;
};

const merchantSignup = ({
  host,
  resetToken,
  email,
}: {
  host: string;
  resetToken: string;
  email: string;
}): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Merchant Registration',
    text: `${
      'Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below. \n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://'
    }${host}/merchant-signup/${resetToken}?email=${email}\n\n`,
  };

  return message;
};

const sendMerchantApplicationApproved = ({ email }: { email: string }): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Merchant Registration',
    text: `${'Congratulations! Your application has been approved.'}`,
  };

  return message;
};

const sendMerchantApplicationRejected = ({ email }: { email: string }): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Merchant Registration',
    text: `${'Your application has been rejected. Please complete your Merchant account signup by clicking on the link below. \n\n'}`,
  };

  return message;
};

const userWelcome = ({ firstName, email }: { email: string; firstName: string }): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'User Registration',
    text:
      `Hi ${firstName}! Congratulations! Your application for merchant account has been registered. \n\n` +
      `Please sign in with your member credentials and you will be able to see your user account.`,
  };

  return message;
};

const merchantWelcome = ({ firstName, email }: { email: string; firstName: string }): MailTemplateModel => {
  const message = {
    subject: 'Merchant Registration',
    text:
      `Hi ${firstName}! Congratulations! Your application for merchant account has been recioeved. \n\n` +
      `we will contact you`,
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
  };

  return message;
};

const signupEmail = ({
  email,
  firstName,
  lastName,
}: {
  email: string;
  firstName: string;
  lastName: string;
}): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Account Registration',
    text: `Hi ${firstName} ${lastName}! Thank you for creating an account with us!.`,
  };

  return message;
};

const newsletterSubscriptionEmail = ({ email }: { email: string }): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Newsletter Subscription',
    text:
      `You are receiving this email because you subscribed to our newsletter. \n\n` +
      `If you did not request this change, please contact us immediately.`,
  };

  return message;
};

const contactEmail = ({ email }: { email: string }): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Contact Us',
    text: `We received your message! Our team will contact you soon. \n\n`,
  };

  return message;
};

const merchantApplicationEmail = ({ email }: { email: string }): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: 'Sell on MERN Store',
    text: `We received your request! Our team will contact you soon. \n\n`,
  };

  return message;
};

const orderConfirmationEmail = ({
  email,
  firstName,
  item,
}: {
  email: string;
  firstName: string;
  item: string;
}): MailTemplateModel => {
  const message = {
    from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
    to: [email],
    subject: `Order Confirmation ${item}`,
    text:
      `Hi ${firstName}! Thank you for your order!. \n\n` +
      `We've received your order and will contact you as soon as your package is shipped. \n\n`,
  };

  return message;
};

export const emailTemplateBuilders = {
  resetEmail,
  confirmResetPasswordEmail,
  merchantSignup,
  merchantWelcome,
  signupEmail,
  newsletterSubscriptionEmail,
  contactEmail,
  merchantApplicationEmail,
  orderConfirmationEmail,
  userWelcome,
  sendMerchantApplicationApproved,
  sendMerchantApplicationRejected,
};
