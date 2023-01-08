import { Container } from 'typedi';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { LoggerInstance as Logger } from '@src/loaders/logger_loader';
import { agendaFactory } from '@src/loaders/agendaFactory_loader';
import { config } from '@src/config';
import { Db } from 'mongodb';

export default ({ mongoConnection, models }: { mongoConnection: Db; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });
    const mgInstance = new Mailgun(formData);

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', Logger);
    Container.set(
      'emailClient',
      mgInstance.client({ key: '12345' || config.mailgun.apiKey, username: 'username' || config.mailgun.apiUsername }),
    );
    Container.set('emailDomain', config.mailgun.domain);

    Logger.info('✌️ Agenda injected into container');

    return { agenda: agendaInstance };
  } catch (e) {
    Logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
