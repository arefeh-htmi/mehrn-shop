import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { NewsLetterService } from '@src/services/newsletter_service';
const route = Router();

export const newsletterRoute = (app: Router): void => {
  app.use('/newsletter', route);

  route.post(
    '/subscribe',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling subscribe to newsletter endpoint with body: %o', req.body);
      try {
        const newsletterInstance = Container.get(NewsLetterService);
        const email = req.body.email;
        await newsletterInstance.subscribe(email);
        return res.status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
