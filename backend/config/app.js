const express = require("express");
const app = express();
require("dotenv").config();
//body parser
app.use(express.urlencoded({ extended: false }));

const router = require("../routes/routes");
const errorHandler = require("../middleware/errorHandler");

app.use(express.json());
app.use("/api/v1", router);

//this is express global error handling middleware. The first parameter is always err.
app.use(errorHandler);

module.exports = app;
