import { Container } from 'typedi';
import { MailService } from '@src/services/mail_service';
import { Logger } from 'winston';

export class EmailSequenceTask {
  public async handler(job, done): Promise<void> {
    const Logger: Logger = Container.get('logger');
    try {
      Logger.debug('✌️ Email Sequence Job triggered!');
      const { email, name }: { [key: string]: string } = job.attrs.data;
      const mailerServiceInstance = Container.get(MailService);
      await mailerServiceInstance.SendWelcomeEmail(email);
      done();
    } catch (e) {
      Logger.error('🔥 Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}
