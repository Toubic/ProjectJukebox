"use strict";

var express = require("express");
var path = require("path");
var Sequelize = require("sequelize");
var app = express();

//The Server:

app.listen(8080);

// The Database:

var sequelize = new Sequelize('postgres', 'postgres', 'guest', {
    host: 'localhost',
    dialect: 'postgres'
});

var users = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    }
});

var jukeboxes = sequelize.define('jukeboxes', {
    title: {
        type: Sequelize.STRING,
    },
    videos: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});

users.sync({force: true}).then(function () {
    return users.create({
        username: "user1",
        password: "password1"
    });
});
jukeboxes.sync({force: true}).then(function () {
    return jukeboxes.create({
        title: "jukebox1",
        videos: ["https://www.youtube.com/embed/m7o9g7QOjIo"]
    });
});

// Relations:

users.hasMany(jukeboxes);
jukeboxes.belongsTo(users);

// The app:

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../index.html"));
});

app.get("/css/style.css", function(req, res) {
    res.sendFile(path.join(__dirname + "/../css/style.css"));
});

app.get("/js/jukebox.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/../js/jukebox.js"));
});

module.exports = sequelize;