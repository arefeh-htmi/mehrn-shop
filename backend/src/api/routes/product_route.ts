import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { ProductService } from '@src/services/product_service';
import { IProductInputDTO } from '@src/interfaces/IProduct';
const route = Router();

export const productRute = (app: Router) => {
  app.use('/products', route);

  /*
  GET 
    get list of products
  */
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

  /*
  POST 
    add new product 
  */
  route.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        rating: Joi.number().required(),
        numReviews: Joi.number().required(),
        price: Joi.number().required(),
        countInStock: Joi.number().required(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.isAutherized([UserRoles.Admin]),
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Create new Product endpoint with body: %o', req.body);
      try {
        const productServiceInstance = Container.get(ProductService);
        const { poducts } = await productServiceInstance.createProduct(req.body as IProductInputDTO);
        return res.status(201).json({ poducts });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/:id/reviews',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ user: req.currentUser }).status(200);
    },
  );
};
