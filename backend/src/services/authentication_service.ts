import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { MailService } from '@src/services/mail_service';
import { config } from '@src/config';
import { IUser, IUserInputDTO } from '@src/interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/eventDispatcher_decorator';
import { eventsSubscriber as events } from '@src/subscribers/events_subscriber';

@Service()
export class AuthService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    private mailer: MailService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
    try {
      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create(userInputDTO);
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.logger.silly('Sending welcome email');
      await this.mailer.SendWelcomeEmail(userRecord);

      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

      /**
       * TODO: Map data in layers
       */
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    this.logger.silly('Checking password');

    const validPassword = await userRecord.validatePassword(password);

    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, //used this in the middleware 'isAuth'
        role: user.role,
        name: user.firstName + user.lastName,
        exp: exp.getTime() / 1000,
      },
      config.jwt.jwtSecret,
    );
  }
}
