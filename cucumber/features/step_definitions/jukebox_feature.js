"use strict";

var zombie = require("zombie");

module.exports = function (){

    var browser = new zombie();

    this.Given(/^I am a visitor$/, function (callback) {
        callback();
    });

    this.When(/^I visit the jukebox page$/, function (callback) {

       var visit = function (url, callback) {
           
            this.browser.visit(url, callback);
        };

        browser.visit("https://jukeboxvids.herokuapp.com/", callback);
    });
};