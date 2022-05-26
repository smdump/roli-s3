import { AWSError } from 'aws-sdk';
import config from '../../config.json';
import { ListObjectsOutput } from 'aws-sdk/clients/s3';
import AwsS3Client from './awsS3Client';

/**
 * List objects in an S3 bucket.
 *
 * @param _bucketName String
 *   AWS Bucket Name e.g. `my-bucket`, not an ARN.
 *
 * @param _bucketPrefix
 *   S3 Prefix
 * @return mixed
 */
export const getS3BucketDirectoryListing = async (
  _bucketName = config.AWS_S3_BUCKET_NAME,
  _bucketPrefix = config.AWS_S3_DEFAULT_BUCKET_PRESET
) => {
  // Call S3 to obtain a list of the objects in the bucket
  const s3BucketClient = AwsS3Client.listObjectsV2({
    Bucket: config.AWS_S3_BUCKET_NAME,
  })
    .promise()
    .catch((e: AWSError) => {
      throw new Error('issue with S3 listing');
    });

  // AwsS3Client.listObjectParents()Ÿ

  // ROLI did not put in the spec what info needs to show in the frontend/API call,
  // so this is a guess.
  const { Contents } = await s3BucketClient;

  // Reshape the data so it is more like what is asked in the technical test.
  return Contents.map((s3BucketItem: any) => {
    return {
      key: s3BucketItem.Key,
      type: String(s3BucketItem.Key).includes('/') ? 'directory' : 'file',
      downloadUri: getS3PrivateUrl(s3BucketItem.Key),
    };
  });
};

export const getS3BucketDirectoryListing2 = async (
  _bucketName = config.AWS_S3_BUCKET_NAME,
  _bucketPrefix = config.AWS_S3_DEFAULT_BUCKET_PRESET
) => {
  // Call S3 to obtain a list of the objects in the bucket
  const s3BucketClient = AwsS3Client.listObjectsV2({
    Bucket: config.AWS_S3_BUCKET_NAME,
    // Delimiter: '/',
    Prefix: _bucketPrefix,
  })
    .promise()
    .catch((e: AWSError) => {
      throw new Error('issue with S3 listing');
    });

  // ROLI did not put in the spec what info needs to show in the frontend/API call,
  // so this is a guess.
  const { Contents } = await s3BucketClient;

  // Reshape the data so it is more like what is asked in the technical test.
  return Contents.map((s3BucketItem: any) => {
    return {
      key: s3BucketItem.Key,
      type: String(s3BucketItem.Key).includes('/') ? 'directory' : 'file',
      downloadUri: getS3PrivateUrl(s3BucketItem.Key),
    };
  });
};

/**
 * Get Private S3 URL by using `getSignedUrl`.
 * This link will work for 5 minutes.
 *
 * @param bucketKey string
 *   The key of the object.
 *
 * @return string
 */
export const getS3PrivateUrl = (bucketKey: string) => {
  return AwsS3Client.getSignedUrl('getObject', {
    Bucket: config.AWS_S3_BUCKET_NAME,
    Key: bucketKey,
    Expires: 5 * 60, // 5 min expiry.
  });
};

/**
 * Add file/objects to an S3 bucket.
 * This is not exposed to the user, it is for the testing suite.
 *
 * @param bucketName String
 *   AWS Bucket Name e.g. `my-bucket`, not an ARN.
 *
 * @return mixed
 */
export const addFileToS3 = async (bucketName = config.AWS_S3_BUCKET_NAME) => {
  // Call S3 to obtain a list of the objects in the bucket
  const s3Bucket = await AwsS3Client.putObject(
    { Bucket: config.AWS_S3_BUCKET_NAME },
    function (err: AWSError, data: ListObjectsOutput) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    }
  );

  console.log('steve', s3Bucket);

  return [s3Bucket.bucketName];
};
