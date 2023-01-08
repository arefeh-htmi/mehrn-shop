import { SubscriptionStatus } from '@src/types';
import Mailchimp from 'mailchimp-api-v3';
const mailchimp = new Mailchimp(process.env.MAILCHIMP_KEY);

export function mailchimpConfig(email): Promise<Mailchimp> {
  return new Promise((resolve, reject) => {
    mailchimp
      .post(`lists/${process.env.MAILCHIMP_LIST_KEY}/members`, {
        email_address: email,
        status: SubscriptionStatus.Subscribed,
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
