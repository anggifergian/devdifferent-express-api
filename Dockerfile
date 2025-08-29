# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install -g pm2

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the app port
EXPOSE 9000

# Start app with PM2 in foreground (no daemon mode)
CMD ["pm2-runtime", "server.js"]
