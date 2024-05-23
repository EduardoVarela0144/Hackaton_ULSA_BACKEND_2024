const packageJson = require("../package.json");
const incidentRouter = require("../api/incident/incident.routes");
const incidentHistoryRouter = require("../api/incident_history/incident_history.routes");


const API_V1 = "/hackaton";

module.exports = (app) => {
  app.get(API_V1, (req, res) => {
    res.json({ version: packageJson.version });
  });

  app.use(`${API_V1}/incidents`, incidentRouter);
  app.use(`${API_V1}/incident-histories`, incidentHistoryRouter);
};
