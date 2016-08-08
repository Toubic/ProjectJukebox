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
var request = require("request");
var Storage = require("fs-storage");
var storage = new Storage("./storage/");
var app = express();

// Google reCAPTCHA:

rCaptcha.init("6LetACQTAAAAAN3TvDPrdJznkv8wCQBzAIqDDvfU","6LetACQTAAAAALtli4PUSQ-h127kIKGww_AcEgv6", "image");

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

const THE_DATABASE = "d3lpev20blbhkr";
const THE_USERNAME = "wjorhaebgfaqzm";
const THE_PASSWORD = "VSHM4YlFAyTAGOOlVtZ_TbSa2J";


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
                host: 'ec2-54-247-185-241.eu-west-1.compute.amazonaws.com'
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

// Relations:

Users.hasMany(Jukeboxes);
Jukeboxes.belongsTo(Users);

// Clean the database:

/*
Users.sync({force: true}).then(function () {
});

Jukeboxes.sync({force: true}).then(function () {
});
*/

Database.sync();

// The app:

app.get("/", function(req, res) {
    storage.clear();
    if(!req.isAuthenticated()){
        res.redirect("/login");
    }
    else {
        Jukeboxes.findAll({
            where: {
                id: req.user
            }
        }).then(function (jukebox) {
            if(jukebox[0] !== undefined) {
                res.render("jukebox", {
                    isLoggedIn: req.isAuthenticated(),
                    title: jukebox[0].title,
                    user: req.user,
                    data: jukebox[0].videos
                });
            }
            else {
                res.render("jukebox", {
                    isLoggedIn: req.isAuthenticated(),
                    title: "Welcome!",
                    user: req.user,
                    data: []
                });
            }
        });
    }
});

// Search page:

app.get("/search", function(req, res) {
    Jukeboxes.all().then(function (jukeboxes) {
            res.render("search", {
                isLoggedIn: req.isAuthenticated(),
                jukebox: jukeboxes
            });
    });
});

app.post("/search", function(req, res) {

    if(!isNaN(req.body.search) && req.body.search > 0) {
        Jukeboxes.findAll({
            where: {
                id: req.body.search
            }
        }).then(function (jukebox) {
            if (jukebox[0] !== undefined) {
                res.render("jukebox", {
                    isLoggedIn: req.isAuthenticated(),
                    title: jukebox[0].title,
                    user: req.user,
                    data: jukebox[0].videos
                });
            }
            else {
                res.render("jukebox", {
                    isLoggedIn: req.isAuthenticated(),
                    title: "Welcome!",
                    user: req.user,
                    data: []
                });
            }
        });
    }
    else {
        res.redirect("/");
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

// Logout:

app.get("/logout", function(req, res) {
    req.logout();
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

// Create a new jukebox:

app.get("/new", function(req, res) {
    res.render("newJukebox");
});

function aTitleRequest(theURL, callback) {

    request(theURL, function (err, response, body){
        var jsonData;
        var aTitle;
        jsonData = JSON.parse(body);
        aTitle = jsonData.title;
        if(err)
            callback(err);
        else
            callback(null, aTitle);
    });
}

app.post("/new", function(req, res) {

    var arrayOfEmbeddedLinks = [];
    var theLinks = req.body.links;
    var theTitle = req.body.title;

    if(theLinks.trim() === ""){
        Jukeboxes.upsert({
            id: req.user,
            title: theTitle,
            videos: null
        });
    }

    theLinks = theLinks.split("\n");

    arrayOfEmbeddedLinks = convertToEmbeddedLinks(theLinks);

    if(arrayOfEmbeddedLinks.length === 0) {
        Jukeboxes.upsert({
            id: req.user,
            title: theTitle,
            videos: null
        });
        res.redirect("/");
    }

    var theInterval = setInterval(function () {
        if (storage.getItem(arrayOfEmbeddedLinks[0]) !== null) {
            clearInterval(theInterval);
            var videos = [];
            arrayOfEmbeddedLinks.forEach(function(link){
                videos.push([storage.getItem(link), link]);
            });
            Jukeboxes.upsert({
                id: req.user,
                title: theTitle,
                videos: videos
            });

            res.redirect("/");
        }
    }, 100);

});

function convertToEmbeddedLinks(theLinks) {
    var i = 1;
    var arrayOfEmbeddedLinks = [];

    for (var y = 0 ; y < theLinks.length; y++){
        if(theLinks[y].indexOf("youtube.com/") === -1)
            theLinks[y] = null;
    }

    theLinks.forEach(function (link) {
        if( link !== null && link.indexOf("youtube.com/") !== -1) {
            var theLink = link;
            var embeddedLink;
            theLink = theLink.trim();

            var theURL = "https://www.youtube.com/oembed?url=" + theLink + "&format=json";

            embeddedLink = "https://www.youtube.com/embed/" + theLink.slice((theLink.indexOf("youtube.com/") + 20), theLink.length);
            videoTitleRequest(theURL, i);
            storage.setItem(i++, embeddedLink);
            arrayOfEmbeddedLinks.push(embeddedLink);
        }
    });
    if(arrayOfEmbeddedLinks.length > 0)
        return arrayOfEmbeddedLinks;
    else
        return [];
}

function videoTitleRequest(theURL, theIndex) {
    aTitleRequest(theURL, function (err, aTitle){
        var link = storage.getItem(theIndex++);
        storage.setItem(link, aTitle);
        storage.removeItem();
    });
}

// Pics:

app.get("/pics/jukebox.jpg", function(req, res) {
    res.sendFile(path.join(__dirname + "/pics/jukebox.jpg"));
});

app.get("/pics/jt.png", function(req, res) {
    res.sendFile(path.join(__dirname + "/pics/jt.png"));
});

// CSS:

app.get("/css/style.css", function(req, res) {
    res.sendFile(path.join(__dirname + "/css/style.css"));
});

// Jukebox page JS:

app.get("/js/jukebox.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/js/jukebox.js"));
});

// Cookie Consent JS:
app.get("/js/cookieConsent.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/js/cookieConsent.js"));
});

// robots.txt

app.get("/robots.txt", function(req, res) {
    res.sendFile(path.join(__dirname + "/robots.txt"));
});