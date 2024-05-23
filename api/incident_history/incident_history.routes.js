const express = require("express");
const router = express.Router();
const incidentHistoryController = require("./incident_history.controller");

router.post("/", incidentHistoryController.createIncidentHistory);

router.get("/", incidentHistoryController.getAllIncidentHistories);

router.get("/:id", incidentHistoryController.getIncidentHistoryById);

router.put("/:id", incidentHistoryController.updateIncidentHistory);

router.delete("/:id", incidentHistoryController.deleteIncidentHistory);

module.exports = router;
