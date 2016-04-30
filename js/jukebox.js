"use strict";

var theTemplate = document.querySelector("#jukeboxTemplate");
var theJukebox = document.importNode(theTemplate.content.firstElementChild, true);
var theBody = document.body;
theBody.appendChild(theJukebox);

var buttons = theJukebox.querySelectorAll("input");

for (var i = 0; i < buttons.length; i++) {
    theJukebox.querySelectorAll("input")[i].addEventListener("click", function (event) {
        var theSongTemplate = document.querySelector("#playASongTemplate");
        var theSong = document.importNode(theSongTemplate.content.firstElementChild, true);
        var theIframe = theSong.querySelectorAll("iframe")[0];
        theIframe.src = event.target.value;
        theJukebox.appendChild(theSong);
    });
}