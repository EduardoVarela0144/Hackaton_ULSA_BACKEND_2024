const IncidentHistory = require("./IncidentHistory");
const IncidentFile = require("../incident_file/IncidentFile");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.createIncidentHistory = async (req, res) => {
  try {
    const {
      id_incident,
      incident_name,
      incident_status,
      id_user,
      incident_description,
      incident_location,
    } = req.body;

    const incidentHistory = new IncidentHistory({
      id_incident: id_incident,
      incident_name: incident_name,
      incident_status: incident_status,
      id_user: id_user,
      incident_description: incident_description,
      incident_location: JSON.parse(incident_location),
    });

    const incidentFiles = req.files;
    let incidentFilesArray = [];
    let incidentFilesUrlArray = [];

    if (incidentFiles) {
      incidentFiles.forEach(async (file) => {
        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `public/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        try {
          await s3.upload(params).promise();
          incidentFilesArray.push({
            file_name: file.originalname,
          });
        } catch (error) {
          console.error(error);
        }
      });
    }

    await Promise.all(
      incidentFilesArray.map(async (file) => {
        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `public/${file.file_name}`,
        };

        try {
          const url = await s3.getSignedUrlPromise("getObject", params);
          incidentFilesUrlArray.push(
            new IncidentFile({
              file_name: file.file_name,
              file_path: url,
            })
          );
        } catch (error) {
          console.error(error);
        }
      })
    );

    console.log(incidentFilesArray);

    // await incidentHistory.save();

    res.status(201).json({ message: "Incident history created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllIncidentHistories = async (req, res) => {
  try {
    const incidentHistories = await IncidentHistory.find().populate(
      "id_incident"
    );
    res.status(200).json(incidentHistories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncidentHistoryById = async (req, res) => {
  try {
    const incidentHistory = await IncidentHistory.findById(
      req.params.id
    ).select("-__v -updatedAt -incident_location._id");
    if (!incidentHistory) {
      return res.status(404).json({ message: "Incident history not found" });
    }
    res.status(200).json(incidentHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIncidentHistory = async (req, res) => {
  try {
    const incidentHistory = await IncidentHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!incidentHistory) {
      return res.status(404).json({ message: "Incident history not found" });
    }
    res.status(200).json({ message: "Incident history updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteIncidentHistory = async (req, res) => {
  try {
    const incidentHistory = await IncidentHistory.findByIdAndDelete(
      req.params.id
    );
    if (!incidentHistory) {
      return res.status(404).json({ message: "Incident history not found" });
    }
    res.status(200).json({ message: "Incident history deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
