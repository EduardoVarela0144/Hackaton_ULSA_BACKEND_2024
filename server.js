require("./database/database");

const routesConfig = require("./routes/");

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const multer = require('multer');



const createError = require("http-errors");

var path = require("path");

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array("files"));
// app.use(upload.array("images"))

app.use(cors());
app.use(logger("dev"));

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

routesConfig(app);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
