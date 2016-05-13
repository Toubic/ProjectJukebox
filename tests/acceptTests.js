module.exports = {
    "Test click link to video on the Jukebox page" : function (client) {
        client
            .url("https://jukeboxvids.herokuapp.com/")
            .waitForElementVisible("body", 1000)
            .assert.title("Project Jukebox")
            .waitForElementVisible("input", 1000)
            .click("input")
            .waitForElementPresent("iframe", 1000)
            .pause(1000)
            .end();
    }
};

module.exports = {
    "Register test reCAPTCHA" : function (client) {
        client
            .url("https://jukeboxvids.herokuapp.com/")
            .waitForElementVisible("body", 1000)
            .assert.title("Project Jukebox")
            .waitForElementVisible("a", 1000)
            .click("a")
            .waitForElementPresent("div", 1000)
            .setValue("input[type=text]", "user1")
            .setValue("input[type=password]", "password1")
            .click("div")
            .pause(1000)
            .submitForm("form")
            .pause(2000)
            .click("input[type=submit]")
            .pause(1000)
            .waitForElementVisible("h1", 1000)
            .assert.containsText("h1", "Create New User")
            .assert.containsText("h1", "Project Jukebox Login")
            .end();
    }
};

module.exports = {
    "Test log in with empty, invalid and valid username and password" : function (client) {
        client
            .url("https://jukeboxvids.herokuapp.com/")
            .waitForElementVisible("body", 1000)
            .assert.title("Project Jukebox")
            .setValue("input[type=text]", "")
            .setValue("input[type=password]", "")
            .click("input[type=submit]")
            .pause(1000)
            .assert.containsText("h1", "Project Jukebox Login")
            .setValue("input[type=text]", "user")
            .setValue("input[type=password]", "password")
            .click("input[type=submit]")
            .pause(1000)
            .assert.containsText("h1", "Project Jukebox Login")
            .setValue("input[type=text]", "user1")
            .setValue("input[type=password]", "password1")
            .click("input[type=submit]")
            .click("input")
            .waitForElementPresent("iframe", 1000)
            .end();
    }
};