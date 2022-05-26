// import path from "path";
// import fs from "fs";
//
// const fileName = path.basename(filePath);
// const fileStream = fs.createReadStream(filePath);
//
// // If you want to save to "my-bucket/{prefix}/{filename}"
// //                    ex: "my-bucket/my-pictures-folder/my-picture.png"
// const keyName = path.join(keyPrefix, fileName);
//
// // We wrap this in a promise so that we can handle a fileStream error
// // since it can happen *before* s3 actually reads the first 'data' event
// return new Promise(function (resolve, reject) {
//   fileStream.once('error', reject);
//   s3.upload({
//     Bucket: bucketName,
//     Key: keyName,
//     Body: fileStream,
//     ACL: 'public-read',
//     // [ACUK-3727] Simple fix to ensure file ContentType/mimetype is set when uploading to S3.
//     // This prevents S3's default metadata which is a rather useless application/octet-stream,
//     // which trips up RightMove because it expects an image not a file download.
//     ContentType: require('mime-types').lookup(filePath),
//   })
//       .promise()
//       .then(resolve, reject);
// });
