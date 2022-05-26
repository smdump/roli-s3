import { Router } from 'express';
import { getS3BucketDirectoryListing } from '../../../../roli-s3-next/utils/aws/getS3BucketDirectoryListing';

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get('/', async (req, res) => {
  const s3BucketFiles = await getS3BucketDirectoryListing();

  return res.json({
    s3BucketFiles,
  });
});
