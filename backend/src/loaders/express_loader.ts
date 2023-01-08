import express from 'express';
import cors from 'cors';
import { OpticMiddleware } from '@useoptic/express-middleware';
import routes from '@src/api';
import { config } from '@src/config';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export const expressLoader = ({ app }: { app: express.Application }): void => {
  // TOKnow: when you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc), shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // @FROMOLD: SETTINGS IN DEVELOPMENT EVN
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // ALTERNATIVE: Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // TOKnow: "Lets you use HTTP  verbs such as PUT or DELETE in places where the client doesn't support it."
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('method-override')());

  // TOKnow: Transforms the raw string of req.body into json
  app.use(express.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  // Load API routes
  app.use(config.api.prefix, routes());

  // API Documentation
  app.use(
    OpticMiddleware({
      enabled: process.env.NODE_ENV !== 'production',
    }),
  );

  /// TOKnow:catch 404 and forward to error handler
  //TODO: Seprate error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  //TODO: Seprate error handler
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
