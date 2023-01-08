import { IUserInputDTO } from '@src/interfaces/IUser';
import { UserService } from '@src/services/user_service';
import { UserRoles } from '@src/types';
import { celebrate, Joi } from 'celebrate';
import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';
const route = Router();

export const userRute = (app: Router): void => {
  app.use('/user', route);

  route.get(
    '/profile/:userId',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling get user endpoint with query: %o ', req.params);
      try {
        const userServiceInstance = Container.get(UserService);
        const userId = req.params.userId;
        const { user } = await userServiceInstance.getUser(userId);
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
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        isActive: Joi.bool().optional(),
        image: Joi.string().optional(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling edit user profile endpoint with body: %o ', req.body);
      try {
        const userServiceInstance = Container.get(UserService);
        const userId = req.params.userId;
        const { user } = await userServiceInstance.editUser(userId, req.body as IUserInputDTO);
        return res.status(201).json({ user });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
