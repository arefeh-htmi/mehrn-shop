import { Service, Inject } from 'typedi';
import { MailService } from '@src/services/mail_service';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { IMerchant, IMerchantInputDTO } from '@src/interfaces/IMerchant';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';
import { MerchantApprovalStatus } from '@src/types';

@Service()
export class MerchantService {
  constructor(
    @Inject('merchantModel') private merchantModel: Models.MerchantModel,
    private mailer: MailService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/merchant/
        GET AN EXISTING RECORD
  */

  public async getMerchants(
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ poducts: IMerchant[]; page: number; pages: number }> {
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

    const totalMerchantsCount = await this.merchantModel.countDocuments({ ...query });
    const merchantsList = (await this.merchantModel
      .find({ ...query })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1))) as IMerchant[];

    return { poducts: merchantsList, page: pageNumber, pages: Math.ceil(totalMerchantsCount / pageSize) };
  }

  /*
      ROUTE: api/merchant/:id
      GET AN EXISTING RECORD
  */

  public async getMerchant(merchantId: string): Promise<{ merchant: IMerchant }> {
    try {
      const merchantRecord = await this.merchantModel.findOne({ _id: merchantId }).populate({
        path: 'categories',
      });
      if (!merchantRecord) {
        throw new Error('Merchant record not found');
      }

      return { merchant: merchantRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/merchant/update/:merchantId
      UPDATES AN EXISTING RECORD
  */

  public async editMerchant(merchantId: string, merchantInputDTO: IMerchantInputDTO): Promise<{ merchant: IMerchant }> {
    try {
      const query = { _id: merchantId };
      const update = {
        name: merchantInputDTO.name,
        business: merchantInputDTO.business,
        phoneNumber: merchantInputDTO.phoneNumber,
        email: merchantInputDTO.email,
        brand: merchantInputDTO.brand,
      };
      this.logger.silly('Editing merchant db record');
      const merchantRecord = await this.merchantModel.findOneAndUpdate(query, update, {
        new: true,
      });

      if (!merchantRecord) {
        throw new Error('Merchant record not found');
      }

      return { merchant: merchantRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/merchant/approve/:merchantId
      UPDATES AN EXISTING RECORD
  */

  public async approveMerchant(merchantId: string): Promise<{ merchant: IMerchant }> {
    try {
      const query = { _id: merchantId };
      const update = {
        status: MerchantApprovalStatus.Approved,
      };
      this.logger.silly('approving merchant db record');
      const merchantRecord = await this.merchantModel.findOneAndUpdate(query, update, {
        new: true,
      });

      if (!merchantRecord) {
        throw new Error('Merchant record not found');
      }

      return { merchant: merchantRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/merchant/reject/:merchantId
      ADDS A NEW RECORD
  */

  public async rejectMerchant(merchantId: string): Promise<{ merchant: IMerchant }> {
    try {
      const query = { _id: merchantId };
      const update = {
        status: MerchantApprovalStatus.Rejected,
      };
      this.logger.silly('rejecting merchant db record');
      const merchantRecord = await this.merchantModel.findOneAndUpdate(query, update, {
        new: true,
      });

      if (!merchantRecord) {
        throw new Error('Merchant record not found');
      }

      return { merchant: merchantRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/merchant/add
      ADDS A NEW RECORD
  */

  public async submitMerchantRequest(merchantInputDTO: IMerchantInputDTO): Promise<{
    merchant: IMerchant;
  }> {
    try {
      const merchantRecord = await this.merchantModel.findOne({ email: merchantInputDTO.email });
      if (merchantRecord) {
        throw new Error('Merchant record already registered');
      }

      this.logger.silly('Creating merchant db record');
      const newRecord = await this.merchantModel.create({ ...merchantInputDTO });

      await this.mailer.sendMerchantApplicationSubmitted(newRecord.email);

      this.eventDispatcher.dispatch(events.merchant.submitRequestMerchant, { merchant: newRecord });

      const merchant = newRecord.toObject();

      return { merchant };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
      ROUTE: api/merchant/delete/:merchantId
      DELETES AN EXISTING RECORD
  */

  public async deleteMerchant(merchantId: string): Promise<{ merchant: IMerchant }> {
    try {
      const merchantRecord = await this.merchantModel.findOne({ _id: merchantId });
      if (!merchantRecord) {
        throw new Error('Merchant record not found');
      }

      await this.merchantModel.deleteOne({ _id: merchantId });

      return { merchant: merchantRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
