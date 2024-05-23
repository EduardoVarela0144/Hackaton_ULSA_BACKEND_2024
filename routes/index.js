const packageJson = require("../package.json");

const API_V1 = "/hackaton";

module.exports = (app) => {
  app.get(API_V1, (req, res) => {
    res.json({ version: packageJson.version });
  });

  

};
