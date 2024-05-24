const mongoose = require("mongoose");

const incidentHistorySchema = new mongoose.Schema(
  {
    id_incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },
    incident_files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncidentFile",
      },
    ],
    incident_images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncidentFile",
      },
    ],
    incident_name: {
      type: String,
      required: true,
    },
    incident_status: {
      type: Number,
      required: true,
    },
    id_user: {
      type: String,
      required: true,
    },
    incident_description: {
      type: String,
      required: true,
    },
    incident_location: {
      type: {
        alt: Number,
        long: Number,
        municipality: String
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const IncidentHistory = mongoose.model(
  "IncidentHistory",
  incidentHistorySchema
);

module.exports = IncidentHistory;
