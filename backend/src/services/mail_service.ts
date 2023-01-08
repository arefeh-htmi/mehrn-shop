import { Service, Inject } from 'typedi';
import { IUser } from '@src/interfaces/IUser';
import { IMerchant } from '@src/interfaces/IMerchant';
import { MailMessageData, MailTemplateType } from '@src/types/MailTemplate';
import { emailTemplateBuilders } from '@src/config/template';

@Service()
export class MailService {
  constructor(@Inject('emailClient') private emailClient, @Inject('emailDomain') private emailDomain) {}

  public async SendWelcomeEmail(email: string, firstName: string) {
    /**
     * @TODO Call Mailchimp/Sendgrid or whatever
     */
    // Added example for sending mail from mailgun

    const messageData = { firstName, email };
    const data = this.prepareEmailTemplate(MailTemplateType.userWelcome, messageData);

    try {
      this.emailClient.messages.create(this.emailDomain, data);
      return { delivered: 1, status: 'ok' };
    } catch (e) {
      return { delivered: 0, status: 'error' };
    }
  }

  public async SendSubscribedToNewsletter(email) {
    const messageData = { email };
    const data = this.prepareEmailTemplate(MailTemplateType.newsletterSubscription, messageData);

    try {
      this.emailClient.messages.create(this.emailDomain, data);
      return { delivered: 1, status: 'ok' };
    } catch (e) {
      return { delivered: 0, status: 'error' };
    }
  }

  public StartEmailSequence(sequence: string, user: Partial<IUser>) {
    if (!user.email) {
      throw new Error('No email provided');
    }
    // TODO: Add example of an email sequence implementation
    // Something like
    // 1 - Send first email of the sequence
    // 2 - Save the step of the sequence in database
    // 3 - Schedule job for second email in 1-3 days or whatever
    // Every sequence can have its own behavior so maybe
    // the pattern Chain of Responsibility can help here.
    return { delivered: 1, status: 'ok' };
  }

  public sendMerchantApplicationSubmitted(email: string) {
    const messageData = { email };
    const data = this.prepareEmailTemplate(MailTemplateType.userWelcome, messageData);

    try {
      this.emailClient.messages.create(this.emailDomain, data);
      return { delivered: 1, status: 'ok' };
    } catch (e) {
      return { delivered: 0, status: 'error' };
    }
  }

  public sendMerchantApplicationAproved(email: string) {
    const messageData = { email };
    const data = this.prepareEmailTemplate(MailTemplateType.sendMerchantApplicationApproved, messageData);

    try {
      this.emailClient.messages.create(this.emailDomain, data);
      return { delivered: 1, status: 'ok' };
    } catch (e) {
      return { delivered: 0, status: 'error' };
    }
  }

  public sendMerchantApplicationRejected(email: string) {
    const messageData = { email };
    const data = this.prepareEmailTemplate(MailTemplateType.sendMerchantApplicationRejected, messageData);
    try {
      this.emailClient.messages.create(this.emailDomain, data);
      return { delivered: 1, status: 'ok' };
    } catch (e) {
      return { delivered: 0, status: 'error' };
    }
  }

  private prepareEmailTemplate(type: MailTemplateType, data: MailMessageData) {
    const message = emailTemplateBuilders[type](data);
    return message;
  }
}
