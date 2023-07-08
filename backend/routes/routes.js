const express = require("express");

const router = express.Router();
const bookRoutes = require("../modules/book/book.routes");
const authRoutes = require("../modules/auth/auth.routes");
const orderRoutes = require("../modules/order/order.routes");

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/", orderRoutes);

module.exports = router;
