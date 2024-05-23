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
    incident_location: {
      type: {
        alt: Float32Array,
        long: Float32Array,
      },
      required: true,
    },
    id_technical_user: {
      type: String,
      required: true,
    },
    id_client_user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
