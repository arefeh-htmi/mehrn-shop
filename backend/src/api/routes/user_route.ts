import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();

export const userRute = (app: Router) => {
  app.use('/user', route);

  route.get('/profile', middlewares.isAuthenticated, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
};
