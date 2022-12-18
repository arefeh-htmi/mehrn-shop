import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@src/services/authentication_service';
import { IUserInputDTO } from '@src/interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import passport from 'passport';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.get(
    '/google',
    passport.authenticate('google', {
      session: false,
      scope: ['profile', 'email'],
      accessType: 'offline',
      approvalPrompt: 'force',
    }),
  );

  route.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      res.json({
        id: req.currentUser.id,
        name: `${req.currentUser.firstName + req.currentUser.lastName}`,
        firstName: req.currentUser.firstName,
        lastName: req.currentUser.lastName,
        email: req.currentUser.email,
        role: req.currentUser.role,
      });
    },
  );

  route.get(
    '/facebook',
    passport.authenticate('facebook', {
      session: false,
      scope: ['public_profile', 'email'],
    }),
  );

  route.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/',
      session: false,
    }),
    (req, res) => {
      res.json({
        id: req.currentUser.id,
        name: `${req.currentUser.firstName + req.currentUser.lastName}`,
        firstName: req.currentUser.firstName,
        lastName: req.currentUser.lastName,
        email: req.currentUser.email,
        role: req.currentUser.role,
      });
    },
  );
};
