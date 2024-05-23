const mongoose = require("mongoose");

const incidentFileSchema = new mongoose.Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const IncidentFile = mongoose.model("IncidentFile", incidentFileSchema);

module.exports = IncidentFile;
