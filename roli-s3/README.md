# Roli S3 Private Bucket Directory Listing Test

Planning how to build this:

- [x] **Find a suitable boilerplate just for a technical test** `npx create-express-typescript-application roli-s3`
- [x] **Use Terraform to create S3 Bucket, set appropriate ACL and tag as necessary**
- [x] **Add AWSCLI**

### Things done to expedite a prototype:

- used a boilerplate and not axed the unnecessary stuff
- the `config.json` is not usually something I would use as it would be very easy for this to be committed to a repo
  with the real credentials, `.env` files and environment variables per stage is much preferred.
- Used a TDD approach to this test as I can manipulate S3 with new files with a test run.

### Infrastructure as Code README

- clone repo
- cd terraform
- terraform init for the providers/APIs etc

### Tests to write

- [] Accessing S3 bucket from env vars
- [] Querying the HTML directory listing.
- [] General S3 Exception Handling
    - [] Check if not available directly (without ACL)
    - [] Good stuff

### What I would do as I timeboxed this to 1h:

- [] Exported the S3 object into its own exportable module.
- [] Not use this Node.js boilerplate ever again, lol, it's not tight enough for a production useage e.g. finding the
  routers by file is what TypeScript would include/export anyway.
