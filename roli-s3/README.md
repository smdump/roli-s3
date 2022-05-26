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

### Tests to write

- [x] Accessing S3 bucket from env vars
- [] Uploading some test files.
- [] General S3 Exception Handling
    - [] Check if not available directly (without ACL), e.g. try get a Public link
    - [] HTTP 403 for API calls that are empty directories.
    - [] Ensure you cannot create a 10 second Pre-Signed URL then have a further test (after waiting 15 seconds) try and get that file.

### What I would do as I timeboxed this to 1h:

- [] Exported the S3 object into its own exportable module.
- [] Not use this Node.js boilerplate ever again, lol, it's not tight enough for a production useage e.g. finding the
  routers by file walking is really dirty.

### Outstanding/out of timebox

- [ ] Building an Next solution to have an actual S3 client, this was made harder by the fact that I really needed to refactor an application to have nice React Router based URLs.

### Code Style Considerations

- [x] Exported the S3 object into its own exportable module, to keep things all using the same S3 Client and not the AWS-S3 extensions and types.s
- [x] Prettier/eslint with JSX formatting.
- [x] Built the solution with a very rudimentary way of setting the config in `config.json`. I would never use this in production, but it essentially is a equicker equivalent to `dotenv`

### How to improve the whole solution:

- [ ] Add an additional S3 policy and IAM user specifically for the app instead of borrowing an Admin access same key.
- [ ] Bake that S3 Policy/Creation of IAM user in Terraform
- [ ] Use STS or a Secrets Manager.
- [ ] Write unit tests for add S3 file, upload etc

---

### Infrastructure as Code README

This project uses Terraform to build an S3 bucket using an IAM account with sufficient permissions.

```bash
cd terraform
# Build local environment, download the drivers and proviiders.
terraform init
# Use terraform plan to dry-run changes
terraform plan
# Once you accept changes (they will be creations or a lack of state change) and you know you're on the right track
terraform apply
```
