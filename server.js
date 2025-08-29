require('dotenv').config();
const express = require('express');
const logger = require('./utils/logger');

logger.info('Mongo URI:', process.env.MONGO_URI);
logger.info('S3 Bucket:', process.env.AWS_S3_BUCKET);

const app = express();

require('./startup/db')();
require('./startup/middleware')(app);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  logger.info(`🚀 Server running at http://localhost:${port}`);
});
