import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { MailService } from '@src/services/mail_service';
import { config } from '@src/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '@src/interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';
import { IProduct } from '@src/interfaces/IProduct';

@Service()
export class ProductService {
  constructor(
    @Inject('productModel') private productModel: Models.ProductModel,
    private mailer: MailService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async getProducts(
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ poducts: IProduct[]; page: number; pages: number }> {
    const pageSize = 10;
    const keyword =
      keyWord != null
        ? {
            name: {
              $regex: keyWord,
              $options: 'i',
            },
          }
        : {};

    const totalProductsCount = await this.productModel.countDocuments({ ...keyword });
    const productsList = (await this.productModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1))) as IProduct[];
    return { poducts: productsList, page: pageNumber, pages: Math.ceil(totalProductsCount / pageSize) };
  }
}
