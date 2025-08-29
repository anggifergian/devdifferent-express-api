const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = require('../utils/s3');

async function generateUploadUrl(filename, mimetype) {
  const key = `uploads/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.STORAGE_BUCKET_NAME,
    Key: key,
    ContentType: mimetype,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return { url, key };
}

async function generateDownloadUrl(fileName) {
  const command = new GetObjectCommand({
    Bucket: process.env.STORAGE_BUCKET_NAME,
    Key: fileName,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return url;
}

function deleteS3Object(fileName) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.STORAGE_BUCKET_NAME,
    Key: fileName,
  });

  return s3.send(command);
}

module.exports = { generateUploadUrl, generateDownloadUrl, deleteS3Object };
