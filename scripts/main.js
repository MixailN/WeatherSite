var currentCityContainer = document.getElementsByClassName("current-city-container")[0];
API_KEY = "b55cb6a60addb3d56b8affed8e202b01";

function getLocation() {
    if(navigator.geolocation) {
        geo = navigator.geolocation.getCurrentPosition(showData)
    } else {
        x.innerHTML = "Your browser doesn't support geolocation"
    }
}

async function showData(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let cityName = await getCityName(lat, lon);
    let answer = await getWeather(lat, lon);
    currentCityContainer.innerHTML = `
            <ul class="current-city">
                <li class="current-city-name-container">
                    <h2 class="current-city-name">${cityName}</h2>
                </li>
                <li class="weather-icon-container">
                    <img class="current-weather-icon" src="img/Cloud.svg">
                </li>
                <li class="temperature-container">
                    <span class="current-temperature">${Math.round(answer.main.temp)}&degC</span>
                </li>
            </ul>
            <ul class="city-data">
                <li class="weather-data"><span class="title">Ветер</span> <span class="description">северно-южный ${answer.wind.speed}м/с</span></li>
                <li class="weather-data"><span class="title">Облачность</span> <span class="description">облачно</span></li>
                <li class="weather-data"><span class="title"> Давление</span><span class="description">${answer.main.pressure}гПа</span></li>
                <li class="weather-data"><span class="title">Влажность</span><span class="description">${answer.main.humidity}%</span></li>
                <li class="weather-data"><span class="title">Координаты</span><span class="description">[${Math.round(lat)}, ${Math.round(lon)}]</span></li>
            </ul>`;

}

async function getCityName(lat, lon) {
    let city_url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ru`;
    let response = await fetch(city_url);
    if(response.ok) {
        let answer = await response.json();
        return answer.city;
    } else {
        alert("Error: " + response.status);
    }
}

async function getWeather(lat, lon) {
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    let response = await fetch(weather_url);
    if(response.ok) {
        let answer = await response.json();
        return answer;
    } else {
        alert("Error: " + response.status);
    }
}