const express = require("express");
const router = express.Router();
const { authControllerOjb } = require("./auth.controller");
const passport = require("passport");
const { authServiceObj } = require("./auth.services");

//@desc Create new user
//@route POST /auth/register
router.post("/register", authControllerOjb.registerUser);

//@desc Login user
//@route POST /auth/login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

//@desc Logout User
//@route GET auth/logout
router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ response: "You are logged out." });
  });
});

module.exports = router;
