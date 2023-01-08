import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';
import { MailService } from './mail_service';
import { IUser, IUserInputDTO } from '@src/interfaces/IUser';

@Service()
export class AdminService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    private mailer: MailService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  /*
        ROUTE: api/user/list
        GET A PAGINATED LIST OF RECORDS
  */

  public async getUsers(
    pageNumber: number,
    keyWord: string | null,
  ): Promise<{ users: IUser[]; page: number; pages: number }> {
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

      const totalRecordsCount = await this.userModel.countDocuments({ ...query });
      const userList = (await this.userModel
        .find({ ...query })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1))) as IUser[];

      return { users: userList, page: pageNumber, pages: Math.ceil(totalRecordsCount / pageSize) };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
        ROUTE: api/user/:id
        GET AN EXISTING RECORD
  */

  public async getUser(userId: string): Promise<{ user: IUser }> {
    try {
      const userRecord = await this.userModel.findOne({ _id: userId });

      if (!userRecord) {
        throw new Error('User record not found');
      }

      return { user: userRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*
    ROUTE: api/admin/update/:id
    UPDATES AN EXISTING RECORD
*/

  public async editUser(userId: string, userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      const query = { _id: userId };
      const update = {
        firstName: userInputDTO.firstName,
        lastName: userInputDTO.lastName,
        phoneNumber: userInputDTO.phoneNumber,
        email: userInputDTO.email,
      };
      this.logger.silly('Editing user db record');
      const userRecord = await this.userModel.findOneAndUpdate(query, update, {
        new: true,
      });

      if (!userRecord) {
        throw new Error('User record not found');
      }

      return { user: userRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  /*
      ROUTE: api/admin/delete/:id
      DELETES AN EXISTING RECORD
  */

  public async deleteUser(userId: string): Promise<{ user: IUser }> {
    try {
      const userRecord = await this.userModel.findOne({ _id: userId });
      if (!userRecord) {
        throw new Error('User record not found');
      }

      await this.userModel.deleteOne({ _id: userId });
      return { user: userRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
