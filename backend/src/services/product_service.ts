import { Service, Inject } from 'typedi';
import { MailService } from '@src/services/mail_service';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { IProduct, IProductInputDTO } from '@src/interfaces/IProduct';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class ProductService {
  constructor(
    @Inject('productModel') private productModel: Models.ProductModel,
    private mailer: MailService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/product/
        GET AN EXISTING RECORD
  */

  public async getProducts(
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ poducts: IProduct[]; page: number; pages: number }> {
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

    const totalProductsCount = await this.productModel.countDocuments({ ...query });
    const productsList = (await this.productModel
      .find({ ...query })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1))) as IProduct[];

    return { poducts: productsList, page: pageNumber, pages: Math.ceil(totalProductsCount / pageSize) };
  }

  /*
      ROUTE: api/product/:id
      GET AN EXISTING RECORD
  */

  public async getProduct(productId: string): Promise<{ product: IProduct }> {
    try {
      const categoryRecord = await this.productModel.findOne({ _id: productId }).populate({
        path: 'categories',
      });
      if (!categoryRecord) {
        throw new Error('Product record not found');
      }

      return { product: categoryRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/product/update/:id
      UPDATES AN EXISTING RECORD
  */

  public async editProduct(productId: string, productInputDTO: IProductInputDTO): Promise<{ product: IProduct }> {
    try {
      const query = { _id: productId };
      const update = {
        name: productInputDTO.name,
        description: productInputDTO.description,
        price: productInputDTO.price,
        countInStock: productInputDTO.countInStock,
      };
      this.logger.silly('Editing product db record');
      const categoryRecord = await this.productModel.findOneAndUpdate(query, update, {
        new: true,
      });

      if (!categoryRecord) {
        throw new Error('Product record not found');
      }

      return { product: categoryRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/product/add
      ADDS A NEW RECORD
  */
  public async addProduct(
    productInputDTO: IProductInputDTO,
    userId: string,
  ): Promise<{
    product: IProduct;
  }> {
    try {
      this.logger.silly('Creating product db record');
      const newRecord = await this.productModel.create({ ...productInputDTO, user: userId });

      this.eventDispatcher.dispatch(events.product.addProduct, { product: newRecord });

      const product = newRecord.toObject();

      return { product };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/product/delete/:id
      DELETES AN EXISTING RECORD
  */

  public async deleteProduct(productId: string): Promise<{ product: IProduct }> {
    try {
      const productRecord = await this.productModel.findOne({ _id: productId });
      if (!productRecord) {
        throw new Error('Product record not found');
      }

      await this.productModel.deleteOne({ _id: productId });

      return { product: productRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
