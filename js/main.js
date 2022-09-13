/* checkin if the browser supports geolocation */

if ("geolocation" in navigator) {
    /* geolocation is available */
} else {
    alert("I'm sorry, but geolocation services are not supported by your browser.");
}

/* variables */

let currentLocation;