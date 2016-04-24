"use strict";

var theApp = require("./app.js");

exports.emptyInput = function(test){
    test.expect(1);
    test.ok(theApp.createPostgresDatabase());
    test.done();
};

exports.wrongFormatInput = function(test){
    test.expect(1);
    test.ok(theApp.createPostgresDatabase(1, 1, 1));
    test.done();
};

exports.unvalidInput = function(test){
    test.expect(1);
    test.ok(theApp.createPostgresDatabase("test1", "test2", "test3"));
    test.done();
};

exports.validInput = function(test){
    test.expect(1);
    test.ok(theApp.createPostgresDatabase("dc07jvq271mlte", "mbmehhadorcpnx", "ZMixbTsZLOvL0MO8sHP45QEGzC"));
    test.done();
};