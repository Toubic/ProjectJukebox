"use strict";

var express = require("express");
var router = express.Router();
var passport = require("passport");
var passportLocal = require("passport-local");

// Login page:

router.get("/", function(req, res) {
    res.render("login");
});

// Login page post method:

router.post("/", passport.authenticate("local", { failureRedirect: "/login" }), function(req, res) {
    res.redirect("/");
});

module.exports = router;