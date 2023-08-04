const express = require("express");
const { orderControllerObj } = require("./order.controller");
const { isUserAuthenticated } = require("../../middleware/auth.middleware");
const { authServicesObj } = require("../auth/auth.services");

const router = express.Router();

router.post(
  "/order/new",
  isUserAuthenticated,
  orderControllerObj.createNewOrder
);

router.get("/order/me", isUserAuthenticated, orderControllerObj.getMyOrder);

router.get(
  "/admin/order/all",
  isUserAuthenticated,
  authServicesObj.authorizeRole("admin"),
  orderControllerObj.getAllOrder
);

router.get(
  "/order/:id",
  isUserAuthenticated,
  orderControllerObj.getSingleOrder
);

router.put(
  "/admin/order/:id",
  isUserAuthenticated,
  authServicesObj.authorizeRole("admin"),
  orderControllerObj.updateOrder
);

module.exports = router;
