"use strict";

var express = require("express");
var router = express.Router();

// Login page:

router.get("/", function(req, res) {
    res.render("login");
});

module.exports = router;