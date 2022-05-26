# Roli S3 Next App

Due to being a little bit confused by the exam and wanting to build an S3 client that you could browse using Next.js, the whole serialisation of paths inside URLs were well outside an ordinary 2 or so hours to spend

### Things done to finish this

- [ ] Make some form of `?path[0]=prefix1&path[1]subprefix` or if possible `?path=prefix1/subprefix`. The first would be a longer URL but it is more guaranteed to not have `/` issues.
  - [ ] This would have been fixed nicely if I was to implemement a Next/React Router link such as `/path/prefix1/subprefix`

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
