import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { AdminService } from '@src/services/admin_service';
import { IUserInputDTO } from '@src/interfaces/IUser';
const route = Router();

export const AdminRnuote = (app: Router): void => {
  app.use('/admin', route);

  route.get(
    '/profile/:userId',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling get users endpoint with query: %o ', req.params);
      try {
        const adminServiceInstance = Container.get(AdminService);
        const userId = req.params.userId;
        const { user } = await adminServiceInstance.getUser(userId);
        return res.status(201).json({ user });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    '/profile/:userId',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        phoneNumber: Joi.bool().optional(),
        email: Joi.string().optional(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAuthenticated([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling edit user profile endpoint with body: %o ', req.body);
      try {
        const adminServiceInstance = Container.get(AdminService);
        const userId = req.params.userId;
        const { user } = await adminServiceInstance.editUser(userId, req.body as IUserInputDTO);
        return res.status(201).json({ user });
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
      logger.debug('Calling delete User endpoint with params: %o', req.params);
      try {
        const adminServiceInstance = Container.get(AdminService);
        const userId = req.params.id;
        const user = await adminServiceInstance.deleteUser(userId);
        return res.status(201).json({ user });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
