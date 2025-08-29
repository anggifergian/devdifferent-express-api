# ExpressJS S3 File Upload API

This repository contains a RESTful API built with ExpressJS for uploading files to an AWS S3 bucket.

## Features

- Upload files via REST API
- Store files securely in AWS S3

## Prerequisites

- Node.js (v18+)
- AWS account with S3 bucket
- Docker (optional)

## Configuration

Create a `.env` file in the root directory:

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
S3_BUCKET_NAME=your-bucket-name
PORT=3000
MONGO_URI=your-mongodb-uri
```

## Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. The API will be available at `http://localhost:3000`.

## Using Docker Compose

Build & Run the Docker image:

```bash
docker-compose up -d --build
```

## API Usage

- **POST** `/upload`
  - Form-data: `file` (the file to upload)
- **GET** `/download`
  - Query-param: `id` (the get the file)

## License

MIT
