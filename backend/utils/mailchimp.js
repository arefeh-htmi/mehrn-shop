import { mailchimpConfig } from "../config/mailchimp.js";

const subscribeToNewsletter = async (email) => {
  let result = {};
  let response;

  try {
    response = await mailchimpConfig(email);
  } catch (error) {
    return error;
  }

  if (response) {
    result = response;
  }

  return result;
};
export { subscribeToNewsletter };
