const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_BUCKET_REGION,
  endpoint: process.env.SUPABASE_BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_BUCKET_KEY_ID,
    secretAccessKey: process.env.SUPABASE_BUCKET_SECRET_KEY,
  },
});

module.exports = s3;
