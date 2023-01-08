import { Service, Inject } from 'typedi';
import { MailService } from '@src/services/mail_service';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { ICategory, ICategoryInputDTO } from '@src/interfaces/ICategory';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class CategoryService {
  constructor(
    @Inject('categoryModel') private categoryModel: Models.CategoryModel,
    private mailer: MailService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/category/list
        GET A PAGINATED LIST OF RECORDS
  */

  public async getCategories(
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ categories: ICategory[]; page: number; pages: number }> {
    try {
      /*TODO:  a better wa for pagination and search in documents*/
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

      const totalRecordsCount = await this.categoryModel.countDocuments({ ...query });
      const categoryList = (await this.categoryModel
        .find({ ...query })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1))) as ICategory[];

      return { categories: categoryList, page: pageNumber, pages: Math.ceil(totalRecordsCount / pageSize) };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/category/:id
        GET AN EXISTING RECORD
  */

  public async getCategory(categoryId: number): Promise<{ category: ICategory }> {
    try {
      const categoryRecord = await this.categoryModel.findOne({ _id: categoryId });

      if (!categoryRecord) {
        throw new Error('Category record not found');
      }

      return { category: categoryRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/category/delete/:id
      DELETES AN EXISTING RECORD
  */

  public async deleteCategory(categoryId: string): Promise<{ category: ICategory }> {
    try {
      const categoryRecord = await this.categoryModel.findOne({ _id: categoryId });
      if (!categoryRecord) {
        throw new Error('Category record not found');
      }

      await this.categoryModel.deleteOne({ _id: categoryId });
      return { category: categoryRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/category/update/:id
        UPDATES AN EXISTING RECORD
  */

  public async editCategory(categoryId: number, categoryInputDTO: ICategoryInputDTO): Promise<{ category: ICategory }> {
    try {
      const query = { _id: categoryId };
      const update = {
        name: categoryInputDTO.name,
        description: categoryInputDTO.description,
        isActive: categoryInputDTO.isActive,
        image: categoryInputDTO.image,
      };

      const categoryRecord = await this.categoryModel.findOneAndUpdate(query, update, {
        new: true,
      });

      if (!categoryRecord) {
        throw new Error('Category record not found');
      }

      return { category: categoryRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/category/add
        ADDS A NEW RECORD
  */
  public async addCategory(categoryInputDTO: ICategoryInputDTO): Promise<{
    category: ICategory;
  }> {
    try {
      const categoryRecord = await this.categoryModel.findOne({ name: categoryInputDTO.name });

      if (categoryRecord) {
        throw new Error('Category already registered');
      }

      this.logger.silly('Creating category db record');
      const newRecord = await this.categoryModel.create(categoryInputDTO);

      this.eventDispatcher.dispatch(events.category.addCategory, { category: newRecord });

      const category = newRecord.toObject();

      return { category };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
