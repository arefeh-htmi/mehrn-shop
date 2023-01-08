import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { IBrand, IBrandInputDTO } from '@src/interfaces/IBrand';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class BrandService {
  constructor(
    @Inject('brandModel') private brandModel: Models.BrandModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/brand/list
        GET A PAGINATED LIST OF RECORDS
  */

  public async getBrands(
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ brands: IBrand[]; page: number; pages: number }> {
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

      const totalRecordsCount = await this.brandModel.countDocuments({ ...query });
      const brandList = (await this.brandModel
        .find({ ...query })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1))) as IBrand[];

      return { brands: brandList, page: pageNumber, pages: Math.ceil(totalRecordsCount / pageSize) };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/brand/:id
        GET AN EXISTING RECORD
  */

  public async getBrand(brandId: number): Promise<{ brand: IBrand }> {
    try {
      const brandRecord = await this.brandModel.findOne({ _id: brandId });

      if (!brandRecord) {
        throw new Error('Brand record not found');
      }

      return { brand: brandRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/brand/update/:id
        UPDATES AN EXISTING RECORD
  */

  public async editBrand(brandId: number, brandInputDTO: IBrandInputDTO): Promise<{ brand: IBrand }> {
    try {
      const query = { _id: brandId };
      const update = {
        name: brandInputDTO.name,
        description: brandInputDTO.description,
        isActive: brandInputDTO.isActive,
        image: brandInputDTO.image,
      };
      this.logger.silly('Editing brand db record');
      const brandRecord = await this.brandModel.findOneAndUpdate(query, update, {
        new: true,
      });

      if (!brandRecord) {
        throw new Error('Brand record not found');
      }

      return { brand: brandRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/brand/add
        ADDS A NEW RECORD
  */
  public async addBrand(brandInputDTO: IBrandInputDTO): Promise<{
    brand: IBrand;
  }> {
    try {
      const brandRecord = await this.brandModel.findOne({ name: brandInputDTO.name });

      if (brandRecord) {
        throw new Error('Brand already registered');
      }

      this.logger.silly('Creating brand db record');
      const newRecord = await this.brandModel.create(brandInputDTO);

      this.eventDispatcher.dispatch(events.brand.addBrand, { brand: newRecord });

      const brand = newRecord.toObject();

      return { brand };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/brand/delete/:id
      DELETES AN EXISTING RECORD
  */

  public async deleteBrand(brandId: string): Promise<{ brand: IBrand }> {
    try {
      const brandRecord = await this.brandModel.findOne({ _id: brandId });
      if (!brandRecord) {
        throw new Error('Brand record not found');
      }

      await this.brandModel.deleteOne({ _id: brandId });
      return { brand: brandRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
