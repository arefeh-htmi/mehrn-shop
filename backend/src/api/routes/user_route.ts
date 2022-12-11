import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();

export const userRute = (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuthenticated, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
};
