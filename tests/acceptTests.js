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

module.exports = {
    "Test ability to create a jukebox and import another users jukebox" : function (client) {
        client
            .url("https://jukeboxvids.herokuapp.com/")
            .waitForElementVisible("body", 1000)
            .assert.title("Project Jukebox")
            .setValue("input[type=text]", "user1")
            .setValue("input[type=password]", "password1")
            .click("input[type=submit]")
            .pause(1000)
            .waitForElementPresent("a", 1000)
            .assert.containsText("a", "Create a new jukebox")
            .click("a")
            .waitForElementVisible("textarea", 1000)
            .setValue("input[type=text]", "jukebox1")
            .setValue("textarea", "https://www.youtube.com/watch?v=yE8mK2Jkjys")
            .click("input[type=submit]")
            .pause(1000)
            .assert.containsText("h1", "jukebox1")
            .url("https://jukeboxvids.herokuapp.com/login")
            .waitForElementVisible("body", 1000)
            .assert.title("Project Jukebox")
            .setValue("input[type=text]", "user2")
            .setValue("input[type=password]", "password2")
            .click("input[type=submit]")
            .pause(1000)
            .waitForElementPresent("a", 1000)
            .assert.containsText("a", "Create a new jukebox")
            .click("a")
            .waitForElementVisible("textarea", 1000)
            .setValue("input[type=text]", "jukebox2")
            .setValue("textarea", "https://www.youtube.com/watch?v=s8eGujRpXyU")
            .click("input[type=submit]")
            .pause(1000)
            .assert.containsText("h1", "jukebox2")
            .click("a:nth-of-type(2)")
            .waitForElementVisible("body", 1000)
            .assert.containsText("h1", "Search for a jukebox")
            .setValue("input[type=text]", "1")
            .click("input[type=submit]")
            .pause(1000)
            .assert.containsText("h1", "jukebox1")
            .click("input")
            .waitForElementPresent("iframe", 1000)
            .end();
    }
};