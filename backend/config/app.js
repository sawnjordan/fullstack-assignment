const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

// Allow requests from all origins. You can specify specific origins if needed.
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
//body parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const router = require("../routes/routes");
const errorHandler = require("../middleware/errorHandler");

app.use(express.json());
app.use("/api/v1", router);

//this is express global error handling middleware. The first parameter is always err.
app.use(errorHandler);

module.exports = app;
