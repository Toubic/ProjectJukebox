"use strict";

var express = require("express");
var path = require("path");
var Sequelize = require("sequelize");
var exphand = require("express-handlebars");
var app = express();

//The Server:

app.listen(process.env.PORT || 5000);

app.engine("hb", exphand({
    defaultLayout: "index",
    extname: "hb"
}));
app.set("view engine", "hb");

// The Database:

const THE_DATABASE = "dc07jvq271mlte";
const THE_USERNAME = "mbmehhadorcpnx";
const THE_PASSWORD = "ZMixbTsZLOvL0MO8sHP45QEGzC";


exports.createPostgresDatabase = function (theDatabase, theUsername, thePassword) {

    try {

        if( !isNaN(theDatabase) || !isNaN(theUsername) || !isNaN(thePassword) ){
            throw new Error("Incorrect database info format");
        }
        else if (theDatabase === undefined || theUsername === undefined || thePassword === undefined){
            throw new Error("No database info given");
        }
        else if (theDatabase !== THE_DATABASE || theUsername !== THE_USERNAME || thePassword !== THE_PASSWORD){
            throw new Error ("Incorrect database name/username/password");
        }
        else {
            var Database = new Sequelize(theDatabase, theUsername, thePassword, {
                dialect: 'postgres',
                protocol: 'postgres',
                port: 5432,
                host: 'ec2-23-21-215-184.compute-1.amazonaws.com'
            });
        }
    }
    catch (error){
        console.log(error.message);
    }

    return Database;
};
var Database = exports.createPostgresDatabase(THE_DATABASE, THE_USERNAME, THE_PASSWORD);

var Users = Database.define('users', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

var Jukeboxes = Database.define('jukeboxes', {
    title: {
        type: Sequelize.STRING
    },
    videos: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});

/*
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
*/

Database.sync();

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
    res.sendFile(path.join(__dirname + "/css/style.css"));
});

app.get("/js/jukebox.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/js/jukebox.js"));
});