import { config } from '@src/config';
import { EmailSequenceTask } from '@src/tasks/emailSequence_task';
import Agenda from 'agenda';

export const tasksLoader = ({ agenda }: { agenda: Agenda }) => {
  agenda.define(
    'send-email',
    { priority: 'high', concurrency: config.agenda.concurrency },
    // @TODO Could this be a static method? Would it be better?
    new EmailSequenceTask().handler,
  );

  agenda.start();
};
