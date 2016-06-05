"use strict";



var cookieConsent = document.querySelector("#cookieConsent");

// Removes the cookie consent bar when clicked:

cookieConsent.addEventListener("click", function(event){
    event.target.classList.add("hidden");
});