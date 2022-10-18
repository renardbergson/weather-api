// function to get the current location
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

// Object weather
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

//function to change the background according to the weather
function changingBackground(weatherIcon) {
    switch(weatherIcon) {
        // clear sky
        case "01d":
            document.querySelector("body").style = "background-image: url(https://get.pxhere.com/photo/landscape-nature-grass-outdoor-horizon-plant-sky-field-lawn-meadow-prairie-flower-summer-clear-food-spring-green-crop-pasture-space-park-clean-soil-blue-freedom-agriculture-plain-rapeseed-background-grassland-plateau-day-habitat-canola-ecosystem-brassica-steppe-rural-area-flowering-plant-natural-environment-grass-family-land-plant-mustard-plant-1153308.jpg)";
            break;
        // clear sky at night
        case "01n":
            document.querySelector("body").style = "background-image: url(https://get.pxhere.com/photo/sky-night-cosmos-dark-clear-constellation-space-glow-blue-night-sky-outer-space-sparkle-starry-science-astronomy-stars-universe-shiny-screenshot-astronomical-object-694002.jpg)";
            break;
        // few clouds
        case "02d":
            document.querySelector("body").style = "background-image: url(https://www.creativefabrica.com/wp-content/uploads/2020/08/29/Blue-sky-with-white-Clouds-Graphics-5178971-1-1-580x387.jpg)";
            break;
        // few clouds at night
        case "02n":
            document.querySelector("body").style = "background-image: url(https://images3.alphacoders.com/701/701110.jpg)";
            break;
        // overcast clouds
        case "03d":
            document.querySelector("body").style = "background-image: url(https://www.boatus.com/-/media/expert-advice-archive/2018/april/cirrocumulus-clouds.ashx?la=en&hash=C397276BB7FBA5040E7696E5F5B41B61)";
            break;
        // overcast clouds at night
        case "03n":
            document.querySelector("body").style = "background-image: url(https://c4.wallpaperflare.com/wallpaper/620/269/155/moonlight-stars-night-clouds-sky-hd-wallpaper-preview.jpg)";
            break;
        // broken clouds
        case "04d":
            document.querySelector("body").style = "background-image: url(https://www.boatus.com/-/media/expert-advice-archive/2018/april/altocumulus-clouds.ashx?la=en&hash=93AF3BE82726F6D67595634A178BB752)";
            break;
        // broken clouds at night
        case "04n":
            document.querySelector("body").style = "background-image: url(https://pbs.twimg.com/media/ECBmR0tVAAA420K?format=jpg&name=4096x4096)";
            break;
        // soft rain
        case "09d":
            document.querySelector("body").style = "background-image: url(https://s.hdnux.com/photos/01/23/17/35/21821308/4/1200x0.jpg)";
            break;
        // soft rain at night
        case "09n":
            document.querySelector("body").style = "background-image: url(https://c4.wallpaperflare.com/wallpaper/264/852/912/urban-rain-night-lights-wallpaper-preview.jpg)";
            break;
        // rain
        case "10d":
            document.querySelector("body").style = "background-image: url(https://896479.smushcdn.com/2111889/wp-content/uploads/2021/05/image-4-1024x682.jpeg?lossy=1&strip=1&webp=1)";
            break;
        // rain at night
        case "10n":
            document.querySelector("body").style = "background-image: url(https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80)";
            break;
        // thunderstorm
        case "11d":
            document.querySelector("body").style = "background-image: url(https://cdn.britannica.com/57/150357-050-427E4C4F/lightning-discharge-field-cumulonimbus-cloud.jpg)";
            break;
        // thunderstorm at night
        case "11n":
            document.querySelector("body").style = "background-image: url(https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)";
            break;
        // snow
        case "13d":
            document.querySelector("body").style = "background-image: url(https://www.collinsdictionary.com/images/full/snow_306991961_1000.jpg?version=4.0.281)";
            break;
        // snow at night
        case "13n":
            document.querySelector("body").style = "background-image: url(https://c4.wallpaperflare.com/wallpaper/734/899/618/snow-road-night-winter-wallpaper-preview.jpg)";
            break;
        // mist
        case "50d":
            document.querySelector("body").style = "background-image: url(https://www.collinsdictionary.com/images/full/mist_339182456_1000.jpg?version=4.0.281)";
            break;
        // mist at night
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
changingBackground(weather.gettingIcon);