const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(
    {
      err,
      method: req.method,
      url: req.originalUrl,
      body: req.body,
    },
    'Unhandled error'
  );

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? 'Internal Server Error' : err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
