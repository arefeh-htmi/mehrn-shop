import { expressLoader } from '@src/loaders/express_loader';
import dependencyInjectorLoader from '@src/loaders/dependencyInjector_loader';
import { mongooseLoader } from '@src/loaders/mongoose_loader';
import { tasksLoader } from '@src/loaders/tasks_loader';
import { LoggerInstance as Logger } from '@src/loaders/logger_loader';
//We have to import at least all the events once so they can be triggered
import '@src/loaders/events_loader';

export default async ({ expressApp }): Promise<void> => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * TOKNOW: Providing flexibility for test perpuses by injecting the mongoose models into the DI container.
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    model: require('../models/user_model').default,
  };

  const productModel = {
    name: 'productModel',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    model: require('../models/product_model').default,
  };

  const reviewModel = {
    name: 'reviewModel',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    model: require('../models/review_model').default,
  };

  const brandModel = {
    name: 'brand_model',
    // Notice the require syntax and the '.default'
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    model: require('../models/brand_model').default,
  };

  const categoryModel = {
    name: 'category_model',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    model: require('../models/category_model').default,
  };

  const orderModel = {
    name: 'order_model',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    model: require('../models/order_model').default,
  };

  const merchantModel = {
    name: 'merchant_model',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    model: require('../models/merchant_model').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [userModel, productModel, reviewModel, brandModel, categoryModel, orderModel, merchantModel],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await tasksLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
