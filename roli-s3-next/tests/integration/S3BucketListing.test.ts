import 'jest';

import {
  getS3BucketDirectoryListing,
  getS3PrivateUrl,
} from '../../../roli-s3-next/utils/aws/getS3BucketDirectoryListing';

describe('Gets S3 Bucket List', () => {
  // Check we actually a working S3 client!
  it('Does a directory listing for root files', async () => {
    const { directories, files, bucketPrefix } =
      await getS3BucketDirectoryListing();

    // This would be removed from the test but lets this solution be tested quickly.
    console.log('steve', {
      directories,
      files,
      bucketPrefix,
    });

    // This would be hashed out into being a proper test but did not want to exceed a timebox.
    expect(Array.isArray(files)).not.toBeFalsy();
    expect(Array.isArray(directories)).not.toBeFalsy();

    // We expect two subdirectories.
    expect(directories).toStrictEqual([
      { Key: 'WinXPWallpapers1/', Display: 'WinXPWallpapers1/' },
      { Key: 'WinXPWallpapers2/', Display: 'WinXPWallpapers2/' },
    ]);

    // Check bucketPrefix is correct.
    expect(bucketPrefix).toBe('');
  });

  /**
   * With more time, this would be consolidated as giving it multiple choices instead of repeating the same code.
   */
  it('Does a directory listing for WinXPWallPapers1', async (testBucketPrefix = 'WinXPWallpapers1/') => {
    const { directories, files, bucketPrefix } =
      await getS3BucketDirectoryListing(testBucketPrefix);

    // This would be hashed out into being a proper test but did not want to exceed a timebox.
    expect(Array.isArray(files)).not.toBeFalsy();
    expect(Array.isArray(directories)).not.toBeFalsy();

    // We expect two subdirectories.
    expect(directories).toStrictEqual([
      {
        Key: `${testBucketPrefix}subprefix/`,
        Display: `subprefix/`,
      },
      {
        Key: `${testBucketPrefix}subprefix2/`,
        Display: `subprefix2/`,
      },
    ]);

    // Check bucketPrefix is correct.
    expect(bucketPrefix).toBe(testBucketPrefix);
  });

  it('WinXPWallPapers2 has no directories', async (testBucketPrefix = 'WinXPWallpapers2/') => {
    const { directories, files, bucketPrefix } =
      await getS3BucketDirectoryListing(testBucketPrefix);

    // This would be hashed out into being a proper test but did not want to exceed a timebox.
    expect(Array.isArray(files)).not.toBeFalsy();

    // We expect no subdirectories.
    expect(directories).toStrictEqual([]);

    // Check bucketPrefix is correct.
    expect(bucketPrefix).toBe(testBucketPrefix);
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
