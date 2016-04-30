module.exports = {
    "Test Jukebox page" : function (client) {
        client
            .url("https://jukeboxvids.herokuapp.com/")
            .waitForElementVisible("body", 1000)
            .assert.title("Project Jukebox")
            .waitForElementVisible("input", 1000)
            .click("input")
            .waitForElementPresent("iframe", 5000)
            .pause(5000)
            .end();
    }
};
