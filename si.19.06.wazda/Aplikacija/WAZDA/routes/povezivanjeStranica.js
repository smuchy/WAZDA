var express = require("express");
var router = express.Router();
var path = require("path");

// HOME STRANA
router.get("/", (req, res) => {
  res.redirect("/home");
});

// HOME STRANA

module.exports = router;
