import 'jest';

import {
  getS3BucketDirectoryListing,
  getS3PrivateUrl,
} from '../../../roli-s3-next/utils/aws/getS3BucketDirectoryListing';

describe('Gets S3 Bucket List', () => {
  // Check we actually a working S3 client!
  it('Does a directory listing', async () => {
    const {rootDirectoryListing, prefixDirectoryListing} = await getS3BucketDirectoryListing();

    console.log("steve", {
      rootDirectoryListing,
      prefixDirectoryListing,
    });
  });

  // Check we actually a working S3 client!
  it('Can get a private S3 URL', async () => {
    // As our other tests programmatically upload Win XP Wallpapers,
    // Check an existing key.
    const getS3PrivateUrlData = getS3PrivateUrl(
        'WinXPWallpapers1/WinXPWallpaper2.jpeg'
    );

    expect(getS3PrivateUrlData).not.toBeNull();
  });
});
