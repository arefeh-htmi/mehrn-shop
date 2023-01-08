import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
import Container from 'typedi';
const route = Router();

export const paymentRoute = (app: Router) => {
  app.use('/payment', route);

  route.get('/config/paypal', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Paypal payment endpoint with');
    try {
      return res.send(process.env.PAYPAL_CLIENT_ID);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
