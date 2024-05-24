const IncidentHistory = require("./IncidentHistory");
const { saveS3File } = require("../../services/saveS3File");

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

    const incidentFiles = req.files.files;
    const incidentImages = req.files.images;  


    let incidentFilesArray = [];
    let incidentImagesArray = [];

    if (incidentFiles) {
      incidentFilesArray = await saveS3File(incidentFiles);
    }

    if (incidentImages) {
      incidentImagesArray = await saveS3File(incidentImages);
    }

    const incidentHistory = new IncidentHistory({
      id_incident: id_incident,
      incident_name: incident_name,
      incident_status: incident_status,
      id_user: id_user,
      incident_description: incident_description,
      incident_location: JSON.parse(incident_location),
      incident_files: incidentFilesArray,
      incident_images: incidentImagesArray,
    });

    await incidentHistory.save();

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
