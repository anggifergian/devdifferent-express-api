const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const logger = require('../utils/logger');

module.exports = function (app) {
  /**=== Add Morgan ===*/
  app.use(require('pino-http')({ logger }));

  /**=== Enable CORS ===*/
  app.use(cors());

  /**=== Secure HTTP headers ===*/
  app.use(helmet());

  /**=== Allow JSON request ===*/
  app.use(bodyParser.json());

  /**=== Allow x-www-form-urlencoded request ===*/
  app.use(bodyParser.urlencoded({ extended: true }));

  /**=== Static files ===*/
  app.use(express.static('public'));

  /**=== Main Route ===*/
  app.use('/api/v1', require('./routes'));

  /**=== Error Handler ===*/
  app.use(require('./errorHandler'));
};
