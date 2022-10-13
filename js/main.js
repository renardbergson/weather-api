/* checkin if the browser supports geolocation */

if ("geolocation" in navigator) {
    /* geolocation is available */
} else {
    alert("I'm sorry, but geolocation services are not supported by your browser.");
}

/* variables */

let weather = {
    apiKey: "ad21aa0e93281234d77fe50bb70510f6",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey             
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { country } = data.sys
        console.log(name, icon, description, temp, humidity);
        document.querySelector(".city").innerText = name + ', ' + country;
        document.querySelector(".temp").innerText = temp + "C°";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = description;
    }
}