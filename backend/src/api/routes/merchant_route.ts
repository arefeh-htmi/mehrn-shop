import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { UserRoles } from '@src/types/';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';
import { MerchantService } from '@src/services/merchant_service';
import { IMerchantInputDTO } from '@src/interfaces/IMerchant';
const route = Router();

export const merchantRoute = (app: Router): void => {
  app.use('/merchant', route);

  /*
    GET
    Route:    /api/merchant/
    Access ADMIN
    */
  route.get(
    '/',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling get Merchants endpoint with query: %o', req.query);
      try {
        const merchantServiceInstance = Container.get(MerchantService);
        const pageNumber = Number(req.query.pageNumber) || 1;
        const keyWord = req.query.keyword ? (req.query.keyword as string) : null;
        const { poducts, page, pages } = await merchantServiceInstance.getMerchants(pageNumber, keyWord);
        return res.status(201).json({ poducts, page, pages });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
    GET
    Route:    /api/merchant/:merchantId
    Access ADMIN, merchan
    */

  route.get(
    '/:merchantId',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin, UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling get Merchant endpoint with params: %o', req.params);
      try {
        const merchantServiceInstance = Container.get(MerchantService);
        const merchantId = req.params.merchantId;
        const { merchant } = await merchantServiceInstance.getMerchant(merchantId);
        return res.status(201).json({ merchant });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
    POST
    Route:    /api/merchant/approve/:merchantId
    Access ADMIN
    */

  route.post(
    '/seller-request',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        business: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        brand: Joi.string().required(),
      }),
    }),

    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling request new selelr/merchant endpoint with body: %o', req.body);
      try {
        const merchantServiceInstance = Container.get(MerchantService);
        const { merchant } = await merchantServiceInstance.submitMerchantRequest(req.body as IMerchantInputDTO);
        return res.status(201).json({ merchant });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
    PUT
    Route:    /api/merchant/approve/:merchantId
    Access ADMIN
    */

  route.put(
    '/approve/:merchantId',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling approve Merchant endpoint with body: %o and params: %o', req.body, req.params);
      try {
        const merchantServiceInstance = Container.get(MerchantService);
        const merchantId = req.params.merchantId;
        const { merchant } = await merchantServiceInstance.approveMerchant(merchantId);
        return res.status(201).json({ merchant });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
    PUT
    Route:    /api/merchant/reject/:merchantId
    Access ADMIN
    */

  route.put(
    '/reject/:merchantId',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling reject Merchant endpoint with body: %o and params: %o', req.body, req.params);
      try {
        const merchantServiceInstance = Container.get(MerchantService);
        const merchantId = req.params.merchantId;
        const { merchant } = await merchantServiceInstance.rejectMerchant(merchantId);
        return res.status(201).json({ merchant });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
    PUT
    Route:    /api/merchant/edit/:merchantId
    Access merchant
    */

  route.put(
    '/update/:merchantId',
    celebrate({
      body: Joi.object({
        name: Joi.string().optional(),
        business: Joi.string().optional(),
        phoneNumber: Joi.string().optional(),
        email: Joi.string().optional(),
        brand: Joi.string().optional(),
      }),
    }),
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Merchant]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling edit Merchant endpoint with body: %o and params: %o', req.body, req.params);
      try {
        const merchantServiceInstance = Container.get(MerchantService);
        const merchantId = req.params.merchantId;
        const { merchant } = await merchantServiceInstance.editMerchant(merchantId, req.body as IMerchantInputDTO);
        return res.status(201).json({ merchant });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
    Delete
    Route:    /api/merchant/delete/:merchantId
    Access ADMIN
    */

  route.delete(
    '/delete/:merchantId',
    middlewares.isAuthenticated,
    middlewares.attachCurrentUser,
    middlewares.isAutherized([UserRoles.Admin]),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling delete Merchant endpoint with params: %o', req.params);
      try {
        const merchantServiceInstance = Container.get(MerchantService);
        const merchantId = req.params.merchantId;
        const merchant = await merchantServiceInstance.deleteMerchant(merchantId);
        return res.status(201).json({ merchant });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
