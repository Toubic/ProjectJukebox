"use strict";

var theTemplate = document.querySelector("#jukeboxTemplate");
var theJukebox = document.importNode(theTemplate.content.firstElementChild, true);
var theBody = document.body;
theBody.appendChild(theJukebox);

for (var i = 0; i < buttons.length; i++) {
    theJukebox.querySelectorAll("input")[i].addEventListener("click", function (event) {
        var playASong = document.querySelector("#playASong");
        if(playASong.firstElementChild) {
            var previousSong = playASong.firstElementChild;
            playASong.removeChild(previousSong);
        }
        var theIframe = document.createElement("iframe");
        theIframe.src = event.target.value + "?autoplay=1";
        theIframe.setAttribute("allowFullScreen", "");
        playASong.appendChild(theIframe);
    });
}