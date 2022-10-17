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
            document.querySelector("body").style = "background-image: url(https://get.pxhere.com/photo/landscape-nature-grass-outdoor-horizon-plant-sky-field-lawn-meadow-prairie-flower-summer-clear-food-spring-green-crop-pasture-space-park-clean-soil-blue-freedom-agriculture-plain-rapeseed-background-grassland-plateau-day-habitat-canola-ecosystem-brassica-steppe-rural-area-flowering-plant-natural-environment-grass-family-land-plant-mustard-plant-1153308.jpg)";
            break;
        case "01n":
            document.querySelector("body").style = "background-image: url(https://get.pxhere.com/photo/sky-night-cosmos-dark-clear-constellation-space-glow-blue-night-sky-outer-space-sparkle-starry-science-astronomy-stars-universe-shiny-screenshot-astronomical-object-694002.jpg)";
            break;
        case "02d":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/blue-sky-with-puffy-white-clouds_1385-12.jpg?w=1480&t=st=1666027291~exp=1666027891~hmac=852e02b74909ef83d21b641592deb540689a0f3046369127db0d5d8677908d63)";
            break;
        case "02n":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/beautiful-architecture-building-tokyo-cityscape_74190-7538.jpg?w=1060&t=st=1666027458~exp=1666028058~hmac=9809f4e90e9d005814a16d3676798192545657ddb0881e99d3663f0b57d27273)";
            break;
        case "03d":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/sun-sunlight-bright-outdoor-sky_1127-2391.jpg?w=1380&t=st=1666027121~exp=1666027721~hmac=c761afc6fd2beb54efaa2d67ab8118f073fa1ca0dd76c19fab7b582ce5f2dd3e)";
            break;
        case "03n":
            document.querySelector("body").style = "background-image: url(https://c4.wallpaperflare.com/wallpaper/620/269/155/moonlight-stars-night-clouds-sky-hd-wallpaper-preview.jpg)";
            break;
        case "04d":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/sunset-mountains_1127-4133.jpg?w=1380&t=st=1666027208~exp=1666027808~hmac=0223a7ee4b27fbfe2f3e447c1b5584525bdff4dc34e40d8097efd89755a0b804)";
            break;
        case "04n":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/amazing-beautiful-sky-with-clouds_58702-1653.jpg?w=1380&t=st=1666027575~exp=1666028175~hmac=f9beb5f1a35f09d88b65b305288d0a871f48ed53006db702571f986e4e7babb2)";
            break;
        case "09d":
            document.querySelector("body").style = "background-image: url(../images/shower-rain.jpg)";
            break;
        case "09n":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/natural-water-rain-drops-glass-window-abstract-texture-background_640221-159.jpg?w=1380&t=st=1666028413~exp=1666029013~hmac=0a27aba117c980344c20b3037a5f40acc8eaa6f3349aa78cc360c926623c9347)";
            break;
        case "10d":
            document.querySelector("body").style = "background-image: url(../images/rain.jpg)";
            break;
        case "10n":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/city-night-through-window-with-rain-drops_53876-128778.jpg?w=1380&t=st=1666028520~exp=1666029120~hmac=1437c5a370695a1fe1365adf558b340ea9bf557e3d65a0ed3d42861d96b2ddd0)";
            break;
        case "11d":
            document.querySelector("body").style = "background-image: url(../images/thunderstorm.jpg)";
            break;
        case "11n":
            document.querySelector("body").style = "background-image: url(https://img.freepik.com/free-photo/lightning-dark-sky-buildings-city-night_181624-15930.jpg?w=1380&t=st=1666028034~exp=1666028634~hmac=afadbd53683d85b153d96a60634347bd5ff3718ca23861062153e8b576852a0a)";
            break;
        case "13d":
            document.querySelector("body").style = "background-image: url(../images/snow.jpg)";
            break;
        case "13n":
            document.querySelector("body").style = "background-image: url(https://c4.wallpaperflare.com/wallpaper/734/899/618/snow-road-night-winter-wallpaper-preview.jpg)";
            break;
        case "50d":
            document.querySelector("body").style = "background-image: url(../images/mist.jpg)";
            break;
        case "50n":
            document.querySelector("body").style = "background-image: url(https://get.pxhere.com/photo/light-sky-fog-mist-night-morning-dawn-atmosphere-dusk-evening-weather-darkness-street-light-lighting-moonlight-midnight-screenshot-atmospheric-phenomenon-164880.jpg)";
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