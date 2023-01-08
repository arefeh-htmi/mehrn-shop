import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { IReview, IReviewInputDTO } from '@src/interfaces/IReview';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class ReviewService {
  constructor(
    @Inject('reviewModel') private reviewModel: Models.ReviewModel,
    @Inject('productModel') private productModel: Models.ProductModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/reviews/add/:productId
        ADDS A NEW RECORD
  */
  public async addRview(
    productId: string,
    reviewInputDTO: IReviewInputDTO,
  ): Promise<{
    review: IReview;
  }> {
    try {
      const productRecord = await this.productModel.findOne({ _id: productId });
      if (productRecord) {
        throw new Error('product is not registered');
      }

      this.logger.silly('Creating review db record');
      const newRecord = await this.reviewModel.create(reviewInputDTO);

      this.eventDispatcher.dispatch(events.review.addReview, { review: newRecord });

      const review = newRecord.toObject();

      return { review };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
