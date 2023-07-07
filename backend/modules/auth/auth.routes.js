const express = require("express");
const { authControllerObj } = require("./auth.controller");

const router = express.Router();

router.post("/register", authControllerObj.registerUser);

router.post("/login", authControllerObj.loginUser);

router.get("/logout", authControllerObj.logoutUser);

module.exports = router;
