"use strict";

var express = require("express");
var router = express.Router();

// Register:

router.get("/", function(req, res) {
    res.render("register");
});

module.exports = router;