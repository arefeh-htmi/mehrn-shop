
import { Router } from 'express'
import basicAuth from 'express-basic-auth';
import agendash from 'agendash'
import { Container } from 'typedi'
import {config} from '@src/config'

export const agendaInstanceRoute = (app: Router) => {

  const agendaInstance = Container.get('agendaInstance')

  app.use('/dash', 
    basicAuth({
	  users: {
	    [config.agendash.user]: config.agendash.password,
	  },
	  challenge: true,
	}),
	agendash(agendaInstance)
  )
}


