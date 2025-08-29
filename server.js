const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

const port = process.env.PORT || 9000;
const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

mongoose
  .connect(mongoUrl)
  .then(() => logger.info('✅ Connected to MongoDB'))
  .catch((err) => logger.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express & Docker!' });
});

app.listen(port, () => {
  logger.info(`🚀 Server running at http://localhost:${port}`);
});
