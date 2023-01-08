import Agenda from 'agenda';
import { config } from '@src/config';

export const agendaFactory = ({ mongoConnection }) => {
  return new Agenda({
    mongo: mongoConnection,
    db: { collection: config.agenda.dbCollection, address: config.databaseURL },
    processEvery: config.agenda.pooltime,
    maxConcurrency: config.agenda.concurrency,
  });
  /**
   * This voodoo magic is proper from agenda.js:
   * https://github.com/agenda/agenda#mongomongoclientinstance
   */
};
