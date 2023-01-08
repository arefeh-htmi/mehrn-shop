import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';
import { IUser } from '@src/interfaces/IUser';
import mongoose from 'mongoose';
import { Logger } from 'winston';

@EventSubscriber()
export class UserSubscriber {
  /**
   * @TODO
   * emit events to a queue (rabbitmq/aws sqs),
   * then save the latest in Redis/Memcache or something similar
   */
  @On(events.user.signIn)
  public onUserSignIn({ _id }: Partial<IUser>) {
    const Logger: Logger = Container.get('logger');

    try {
      const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;

      UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);
      throw e;
    }
  }

  @On(events.user.signUp)
  public onUserSignUp({ name, email, _id }: Partial<IUser>) {
    const Logger: Logger = Container.get('logger');

    try {
      /**
       * @TODO
       */
      // TrackerService.track('user.signup', { email, _id })
      // MailService.startSequence('user.welcome', { email, name })
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);
      throw e;
    }
  }
}
