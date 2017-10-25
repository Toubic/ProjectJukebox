"use strict";

var express = require("express");
var router = express.Router();

// Create a new jukebox:

router.get("/", function(req, res) {
    res.render("newJukebox");
});

module.exports = router;