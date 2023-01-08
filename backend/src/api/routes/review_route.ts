import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { ReviewService } from '@src/services/review_service';
import { IReviewInputDTO } from '@src/interfaces/IReview';
const route = Router();

export const ReviewRute = (app: Router) => {
  app.use('/reviews', route);

  route.post(
    '/add/:productId',
    celebrate({
      body: Joi.object({
        rating: Joi.string().required(),
        comment: Joi.string().required(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Add new Review endpoint with body: %o', req.body);
      try {
        const reviewServiceInstance = Container.get(ReviewService);
        const productId = req.params.productId;
        const { review } = await reviewServiceInstance.addRview(productId, req.body as IReviewInputDTO);
        return res.status(201).json({ review });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
