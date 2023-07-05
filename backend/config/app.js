const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.json({ msg: "The request is working" });
});

module.exports = app;
