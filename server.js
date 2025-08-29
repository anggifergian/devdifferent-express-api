const express = require('express');
const logger = require('./utils/logger');

const app = express();

require('./startup/db')();
require('./startup/middleware')(app);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  logger.info(`🚀 Server running at http://localhost:${port}`);
});
