import config from '../../config.json';

const AWS = require('aws-sdk');

AWS.config.update({ region: config.AWS_DEFAULT_REGION });

const s3Client = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_DEFAULT_REGION,
  signatureVersion: 'v4',
});

export default s3Client;
