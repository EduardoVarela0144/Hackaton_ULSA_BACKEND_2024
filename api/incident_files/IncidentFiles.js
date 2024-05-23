const { Schema, model } = require("mongoose");

const incidentFileSchema = new mongoose.Schema({
  file_path: {
    type: String,
    required: true,
  },
  id_incident: {
    type: Schema.Types.ObjectId,
    ref: "Incident",
    required: true,
  },

  timestamps: true,
});

const IncidentFile = model("IncidentFile", incidentFileSchema);

module.exports = IncidentFile;
