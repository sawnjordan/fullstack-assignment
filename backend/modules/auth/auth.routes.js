const express = require("express");
const { authControllerObj } = require("./auth.controller");
const { authServicesObj } = require("./auth.services");
const { isUserAuthenticated } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/register", authControllerObj.registerUser);

router.post("/login", authControllerObj.loginUser);

router.post("/forgot-password", authControllerObj.forgotPassword);

router.post("/reset-password/:token", authControllerObj.resetPassword);

router.put(
  "/update-password/",
  isUserAuthenticated,
  authControllerObj.updatePassword
);

router.put("/me/update", isUserAuthenticated, authControllerObj.updateProfile);

router.get("/logout", authControllerObj.logoutUser);

router.get("/me", isUserAuthenticated, authControllerObj.getUserProfile);

router.get(
  "/users",
  isUserAuthenticated,
  authServicesObj.authorizeRole("admin"),
  authControllerObj.getAllUser
);

router.put(
  "/user/:id",
  isUserAuthenticated,
  authServicesObj.authorizeRole("admin"),
  authControllerObj.updateUser
);

router.get(
  "/users/:id",
  isUserAuthenticated,
  authServicesObj.authorizeRole("admin"),
  authControllerObj.getUserDetails
);

module.exports = router;
