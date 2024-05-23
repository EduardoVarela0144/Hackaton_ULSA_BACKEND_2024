const express = require("express");
const router = express.Router();

const incidentController = require("./incident.controller");

router.post("/", incidentController.createIncident);
router.get("/", incidentController.getAllIncidents);
router.get("/history/:id", incidentController.getIncidentHistory);
router.get("/:id", incidentController.getIncidentById);
router.put("/:id", incidentController.updateIncident);
router.delete("/:id", incidentController.deleteIncident);

module.exports = router;
