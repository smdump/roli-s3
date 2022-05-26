resource "aws_s3_bucket" "roli-s3-test" {
  bucket = "roli.ste.london"

  tags = {
    Name        = "Roli Test S3"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_acl" "roli-s3-test-acl" {
  bucket = aws_s3_bucket.roli-s3-test.id
  acl    = "private"
}
