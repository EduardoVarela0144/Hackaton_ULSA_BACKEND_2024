const Incident = require("../incident/Incident");
const IncidentHistory = require("../incident_history/IncidentHistory");

exports.createIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ message: "Incident created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().select(
      "-__v -updatedAt -incident_location._id"
    );
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).select(
      "-__v -updatedAt -incident_location._id"
    );
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncidentHistory = async (req, res) => {
  try {
    const incidentHistory = await IncidentHistory.find({
      id_incident: req.params.id,
    })
      .select("-__v -updatedAt -incident_location._id")
      .populate({
        path: "incident_files",
      });

    if (!incidentHistory) {
      return res.status(404).json({ message: "Incident History not found" });
    }
    res.status(200).json(incidentHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json({ message: "Incident updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
