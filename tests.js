"use strict";

var theApp = require("./app");

exports.testSomething = function(test){
    test.ok(true,"testing");
    test.done();
};