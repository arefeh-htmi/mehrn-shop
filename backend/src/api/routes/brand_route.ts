import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { BrandService } from '@src/services/brand_service';
import { IBrandInputDTO } from '@src/interfaces/IBrand';
const route = Router();

export const BrandRoute = (app: Router): void => {
  app.use('/brand', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling get Brands endpoint with query: %o', req.query);
    try {
      const brandServiceInstance = Container.get(BrandService);
      const pageNumber = Number(req.query.pageNumber) || 1;
      const keyWord = req.query.keyword ? (req.query.keyword as string) : null;
      const { brands, page, pages } = await brandServiceInstance.getBrands(pageNumber, keyWord);
      return res.status(201).json({ brands, page, pages });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling get Brand endpoint with params: %o', req.params);
    try {
      const brandServiceInstance = Container.get(BrandService);
      const brandId = Number(req.params.id);
      const { brand } = await brandServiceInstance.getBrand(brandId);
      return res.status(201).json({ brand });
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
        isActive: Joi.bool().required(),
        image: Joi.string().optional(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Add new Brand endpoint with body: %o', req.body);
      try {
        const brandServiceInstance = Container.get(BrandService);
        const { brand } = await brandServiceInstance.addBrand(req.body as IBrandInputDTO);
        return res.status(201).json({ brand });
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
        isActive: Joi.bool().optional(),
        image: Joi.string().optional(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling edit Brand endpoint with body: %o and params: %o', req.body, req.params);
      try {
        const brandServiceInstance = Container.get(BrandService);
        const brandId = Number(req.params.id);
        const { brand } = await brandServiceInstance.editBrand(brandId, req.body as IBrandInputDTO);
        return res.status(201).json({ brand });
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
      logger.debug('Calling delete Brand endpoint with params: %o', req.params);
      try {
        const brandServiceInstance = Container.get(BrandService);
        const brandId = req.params.id;
        const brand = await brandServiceInstance.deleteBrand(brandId);
        return res.status(201).json({ brand });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
