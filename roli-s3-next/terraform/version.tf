terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.13.0"
    }
  }
}

# @todo Note how this works.
provider "aws" {
  shared_credentials_files = ["~/.aws/credentials"]
  region = "eu-west-2"
  profile = "opl-serverless"
}
