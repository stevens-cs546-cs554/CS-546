const express = require("express");
const router = express.Router();

router.get("/jquery-dom", (req, res) => {
  res.render("examples/jquery-dom", {
    partial: "jquery-dom-scripts"
  });
});

router.get("/manual-dom", (req, res) => {
  // same HTML for manual dom and jquery dom
  res.render("examples/jquery-dom", {
    partial: "manual-dom-scripts"
  });
});

router.get("/window", (req, res) => {
  // same HTML for manual dom and jquery dom
  res.render("examples/window", {
    partial: "window-scripts"
  });
});

router.get("/location", (req, res) => {
  // same HTML for manual dom and jquery dom
  res.render("examples/location", {
    partial: "location-scripts"
  });
});

router.get("/localstorage", (req, res) => {
  // same HTML for manual dom and jquery dom
  res.render("examples/localstorage", {
    partial: "localstorage-scripts"
  });
});

module.exports = router;
