import 'reflect-metadata'; // to use @Decorators

import express from 'express';
import { LoggerInstance as Logger } from '@src/loaders/logger_loader';
import { config } from '@src/config';

async function startServer() {
  const app = express();

  /**
   TOCHECK: In node 10 without babel and at the time of writing we are using good old require. If updated check
   **/
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await require('./loaders').default({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
