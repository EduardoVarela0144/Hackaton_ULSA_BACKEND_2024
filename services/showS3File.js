const AWS = require("aws-sdk");

async function showS3File(files) {

  let incidentFilesArray = [];

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const filesArray = Array.isArray(files) ? files : [files];

  await Promise.all(
    filesArray.map(async (file) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `public/${file.file_name}`,
      };

      try {
        const url = await s3.getSignedUrlPromise("getObject", params);
        incidentFilesArray.push({ url: url, file_name: file.file_name });
      } catch (error) {
        console.error(error);
      }
    })
  );

  return incidentFilesArray;
}

module.exports = { showS3File };
