// I know this is not remotely correct for Next.js but speeding this process along.
import config from '../../config.json';

const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_DEFAULT_REGION,
  // Force S3 to produce signed URLs as per the newer V4 standard.
  signatureVersion: 'v4',
});

export default s3Client;
