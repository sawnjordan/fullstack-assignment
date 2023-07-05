const express = require("express");

const router = express.Router();
const bookRoutes = require("../modules/book/book.routes");

router.use("/", bookRoutes);

module.exports = router;
