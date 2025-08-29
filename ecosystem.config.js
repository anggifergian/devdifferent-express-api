module.exports = {
  apps: [
    {
      name: 'express-api',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        MONGO_URL: 'mongodb://mongo:27017/mydb',
      },
    },
  ],
};
