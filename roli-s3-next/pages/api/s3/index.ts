import { NextApiRequest, NextApiResponse } from 'next';
import { getS3BucketDirectoryListing } from '../../../utils/aws/getS3BucketDirectoryListing';
import { Data } from 'aws-sdk/clients/support';
import { useRouter } from 'next/router';

const _ = require('lodash');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Turn path[0]=123&path[1]=12312 into a bucket prefix e.g. 123/12312/
  // Prevent using / as a path as this is not the S3 Base as it is not a file system.
  const bucketPrefix =
    req.query.path === '/' ? '' : String(req.query.path ?? '');

  // Pass ?path=Example/ to S3 Directory listing function.
  const { files, directories } = await getS3BucketDirectoryListing(
    bucketPrefix
  );

  // Return useful data for resolving in the frontend e.g. directories, files and the bucketPrefix.
  res.status(200).json({
    bucketPrefix,
    files,
    directories,
  });
}
