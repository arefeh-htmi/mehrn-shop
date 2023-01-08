import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { IUser, IUserInputDTO } from '@src/interfaces/IUser';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

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
        ROUTE: api/user/update/:id
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
}
