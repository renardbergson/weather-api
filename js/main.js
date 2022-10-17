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
            if(data.name = " ") {
                status.textContent = data.localityInfo.administrative[6].name +', ' + data.principalSubdivision;
            } else {
                status.textContent = data.city +', ' + data.principalSubdivision;
            }
            
        })
    }

    const error = () => {
        status.textContent = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);
}


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
        document.querySelector(".temp").innerText = temp.toFixed(1) + "° C";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".description-weather").style.display = "flex";
        document.querySelector("h4").style.display = "flex";
        if(humidity < 30 && humidity > 19 ) {
            document.querySelector(".humidity").style = "text-shadow: 0 0 5px #ffc400";
        } else if(humidity < 20) {
            document.querySelector(".humidity").style = "text-shadow: 0 0 5px #ff0000";
        } else {
            document.querySelector(".humidity").style = "text-shadow: 0 0 5px #00CFFF"; 
        }
        changingBackground(icon);
        console.log(icon)
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    },
    gettingIcon: function(data) {
        return data.weather[0]
    }

};

function changingBackground(weather) {
    switch(weather) {
        case "01d":
            document.querySelector("body").style = "background-image: url(../images/clear-sky.jpg)";
            break;
        case "02d":
            document.querySelector("body").style = "background-image: url(../images/few-clouds.jpg)";
            break;
        case "03d":
            document.querySelector("body").style = "background-image: url(../images/scattered-clouds.jpg)";
            break;
        case "04d":
            document.querySelector("body").style = "background-image: url(../images/broken-clouds.jpg)";
            break;
        case "09d":
            document.querySelector("body").style = "background-image: url(../images/shower-rain.jpg)";
            break;
        case "10d":
            document.querySelector("body").style = "background-image: url(../images/rain.jpg)";
            break;
        case "11d":
            document.querySelector("body").style = "background-image: url(../images/thunderstorm.jpg)";
            break;
        case "13d":
            document.querySelector("body").style = "background-image: url(../images/snow.jpg)";
            break;
        case "50d":
            document.querySelector("body").style = "background-image: url(../images/mist.jpg)";
            break;
        default:
            return;
    }
}

document.querySelector(".search-btn").addEventListener("click", function () {
 weather.search();
});

document.querySelector(".searchBar").addEventListener("keypress", function (e) {
    if(e.which == 13){
        weather.search();
     }
},false);

findCurrentCity();
changingBackground(weather.gettingIcon)