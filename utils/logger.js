const pino = require('pino');

const transport =
  process.env.NODE_ENV === 'development'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: true,
          ignore: 'pid,hostname',
        },
      }
    : undefined;

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  transport ? pino.transport(transport) : undefined
);

module.exports = logger;
