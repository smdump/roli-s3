import { AWSError } from 'aws-sdk';
import config from '../../config.json';
import { ListObjectsOutput } from 'aws-sdk/clients/s3';
import AwsS3Client from './awsS3Client';
import { useRouter } from 'next/router';

const _ = require('lodash');

export const getS3BucketDirectoryListing = async (
  _bucketPrefix: string = ''
) => {
  // ROLI did not put in the spec what info needs to show in the frontend/API call,
  // so this is a guess.
  const RootFiles = await AwsS3Client.listObjectsV2({
    Bucket: config.AWS_S3_BUCKET_NAME,
    Delimiter: '/',
    Prefix: _bucketPrefix,
  })
    .promise()
    .catch((e: AWSError) => {
      throw new Error('issue with S3 listing');
    });

  // Reshape the data so it is more like what is asked in the technical test.
  // Also, let's reuse the file listing for root directories.
  const s3Objects = RootFiles.Contents.map((s3BucketItem: any) => {
    return {
      key: s3BucketItem.Key,
      // This is a hack to save time.
      type: s3BucketItem.Key.includes('/') ? 'directory' : 'file',
      downloadUri: getS3PrivateUrl(s3BucketItem.Key),
    };
  });

  // Get subdirectories.
  const SubDirectories = RootFiles.CommonPrefixes.map(
    (s3DelimiterFile: any) => {
      return {
        // We need the full key for the ?path=${prefix}.
        Key: s3DelimiterFile.Prefix,
        // We can display the folder name without it's prefixes, similar to Finder/Windows Explorer.
        Display: s3DelimiterFile.Prefix.replace(RootFiles.Prefix, ''),
      };
    }
  );

  // Even though these are/will already be arrays, let's absolutely make sure by typecasting.
  return {
    // Use lodash uniqBy to ensure directories only show once.
    directories: SubDirectories,
    files: s3Objects,
    bucketPrefix: _bucketPrefix,
  };
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

  return [s3Bucket.bucketName];
};
