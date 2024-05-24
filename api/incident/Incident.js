const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    incident_name: {
      type: String,
      required: true,
    },
    incident_description: {
      type: String,
      required: true,
    },
    incident_status: {
      type: Number,
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
    incident_location: {
      type: {
        alt: Number,
        long: Number,
        municipality: String,
      },
      required: true,
    },
    technical_user: {
      type: {
        name: String,
        email: String,
        phone: String,
      },
    },
    client_user: {
      type: {
        name: String,
        email: String,
        phone: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;


