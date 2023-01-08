import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { OrderService } from '@src/services/order_service';
import { IOrderInputDTO } from '@src/interfaces/IOrder';
const route = Router();

export const OrderRoute = (app: Router): void => {
  app.use('/order', route);

  route.get(
    '/all',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling get all Orders endpoint with query: %o', req.query);
      try {
        const orderServiceInstance = Container.get(OrderService);
        const pageNumber = Number(req.query.pageNumber) || 1;
        const keyWord = req.query.keyword ? (req.query.keyword as string) : null;
        const { orders, page, pages } = await orderServiceInstance.getAllOrders(pageNumber, keyWord);
        return res.status(201).json({ orders, page, pages });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/my-orders',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Customer]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling get my Orders endpoint with query: %o', req.query);
      try {
        const orderServiceInstance = Container.get(OrderService);
        const pageNumber = Number(req.query.pageNumber) || 1;
        const keyWord = req.query.keyword ? (req.query.keyword as string) : null;
        const currentUserId = req.currentUser.id;
        const { orders, page, pages } = await orderServiceInstance.getCurrentUserOrders(
          currentUserId,
          pageNumber,
          keyWord,
        );
        return res.status(201).json({ orders, page, pages });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling get Order endpoint with params: %o', req.params);
    try {
      const orderServiceInstance = Container.get(OrderService);
      const orderId = Number(req.params.id);
      const { order } = await orderServiceInstance.getOrder(orderId);
      return res.status(201).json({ order });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.post(
    '/new-order',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.bool().required(),
        image: Joi.string().optional(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Customer]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Add new Order endpoint with body: %o', req.body);
      try {
        const orderServiceInstance = Container.get(OrderService);
        const currentUserId = req.currentUser.id;
        const { order } = await orderServiceInstance.placeNewOrder(currentUserId, req.body as IOrderInputDTO);
        return res.status(201).json({ order });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
