const IncidentFile = require("../api/incident_file/IncidentFile");
const AWS = require("aws-sdk");

async function saveS3File(files) {

  let incidentFilesArray = [];

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  await Promise.all(
    files.map(async (file) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `public/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      try {
        await s3.upload(params).promise();
        const incidentFile = new IncidentFile({
          file_name: file.originalname,
        });
        await incidentFile.save();
        incidentFilesArray.push(incidentFile);
      } catch (error) {
        console.error(error);
      }
    })
  );

  return incidentFilesArray;
}

module.exports = { saveS3File };
