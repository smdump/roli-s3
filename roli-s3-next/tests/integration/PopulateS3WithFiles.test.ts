import 'jest';
import config from '../../config.json';

import path from 'path';
import fs from 'fs';
import AwsS3Client from '../../utils/aws/awsS3Client';

/**
 * This really is a quick and dirty way to upload the test files.
 * @param filePath
 * @param _keyPrefix
 */
export const uploadFile = (
  filePath: string,
  _keyPrefix = '/'
): Promise<any> => {
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);

  // If you want to save to "my-bucket/{prefix}/{filename}"
  //                    ex: "my-bucket/my-pictures-folder/my-picture.png"
  const keyName = path.join(_keyPrefix, fileName);

  // We wrap this in a promise so that we can handle a fileStream error
  // since it can happen *before* s3 actually reads the first 'data' event
  return new Promise(function (resolve, reject) {
    fileStream.once('error', reject);
    AwsS3Client.upload({
      Bucket: config.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
      ACL: 'private',
      // @todo confirm with ROLI this is what they were thinking.
      // Simple fix to ensure file ContentType/mimetype is set when uploading to S3.
      // This prevents S3 links always being "download" rather than work inline.
      ContentType: require('mime-types').lookup(filePath),
    })
      .promise()
      .then(resolve, reject);
  });
};

/**
 * This entire test suite may be worth scrapping if it just fills up an S3 bucket, but it's very helpful in development.
 */
describe('File Upload Test', () => {
  // Check we actually a working S3 client!
  it('AWS Environment variables are set', async () => {
    expect(config.AWS_ACCESS_KEY_ID).not.toBeNull();
    expect(config.AWS_SECRET_ACCESS_KEY).not.toBeNull();
    expect(config.AWS_S3_BUCKET_NAME).not.toBeNull();
    expect(config.AWS_DEFAULT_REGION).not.toBeNull();
  });

  it('As a user, I upload or overwrite faux images to hydrate the S3 bucket', async () => {
    // @todo if had more time on this would not use a loop necessarily, but it works fine.
    for (let i = 0; i++; i <= 10) {
      const pdfSample1 = await uploadFile(
        __dirname + `/../files/RootWinXPWallpaper${i}.jpeg`
      );

      // Check S3 has the correct key.
      expect(pdfSample1.Key).toBe(`RootWinXPWallpaper${i}.jpeg`);

      // Check correct bucket.
      expect(pdfSample1.Bucket).toBe(config.AWS_S3_BUCKET_NAME);
    }
  });

  it('As a user, I can upload to S3 with WinXPWallpapers1', async () => {
    // @todo if had more time on this would not use a loop necessarily, but it works fine.
    for (let i = 0; i++; i <= 10) {
      const uploadSampleFile = await uploadFile(
        __dirname + `/../files/WinXPWallpapers1/WinXPWallpaper${i}.jpeg`,
        'WinXPWallpapers1'
      );

      // Check S3 has the correct key.
      expect(uploadSampleFile.Key).toBe(`WinXPWallpaper${i}.jpeg`);

      // Check correct bucket.
      expect(uploadSampleFile.Bucket).toBe(config.AWS_S3_BUCKET_NAME);
    }
  });

  it('As a user, I can upload to S3 with WinXPWallpapers1 subprefix folders', async (subprefix = 'subprefix') => {
    // @todo if had more time on this would not use a loop necessarily, but it works fine.
    for (let i = 0; i++; i <= 5) {
      const uploadSampleFile = await uploadFile(
        __dirname +
          `/../files/WinXPWallpapers1/${subprefix}/SubWinXPWallpaper${i}.jpeg`,
        'WinXPWallpapers1'
      );

      // Check S3 has the correct key.
      expect(uploadSampleFile.Key).toBe(`SubWinXPWallpaper${i}.jpeg`);

      // Check correct bucket.
      expect(uploadSampleFile.Bucket).toBe(config.AWS_S3_BUCKET_NAME);
    }
  });

  it('As a user, I can upload to S3 with WinXPWallpapers1 subprefix folders', async (subprefix = 'subprefix2') => {
    // @todo if had more time on this would not use a loop necessarily, but it works fine.
    for (let i = 0; i++; i <= 5) {
      const uploadSampleFile = await uploadFile(
        __dirname +
          `/../files/WinXPWallpapers1/${subprefix}/SubWinXPWallpaper${i}.jpeg`,
        'WinXPWallpapers1'
      );

      // Check S3 has the correct key.
      expect(uploadSampleFile.Key).toBe(`SubWinXPWallpaper${i}.jpeg`);

      // Check correct bucket.
      expect(uploadSampleFile.Bucket).toBe(config.AWS_S3_BUCKET_NAME);
    }
  });

  it('As a user, I can upload to S3 with WinXPWallpapers2', async () => {
    // @todo if had more time on this would not use a loop necessarily, but it works fine.
    for (let i = 0; i++; i <= 10) {
      const uploadSampleFile = await uploadFile(
        __dirname + `/../files/WinXPWallpapers2/WinXPWallpaper${i}.jpeg`,
        'WinXPWallpapers2'
      );
      console.log('steve', {
        pdfSample1: uploadSampleFile,
        filePath:
          __dirname + `/../files/WinXPWallpapers2/WinXPWallpaper${i}.jpeg`,
        filePath2: path.basename(
          __dirname + `/../files/WinXPWallpapers2/WinXPWallpaper${i}.jpeg`
        ),
        filePath3: path.resolve(
          __dirname + `/../files/WinXPWallpapers2/WinXPWallpaper${i}.jpeg`
        ),
      });

      // Check S3 has the correct key.
      expect(uploadSampleFile.Key).toBe(`WinXPWallpaper${i}.jpeg`);

      // Check correct bucket.
      expect(uploadSampleFile.Bucket).toBe(config.AWS_S3_BUCKET_NAME);
    }
  });
});
