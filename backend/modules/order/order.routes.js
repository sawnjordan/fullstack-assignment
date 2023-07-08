const express = require("express");
const { orderControllerObj } = require("./order.controller");
const { isUserAuthenticated } = require("../../middleware/auth.middleware");
const { authServicesObj } = require("../auth/auth.services");

const router = express.Router();

router.post("/new", isUserAuthenticated, orderControllerObj.createNewOrder);

router.get("/me", isUserAuthenticated, orderControllerObj.getMyOrder);

router.get(
  "/all",
  isUserAuthenticated,
  authServicesObj.authorizeRole("admin"),
  orderControllerObj.getAllOrder
);

router.get("/:id", isUserAuthenticated, orderControllerObj.getSingleOrder);
module.exports = router;
