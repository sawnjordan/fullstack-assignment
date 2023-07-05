const express = require("express");
const app = express();
require("dotenv").config();

const router = require("../routes/routes");

app.use("/api/v1", router);

//this is express global error handling middleware. The first parameter is always err.
app.use((err, req, res, next) => {
  console.log(err);
  let statusCode = err.status || 500;
  let msg = err.msg || "Internal Server Error.";
  res.status(statusCode).json({ data: null, msg: msg, meta: null });
});

module.exports = app;
