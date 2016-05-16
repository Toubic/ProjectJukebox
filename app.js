"use strict";

var express = require("express");
var bParser = require("body-parser");
var eSession = require("express-session");
var passport = require("passport");
var passportLocal = require("passport-local");
var path = require("path");
var Sequelize = require("sequelize");
var exphand = require("express-handlebars");
var rCaptcha = require("express-recaptcha");
var bCrypt = require("bcrypt-nodejs");
var app = express();

// Google captcha:

rCaptcha.init("6Lf1vR8TAAAAAD_QtbuB0NdhvRRui1bf6eopOO2E","6Lf1vR8TAAAAACwOlVwi9B1_YMxhScYr0obB1gTO", "image");

//The Server:

app.listen(process.env.PORT || 5000);

app.engine("hb", exphand({
    defaultLayout: "index",
    extname: "hb"
}));
app.set("view engine", "hb");

// Login:

app.use(bParser.urlencoded({ extended: true }));
app.use(eSession({ secret: 'jukebox time', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication:

passport.use(new passportLocal.Strategy(function (username, password, done) {


    Users.findAll({
        where: {
            username: username
        }
    }).then(function (user) {
        if(user[0] === undefined){
            done(null, null);
        }
        else if (user[0].username === username && bCrypt.compareSync(password,user[0].password)) {
                done(null, user[0]);
        }
    });
}));

// Session:

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findAll({
        where: {
            id: id
        }
    }).then(function (user) {
       done(null, user[0].id);
    });
});

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
});

Jukeboxes.sync({force: true}).then(function () {
    return Jukeboxes.create({
        title: "jukebox1",
        videos: ["https://www.youtube.com/embed/m7o9g7QOjIo",
        "https://www.youtube.com/embed/W0bidd0Uhvk",
        "https://www.youtube.com/embed/066ZhVlK1mQ",
        "https://www.youtube.com/embed/RKHRdkYZh0M",
        "https://www.youtube.com/embed/s8eGujRpXyU",
        "https://www.youtube.com/embed/cfPcqtJiNII",
        "https://www.youtube.com/embed/2hPZtitNWtU",
        "https://www.youtube.com/embed/MggQSspSGU8",
        "https://www.youtube.com/embed/KkGTwmJxHA0",
        "https://www.youtube.com/embed/Qadw2rFiaJc",
        "https://www.youtube.com/embed/DD8UOgj-970",
        "https://www.youtube.com/embed/sOVyI56x-hA",
        "https://www.youtube.com/embed/qwLaU_BQkqY",
        "https://www.youtube.com/embed/eLwmYS9QQDs",
        "https://www.youtube.com/embed/fz2kgZqjvxE",
        "https://www.youtube.com/embed/QGQIbWYgj9c",
        "https://www.youtube.com/embed/PZxVJS4tJ-o",
        "https://www.youtube.com/embed/wRheCSsux0Y",
        "https://www.youtube.com/embed/_CRnai8nCIU",
        "https://www.youtube.com/embed/OJa1QmEojac",
        "https://www.youtube.com/embed/lh0VSVysUOo",
        "https://www.youtube.com/embed/MxfmkXIykJY",
        "https://www.youtube.com/embed/Xwy3r9BtQnw",
        "https://www.youtube.com/embed/-QGE2xjhEY0",
        "https://www.youtube.com/embed/rXn_O8yECCQ",
        "https://www.youtube.com/embed/aZGn4LncY0g",
        "https://www.youtube.com/embed/jAV8LCKv1q0",
        "https://www.youtube.com/embed/PU5xxh5UX4U",
        "https://www.youtube.com/embed/vK3we1VVRH4",
        "https://www.youtube.com/embed/vcywnNixrQw",
        "https://www.youtube.com/embed/HFlSqWlL8h8",
        "https://www.youtube.com/embed/9YNB9kanhyM",
        "https://www.youtube.com/embed/IO-_2nBsxN4",
        "https://www.youtube.com/embed/zpjBN-61C6Q",
        "https://www.youtube.com/embed/P-5TbmFLSkc",
        "https://www.youtube.com/embed/qkyRHRIvoGo",
        "https://www.youtube.com/embed/7ThtEJBlu4I",
        "https://www.youtube.com/embed/im9XuJJXylw",
        "https://www.youtube.com/embed/ZD8YPY8RBQc",
        "https://www.youtube.com/embed/dmlQ0YEztLc",
        "https://www.youtube.com/embed/gRlj5vjp3Ko",
        "https://www.youtube.com/embed/4WDK16m1Ks4",
        "https://www.youtube.com/embed/nROOMhxmK-w",
        "https://www.youtube.com/embed/N-aK6JnyFmk",
        "https://www.youtube.com/embed/pnbqKjbzEFQ",
        "https://www.youtube.com/embed/8S3Yt-NxY0E",
        "https://www.youtube.com/embed/eKpVQm41f8Y",
        "https://www.youtube.com/embed/-9zt4CfFp6A",
        "https://www.youtube.com/embed/QRziSaSuegE",
        "https://www.youtube.com/embed/pha-fsuPk_I",
        "https://www.youtube.com/embed/wqi3CSGJnds"
        ]
    });
});
*/

Database.sync();

// Relations:

Users.hasMany(Jukeboxes);
Jukeboxes.belongsTo(Users);

// The app:

app.get("/", function(req, res) {

    if(!req.isAuthenticated()){
        res.redirect("/login");
    }
    else {
        Jukeboxes.findAll({
            attributes: ["videos"]
        }).then(function (thesongs) {
            res.render("jukebox", {
                isLoggedIn: req.isAuthenticated(),
                user: req.user,
                data: thesongs[0].videos
            });
        });
    }
});

// Login page:

app.get("/login", function(req, res) {
    res.render("login");
});

// Login page post method:

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), function(req, res) {
    res.redirect("/");
});

// Register:

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register",rCaptcha.middleware.verify, function(req, res) {

    Users.findAll({
        where: {
            username: req.body.username
        }
    }).then(function (user) {
        if (req.recaptcha.error) {
            res.redirect("/register");
        }
        else if (user[0] !== undefined){
            res.render("register", {
                err: "User already exists!"
            });
        }
        else {

            var hashedPassword = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(5));

            Users.create({
                username: req.body.username,
                password: hashedPassword
            });
            res.redirect("/login");
        }
    });
});

app.get("/new", function(req, res) {
    res.render("newJukebox");
});

app.get("/pics/jukebox.jpg", function(req, res) {
    res.sendFile(path.join(__dirname + "/pics/jukebox.jpg"));
});

// CSS:

app.get("/css/style.css", function(req, res) {
    res.sendFile(path.join(__dirname + "/css/style.css"));
});

// Jukebox page JS:

app.get("/js/jukebox.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/js/jukebox.js"));
});