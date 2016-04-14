"use strict";

var express = require("express");
var path = require("path");
var Sequelize = require("sequelize");
var exphand = require("express-handlebars");
var app = express();

//The Server:

app.listen(8080);

app.engine("hb", exphand({
    defaultLayout: "index",
    extname: "hb"
}));
app.set("view engine", "hb");

// The Database:

var Database = new Sequelize('postgres', 'postgres', 'guest', {
    host: 'localhost',
    dialect: 'postgres'
});

var Users = Database.define('users', {
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    }
});
var Jukeboxes = Database.define('jukeboxes', {
    title: {
        type: Sequelize.STRING,
    },
    videos: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});

Users.sync({force: true}).then(function () {
    return Users.create({
        username: "user1",
        password: "password1"
    });
});

Jukeboxes.sync({force: true}).then(function () {
    return Jukeboxes.create({
        title: "jukebox1",
        videos: ["https://www.youtube.com/embed/m7o9g7QOjIo", "https://www.youtube.com/embed/W0bidd0Uhvk"]
    });
});

// Relations:

Users.hasMany(Jukeboxes);
Jukeboxes.belongsTo(Users);

// The app:

app.get("/", function(req, res) {

    Jukeboxes.findAll({
        attributes: ["videos"]
    }).then(function (thesongs) {
    res.render("jukebox", {data: thesongs[0].videos});
    });
});

app.get("/css/style.css", function(req, res) {
    res.sendFile(path.join(__dirname + "/../css/style.css"));
});

app.get("/js/jukebox.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/../js/jukebox.js"));
});