// require express
const express = require("express");
// use router on express
const router = express.Router();

// serve /index
router.get("/", function (req, res) {
  // use render method for ejs
  res.render("index");
});

// serve /about
router.get("/about", function (req, res) {
  // use render method for ejs
  res.render("about");
});

module.exports = router;