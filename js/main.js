function findCurrentCity () {
    const status = document.querySelector(".current-location");

    const success = (position) => {
        console.log(position);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const geoApiUrl = "https://api.bigdatacloud.net/data/reverse-geocode?latitude=" + lat + "&longitude=" + lon + "&localityLanguage=en&key=bdc_69ccd806013d4ee58db0086efbef14ec"

        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            status.textContent = data.localityInfo.administrative[6].name +', ' + data.principalSubdivision
            + ' - ' + data.countryName
        })
    }

    // localityInfo.administrative[6].name
    const error = () => {
        status.textContent = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);
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
        document.querySelector(".temp").innerText = temp + "° C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = description;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};

document.querySelector(".search-btn").addEventListener("click", function () {
 weather.search();
});

findCurrentCity()