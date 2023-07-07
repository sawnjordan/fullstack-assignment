const express = require("express");
const { authControllerObj } = require("./auth.controller");

const router = express.Router();

router.post("/register", authControllerObj.registerUser);

router.post("/login", authControllerObj.loginUser);

module.exports = router;
