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
