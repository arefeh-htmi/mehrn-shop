import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { IOrder, IOrderInputDTO } from '@src/interfaces/IOrder';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class OrderService {
  constructor(
    @Inject('orderModel') private orderModel: Models.OrderModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/order/all
        GET A PAGINATED LIST OF RECORDS
        ADMIN
  */

  public async getAllOrders(
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ orders: IOrder[]; page: number; pages: number }> {
    try {
      const pageSize = 10;
      const query =
        keyWord != null
          ? {
              name: {
                $regex: keyWord,
                $options: 'i',
              },
            }
          : {};

      const totalRecordsCount = await this.orderModel.countDocuments({ ...query });
      const orderList = (await this.orderModel
        .find({ ...query })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1))) as IOrder[];

      return { orders: orderList, page: pageNumber, pages: Math.ceil(totalRecordsCount / pageSize) };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/order/my-orders
        GET A PAGINATED LIST OF RECORDS
        CUSTOMER
  */

  public async getCurrentUserOrders(
    currentUserId: string,
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ orders: IOrder[]; page: number; pages: number }> {
    try {
      const pageSize = 10;
      const query =
        keyWord != null
          ? {
              name: {
                $regex: keyWord,
                $options: 'i',
              },
              _id: currentUserId,
            }
          : { _id: currentUserId };

      const totalRecordsCount = await this.orderModel.countDocuments({ ...query });
      const orderList = (await this.orderModel
        .find({ ...query })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1))) as IOrder[];

      return { orders: orderList, page: pageNumber, pages: Math.ceil(totalRecordsCount / pageSize) };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/order/:id
        GET AN EXISTING RECORD
  */

  public async getOrder(orderId: number): Promise<{ order: IOrder }> {
    try {
      const orderRecord = await this.orderModel.findOne({ _id: orderId });

      if (!orderRecord) {
        throw new Error('Order record not found');
      }

      return { order: orderRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  /*
        ROUTE: api/order/new-order
        ADDS A NEW RECORD
  */
  public async placeNewOrder(
    currentUserId: string,
    orderInputDTO: IOrderInputDTO,
  ): Promise<{
    order: IOrder;
  }> {
    try {
      const orderRecord = await this.orderModel.findOne({ name: orderInputDTO.name });

      if (orderRecord) {
        throw new Error('Order already registered');
      }

      this.logger.silly('Creating order db record');
      const newRecord = await this.orderModel.create({ ...orderInputDTO, user: currentUserId });

      this.eventDispatcher.dispatch(events.order.addOrder, { order: newRecord });

      const order = newRecord.toObject();

      return { order };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
