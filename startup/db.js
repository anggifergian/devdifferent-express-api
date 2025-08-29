const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports = async function () {
  try {
    mongoose.set('strictQuery', false);

    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/devdifferent';
    await mongoose.connect(mongoUri);

    logger.info(`✅ Connected to MongoDB at ${mongoUri}`);
  } catch (err) {
    logger.error(`❌ Could not connect to MongoDB at ${process.env.MONGO_URI}`, err);
    process.exit(1); // Stop the app if DB is unavailable
  }
};
