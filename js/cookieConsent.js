"use strict";

var cookieConsent = document.querySelector("#cookieConsent");

cookieConsent.addEventListener("click", function(event){
    event.target.classList.add("hidden");
});