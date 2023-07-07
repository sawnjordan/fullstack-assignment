const express = require("express");

const router = express.Router();
const bookRoutes = require("../modules/book/book.routes");
const authRoutes = require("../modules/auth/auth.routes");

router.use("/auth", authRoutes);
router.use("/admin/books", bookRoutes);

module.exports = router;
