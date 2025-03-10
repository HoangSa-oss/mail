require('dotenv').config();

export default {
  /* App Configs */
  port: process.env.PORT || 9005,
  playground: (process.env.APOLLO_PLAYGROUND === 'true' && true) || false,
  introspection: (process.env.APOLLO_INTROSPECTION === 'true' && true) || false,
  debug: (process.env.APOLLO_DEBUG === 'true' && true) || false,
  tracing: (process.env.APOLLO_TRACING === 'true' && true) || false,
  path: process.env.APOLLO_PATH || '/graphql',
  whitelist: process.env.SERVER_REQUEST_WHITE_LIST,
  corsEnabled: process.env.SERVER_CORS_ENABLED,
  loggerRouteName: process.env.LOGGER_ROUTE_NAME,
  loggerRouteStorage: process.env.LOGGER_ROUTE_STORAGE,
  apiKeyMandrill: process.env.API_KEY_MANDRILL,
  hostSMTP: process.env.SMTP_HOST,
  portSMTP: process.env.SMTP_PORT,
  infoByDomain: {
    default: {
      userSMTP: process.env.SMTP_USER_RADAA,
      passSMTP: process.env.SMTP_PASS_RADAA,
      fromSMTP: 'Radaa System',
      fromEmailAlert: 'nnotification@kompa.vn',
      fromEmailReport: 'goodday@kompa.vn',
      fromName: 'Kompa Media Notification',
      domainViewMail: process.env.DOMAIN_KOMPA
    },
    radaa: {
      userSMTP: process.env.SMTP_USER_RADAA,
      passSMTP: process.env.SMTP_PASS_RADAA,
      fromSMTP: 'Radaa System',
      fromEmailAlert: 'notification@radaa.net',
      fromEmailReport: 'goodday@radaa.net',
      fromName: 'Radaa System',
      domainViewMail: process.env.DOMAIN_RADAA
    },
    kompa: {
      userSMTP: process.env.SMTP_USER_RADAA,
      passSMTP: process.env.SMTP_PASS_RADAA,
      fromSMTP: 'Radaa System',
      fromEmailAlert: 'notification@kompa.vn',
      fromEmailReport: 'goodday@kompa.vn',
      fromName: 'Kompa Media Notification',
      domainViewMail: process.env.DOMAIN_KOMPA
    },
    report247: {
      userSMTP: process.env.SMTP_USER_RADAA,
      passSMTP: process.env.SMTP_PASS_RADAA,
      fromSMTP: 'Radaa System',
      fromEmailAlert: 'notification@report247.net',
      fromEmailReport: 'goodday@report247.net',
      fromName: 'Report 247',
      domainViewMail: process.env.DOMAIN_REPORT247
    }
  },
  domain: process.env.DOMAIN,
  slackCMSHealthcheckWebHookURL: process.env.SLACK_CMS_HEALTHCHECK_WEBHOOK_URL,
  /* App Configs */

  /* Mongo Configs */
  mongoCollectionPrefix: process.env.MONGO_COLLECTION_PREFIX,
  mongoDefaultHost: process.env.MONGO_DEFAULT_HOST,
  mongoDefaultPort: process.env.MONGO_DEFAULT_PORT,
  mongoDefaultDbName: process.env.MONGO_DEFAULT_DB_NAME,
  mongoDefaultUser: process.env.MONGO_DEFAULT_USER,
  mongoDefaultPass: process.env.MONGO_DEFAULT_PASS,
  /* Mongo Configs */

  /* AMQP Configs */
  amqpDefaultHost: process.env.AMQP_DEFAULT_HOST,
  amqpDefaultPort: process.env.AMQP_DEFAULT_PORT,
  amqpDefaultUser: process.env.AMQP_DEFAULT_USER,
  amqpDefaultPassword: process.env.AMQP_DEFAULT_PASS,
  amqpQueueEmail: process.env.AMQP_QUEUE_EMAIL,
  /* AMQP Configs */

  /* Redis Configs */
  redisDefaultHost: process.env.REDIS_DEFAULT_HOST,
  redisDefaultPort: process.env.REDIS_DEFAULT_PORT,
  redisDefaultDbName: process.env.REDIS_DEFAULT_DB_NAME
  /* Redis Configs */
};
