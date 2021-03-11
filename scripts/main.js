const currentCityContainer = document.getElementsByClassName("current-city-container")[0];
const API_KEY = "b55cb6a60addb3d56b8affed8e202b01";
const form = document.getElementsByClassName("search-form");
const input = document.getElementsByClassName("search-field");

window.onload = function () {
    getLocation();
    for(let key of Object.keys(localStorage)) {
        let count = localStorage.getItem(key);
        console.log(key + "1");
        while(count--) {
            onloadFavoriteCity(key);
        }
    }
};

document.forms.search.onsubmit = function() {
    let message = this.q.value;
    console.log(message);
    getFavoriteCity(message);
    return false;
};

function clearLocal() {
    localStorage.clear();
}

function onloadFavoriteCity(name) {
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`;
    let xhr = new XMLHttpRequest();
    const li = document.createElement("li");
    const list = document.getElementsByClassName("favorites");
    li.classList.add("favorite-city");
    li.innerHTML = `<div class="favorite-city-header">
                    <h3 class="favorite-city-name">Данные загружаются</h3>
                    <button class="close-button" onclick="deleteCity(this)">x</button>
                </div>`;
    list[0].appendChild(li);
    xhr.responseType = "json";
    xhr.open("GET", weather_url);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            li.remove();
        } else {
            let answer = xhr.response;
            li.innerHTML = `
                <div class="favorite-city-header">
                    <h3 class="favorite-city-name">${answer.name}</h3>
                    <span class="favorite-temperature">${Math.round(answer.main.temp)}&degC</span>
                    <img class="weather-icon" src="http://openweathermap.org/img/wn/${answer.weather[0].icon}@2x.png">
                    <button class="close-button" onclick="deleteCity(this)">x</button>
                </div>
                <ul class="city-data">
                    <li class="weather-data"><span class="title">Ветер</span> <span class="description">северно-южный ${answer.wind.speed}м/с</span></li>
                    <li class="weather-data"><span class="title">Облачность</span> <span class="description">облачно</span></li>
                    <li class="weather-data"><span class="title"> Давление</span><span class="description">${answer.main.pressure}гПа</span></li>
                    <li class="weather-data"><span class="title">Влажность</span><span class="description">${answer.main.humidity}%</span></li>
                    <li class="weather-data"><span class="title">Координаты</span><span class="description">[]</span></li>
                </ul>
            `;
        }
    }
}

function getFavoriteCity(name){
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`;
    let xhr = new XMLHttpRequest();
    const li = document.createElement("li");
    const list = document.getElementsByClassName("favorites");
    li.classList.add("favorite-city");
    li.innerHTML = `<div class="favorite-city-header">
                    <h3 class="favorite-city-name">Данные загружаются</h3>
                    <button class="close-button" onclick="deleteCity(this)">x</button>
                </div>`;
    list[0].appendChild(li);
    xhr.responseType = "json";
    xhr.open("GET", weather_url);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            li.remove();
        } else {
            let answer = xhr.response;
            let count = localStorage.getItem(answer.name);
            if(count == null) {
                li.innerHTML = `
                <div class="favorite-city-header">
                    <h3 class="favorite-city-name">${answer.name}</h3>
                    <span class="favorite-temperature">${Math.round(answer.main.temp)}&degC</span>
                    <img class="weather-icon" src="http://openweathermap.org/img/wn/${answer.weather[0].icon}@2x.png">
                    <button class="close-button" onclick="deleteCity(this)">x</button>
                </div>
                <ul class="city-data">
                    <li class="weather-data"><span class="title">Ветер</span> <span class="description">северно-южный ${answer.wind.speed}м/с</span></li>
                    <li class="weather-data"><span class="title">Облачность</span> <span class="description">облачно</span></li>
                    <li class="weather-data"><span class="title"> Давление</span><span class="description">${answer.main.pressure}гПа</span></li>
                    <li class="weather-data"><span class="title">Влажность</span><span class="description">${answer.main.humidity}%</span></li>
                    <li class="weather-data"><span class="title">Координаты</span><span class="description">[]</span></li>
                </ul>
            `;
                localStorage.setItem(answer.name, "1");
            } else {
                li.innerHTML = `
                <div class="favorite-city-header">
                    <h3 class="favorite-city-name">${answer.name}</h3>
                    <span class="favorite-temperature">${Math.round(answer.main.temp)}&degC</span>
                    <img class="weather-icon" src="http://openweathermap.org/img/wn/${answer.weather[0].icon}@2x.png">
                    <button class="close-button" onclick="deleteCity(this)">x</button>
                </div>
                <ul class="city-data">
                    <li class="weather-data"><span class="title">Ветер</span> <span class="description">северно-южный ${answer.wind.speed}м/с</span></li>
                    <li class="weather-data"><span class="title">Облачность</span> <span class="description">облачно</span></li>
                    <li class="weather-data"><span class="title"> Давление</span><span class="description">${answer.main.pressure}гПа</span></li>
                    <li class="weather-data"><span class="title">Влажность</span><span class="description">${answer.main.humidity}%</span></li>
                    <li class="weather-data"><span class="title">Координаты</span><span class="description">[]</span></li>
                </ul>
            `;
                localStorage.setItem(answer.name, `${parseInt(count) + 1}`);
            }
        }
    }
}

function getLocation() {
    if(navigator.geolocation) {
        geo = navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure);
    } else {
        alert("Your browser doesn't support geolocation");
    }
}

async function geoSuccess(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    currentCityContainer.innerHTML = `
                <div class="loading-box">
                    <h2>Подождите данные загружаются</h2>
                </div>
            `;
    let cityName = await getCityName(lat, lon);
    let answer = await getWeather(lat, lon);
    currentCityContainer.innerHTML = `
            <ul class="current-city">
                <li class="current-city-name-container">
                    <h2 class="current-city-name">${cityName}</h2>
                </li>
                <li class="weather-icon-container">
                    <img class="current-weather-icon" src="http://openweathermap.org/img/wn/${answer.weather[0].icon}@2x.png">
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
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        let city_url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`;
        xhr.open("GET", city_url);
        xhr.onload = function() {
            if (xhr.status !== 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                let answer = xhr.response;
                resolve(answer.city);
            }
        };
        xhr.send();
    });

}

async function getWeather(lat, lon) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        xhr.open("GET", weather_url);
        xhr.onload = function() {
            if (xhr.status !== 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                resolve(xhr.response);
            }
        };
        xhr.send();
    });
}

function geoFailure() {
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=saint+petersburg&appid=${API_KEY}&units=metric`;
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", weather_url);
    xhr.onload = function() {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let answer = xhr.response;
            currentCityContainer.innerHTML = `
            <ul class="current-city">
                <li class="current-city-name-container">
                    <h2 class="current-city-name">Saint-Petersburg</h2>
                </li>
                <li class="weather-icon-container">
                    <img class="current-weather-icon" src="http://openweathermap.org/img/wn/${answer.weather[0].icon}@2x.png">
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
                <li class="weather-data"><span class="title">Координаты</span><span class="description">[${Math.round(answer.coord.lon)}, ${Math.round(answer.coord.lat)}]</span></li>
            </ul>`;
        }
    };
    xhr.send();
}

function deleteCity(element) {
    let header = element.parentElement;
    let li = header.parentElement;
    localStorage.removeItem(header.children.item(0).textContent);
    li.remove();

}