import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { ProductService } from '@src/services/product_service';
import { IProductInputDTO } from '@src/interfaces/IProduct';
const route = Router();

export const productRute = (app: Router): void => {
  app.use('/products', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling get Products endpoint with query: %o', req.query);
    try {
      const productServiceInstance = Container.get(ProductService);
      const pageNumber = Number(req.query.pageNumber) || 1;
      const keyWord = req.query.keyword ? (req.query.keyword as string) : null;
      const { poducts, page, pages } = await productServiceInstance.getProducts(pageNumber, keyWord);
      return res.status(201).json({ poducts, page, pages });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling get Product endpoint with params: %o', req.params);
    try {
      const productServiceInstance = Container.get(ProductService);
      const productId = req.params.id;
      const { product } = await productServiceInstance.getProduct(productId);
      return res.status(201).json({ product });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.post(
    '/add',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        countInStock: Joi.number().required(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Add new Product endpoint with body: %o', req.body);
      try {
        const productServiceInstance = Container.get(ProductService);
        const userId = req.currentUser?.id;
        const { product } = await productServiceInstance.addProduct(req.body as IProductInputDTO, userId);
        return res.status(201).json({ product });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    '/update/:id',
    celebrate({
      body: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        price: Joi.number().optional(),
        countInStock: Joi.number().optional(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling edit Product endpoint with body: %o and params: %o', req.body, req.params);
      try {
        const productServiceInstance = Container.get(ProductService);
        const productId = req.params.id;
        const { product } = await productServiceInstance.editProduct(productId, req.body as IProductInputDTO);
        return res.status(201).json({ product });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.delete(
    '/delete/:id',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling delete Product endpoint with params: %o', req.params);
      try {
        const productServiceInstance = Container.get(ProductService);
        const productId = req.params.id;
        const product = await productServiceInstance.deleteProduct(productId);
        return res.status(201).json({ product });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
