const express = require("express");
const app = express();

const router = require("../routes/routes");

app.use("", router);

module.exports = app;
