const express = require("express");
const app = express();
require("dotenv").config();

const router = require("../routes/routes");

app.use(express.json());
app.use("/api/v1", router);

//this is express global error handling middleware. The first parameter is always err.
app.use((err, req, res, next) => {
  console.log(err);
  let statusCode = err.status || 500;
  let msg = err.msg || "Internal Server Error.";
  if (err.name === "CastError") {
    return res.status(401).json({
      status: 401,
      err: err,
      msg: `Invalid value ${err.value} for field: ${err.path}`,
    });
  }
  res.status(statusCode).json({ data: null, msg: msg, meta: null });
});

module.exports = app;
