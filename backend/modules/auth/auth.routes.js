const express = require("express");
const { authControllerObj } = require("./auth.controller");
const { authServicesObj } = require("./auth.services");
const { isUserAuthenticated } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/register", authControllerObj.registerUser);

router.post("/login", authControllerObj.loginUser);

router.get("/logout", authControllerObj.logoutUser);

router.get("/me", isUserAuthenticated, authControllerObj.getUserProfile);

module.exports = router;
