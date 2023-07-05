const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ msg: "The request is again working" });
});

module.exports = router;
