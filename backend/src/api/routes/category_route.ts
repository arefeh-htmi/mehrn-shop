import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { CategoryService } from '@src/services/category_service';
import { ICategoryInputDTO } from '@src/interfaces/ICategory';
const route = Router();

export const CategorRoute = (app: Router): void => {
  app.use('/category', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling get Categories endpoint with query: %o', req.query);
    try {
      const categoryServiceInstance = Container.get(CategoryService);
      const pageNumber = Number(req.query.pageNumber) || 1;
      const keyWord = req.query.keyword ? (req.query.keyword as string) : null;
      const { categories, page, pages } = await categoryServiceInstance.getCategories(pageNumber, keyWord);
      return res.status(201).json({ categories, page, pages });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling get Category endpoint with query: %o', req.params);
    try {
      const categoryServiceInstance = Container.get(CategoryService);
      const categoryId = Number(req.params.id);
      const { category } = await categoryServiceInstance.getCategory(categoryId);
      return res.status(201).json({ category });
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
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Add new Category endpoint with body: %o', req.body);
      try {
        const categoryServiceInstance = Container.get(CategoryService);
        const { category } = await categoryServiceInstance.addCategory(req.body as ICategoryInputDTO);
        return res.status(201).json({ category });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    'update/:id',
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
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling edit Category endpoint with body: %o and params: %o', req.body, req.params);
      try {
        const categoryServiceInstance = Container.get(CategoryService);
        const categoryId = Number(req.params.id);
        const { category } = await categoryServiceInstance.editCategory(categoryId, req.body as ICategoryInputDTO);
        return res.status(201).json({ category });
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
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling delete Category endpoint with params: %o', req.params);
      try {
        const categoryServiceInstance = Container.get(CategoryService);
        const categoryId = req.params.id;
        const category = await categoryServiceInstance.deleteCategory(categoryId);
        return res.status(201).json({ category });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
