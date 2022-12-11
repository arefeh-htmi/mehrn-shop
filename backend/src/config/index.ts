const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// config() will read your .env file, parse the contents, assign it to process.env.
const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  envirenment: process.env.NODE_ENV,
  databaseURL: process.env.DATABASE_URI,
  jwt : {
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
  },
  /**
   * Used by winston logger
   */
   logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  paypal: {
    publicKey: process.env.PAYPAL_PUBLIC_KEY,
    secretKey: process.env.PAYPAL_SECRET_KEY,
  },
    /**
   * Agenda.js stuff
   */
     agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY || '', 10),
      },
    
      /**
       * Agendash config
       */
      agendash: {
        user: 'agendash',
        password: '123456'
      },
      /**
       * API configs
       */
      api: {
        prefix: '/api',
      },
      /**
       * Mailgun email credentials
       */
      mailgun: {
        apiKey: process.env.MAILGUN_API_KEY,
        apiUsername: process.env.MAILGUN_USERNAME,
        domain: process.env.MAILGUN_DOMAIN
      },

  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    sender: process.env.MAILCHIMP_SENDER,
  },
}