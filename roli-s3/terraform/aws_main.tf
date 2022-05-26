data "aws_iam_policy_document" "roli-s3-policy" {
  statement {
    actions   = ["s3:ListAllMyBuckets"]
    resources = ["arn:aws:s3:::*"]
    effect = "Allow"
  }
  statement {
    actions   = ["s3:*"]
    resources = [aws_s3_bucket.roli-s3-test.arn]
    effect = "Allow"
  }
}
