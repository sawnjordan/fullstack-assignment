const express = require("express");
const { orderControllerObj } = require("./order.controller");
const { isUserAuthenticated } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/new", isUserAuthenticated, orderControllerObj.createNewOrder);

router.get("/me", isUserAuthenticated, orderControllerObj.getMyOrder);

router.get("/:id", isUserAuthenticated, orderControllerObj.getSingleOrder);

module.exports = router;
