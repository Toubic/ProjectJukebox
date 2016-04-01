"use strict";

var express = require("express");
var path = require("path");
var app = express();
app.listen(8080);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../index.html"));
});
