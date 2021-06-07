import asyncHandler from "express-async-handler";
import { mailgunConfig } from "../config/mailgun.js";
import {
  resetEmail,
  confirmResetPasswordEmail,
  merchantSignup,
  merchantWelcome,
  signupEmail,
  newsletterSubscriptionEmail,
  contactEmail,
  merchantApplicationEmail,
  orderConfirmationEmail,
} from "../config/template.js";

const sendEmail = asyncHandler(async (email, type, host, data) => {
  let result;
  let response;

  try {
    const message = prepareTemplate(type, host, data);

    response = await mailgunConfig.sendEmail(email, message);
  } catch (error) {}

  if (response) {
    result = response;
  }

  return result;
});

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case "reset":
      message = resetEmail(host, data);
      break;

    case "reset-confirmation":
      message = confirmResetPasswordEmail();
      break;

    case "signup":
      message = signupEmail(data);
      break;

    case "merchant-signup":
      message = merchantSignup(host, data);
      break;

    case "merchant-welcome":
      message = merchantWelcome(data);
      break;

    case "newsletter-subscription":
      message = newsletterSubscriptionEmail();
      break;

    case "contact":
      message = contactEmail();
      break;

    case "merchant-application":
      message = merchantApplicationEmail();
      break;

    case "order-confirmation":
      message = orderConfirmationEmail(data);
      break;

    default:
      message = "";
  }

  return message;
};
export { sendEmail };
