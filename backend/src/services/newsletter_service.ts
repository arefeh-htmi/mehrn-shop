import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';
import { MailService } from './mail_service';

@Service()
export class NewsLetterService {
  constructor(
    private mailer: MailService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/newsletter/subscribe
        subscribes to newsletter
  */
  public async subscribe(email: string): Promise<void> {
    try {
      this.logger.silly('Sending Subscribed To Newsletter');
      await this.mailer.SendSubscribedToNewsletter(email);
      this.eventDispatcher.dispatch(events.newsletter.subscribeNewsletter, { email });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
