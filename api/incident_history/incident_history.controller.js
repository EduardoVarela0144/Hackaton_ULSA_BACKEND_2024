const IncidentHistory = require("./IncidentHistory");
const mongoose = require("mongoose");

exports.createIncidentHistory = async (req, res) => {
  try {
    const incidentHistory = new IncidentHistory(req.body);
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
    )
    .select("-__v -updatedAt -incident_location._id"); 
    ;
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
