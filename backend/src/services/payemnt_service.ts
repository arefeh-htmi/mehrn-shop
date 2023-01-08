import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { IPayment, IPaymentInputDTO } from '@src/interfaces/IPayment';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class PaymentService {
  constructor(
    @Inject('paymentModel') private paymentModel: Models.PaymentModel,
    @Inject('productModel') private productModel: Models.ProductModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/payments/add/:productId
        ADDS A NEW RECORD
  */
  public async addRview(
    productId: string,
    paymentInputDTO: IPaymentInputDTO,
  ): Promise<{
    payment: IPayment;
  }> {
    try {
      const productRecord = await this.productModel.findOne({ _id: productId });
      if (productRecord) {
        throw new Error('product is not registered');
      }

      this.logger.silly('Creating payment db record');
      const newRecord = await this.paymentModel.create(paymentInputDTO);

      this.eventDispatcher.dispatch(events.payment.addPayment, { payment: newRecord });

      const payment = newRecord.toObject();

      return { payment };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
