import { expressLoader } from '@src/loaders/express_loader';
import dependencyInjectorLoader from '@src/loaders/dependencyInjector_loader';
import { mongooseLoader } from '@src/loaders/mongoose_loader';
import { tasksLoader } from '@src/loaders/tasks_loader';
import { LoggerInstance as Logger } from '@src/loaders/logger_loader';
//We have to import at least all the events once so they can be triggered
import '@src/loaders/events_loader';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user_model').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      // salaryModel,
      // whateverModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await tasksLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
