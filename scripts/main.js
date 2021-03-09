var currentCityContainer = document.getElementsByClassName("current-city-container")[0];
const API_KEY = "b55cb6a60addb3d56b8affed8e202b01";
const form = document.getElementsByClassName("search-form");
const input = document.getElementsByClassName("search-field");

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value.toLowerCase();
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    let weather_url = `api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}`
    xhr.open("GET", weather_url);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let answer = xhr.response;
            let x = document.getElementById("script-test");
            const li = document.createElement("li");
            li.classList.add("favorite-city");
            const markup = `
                <div class="favorite-city-header">
                    <h3 class="favorite-city-name">${answer.city}</h3>
                    <span class="favorite-temperature">Math.round(answer.main.temp)&degC</span>
                    <img class="weather-icon" src="http://openweathermap.org/img/wn/${answer.weather[0].icon}@2x.png">
                    <button class="close-button">x</button>
                </div>
                <ul class="city-data">
                    <li class="weather-data"><span class="title">Ветер</span> <span class="description">северно-южный ${answer.wind.speed}м/с</span></li>
                    <li class="weather-data"><span class="title">Облачность</span> <span class="description">облачно</span></li>
                    <li class="weather-data"><span class="title"> Давление</span><span class="description">${answer.main.pressure}гПа</span></li>
                    <li class="weather-data"><span class="title">Влажность</span><span class="description">${answer.main.humidity}%</span></li>
                    <li class="weather-data"><span class="title">Координаты</span><span class="description">[${Math.round(lat)}, ${Math.round(lon)}]</span></li>
                </ul>
            `;
            li.innerHTML = markup;
            let list = document.getElementsByClassName("favorites");
            list.appendChild(li);
        }
        form.reset();
        input.focus();
    }
});

function getFavoriteCity() {
    let input = document.getElementsByClassName("search-field");
    let inputVal = input.value;
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    let weather_url = `api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}`
    xhr.open("GET", weather_url);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let answer = xhr.response;
            let x = document.getElementById("script-test");
            const li = document.createElement("li");
            li.classList.add("favorite-city");
            const markup = `
                <div class="favorite-city-header">
                    <h3 class="favorite-city-name">${answer.city}</h3>
                    <span class="favorite-temperature">Math.round(answer.main.temp)&degC</span>
                    <img class="weather-icon" src="http://openweathermap.org/img/wn/${answer.weather[0].icon}@2x.png">
                    <button class="close-button">x</button>
                </div>
                <ul class="city-data">
                    <li class="weather-data"><span class="title">Ветер</span> <span class="description">северно-южный ${answer.wind.speed}м/с</span></li>
                    <li class="weather-data"><span class="title">Облачность</span> <span class="description">облачно</span></li>
                    <li class="weather-data"><span class="title"> Давление</span><span class="description">${answer.main.pressure}гПа</span></li>
                    <li class="weather-data"><span class="title">Влажность</span><span class="description">${answer.main.humidity}%</span></li>
                    <li class="weather-data"><span class="title">Координаты</span><span class="description">[${Math.round(lat)}, ${Math.round(lon)}]</span></li>
                </ul>
            `;
            li.innerHTML = markup;
            let list = document.getElementsByClassName("favorites");
            list.appendChild(li);
        }
    };
    xhr.onprogress = function (event) {
        // if (event.lengthComputable) {
        //     alert(`Получено ${event.loaded} из ${event.total} байт`);
        // } else {
        //     alert(`Получено ${event.loaded} байт`);
        // }
    };
}

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
    console.log(cityName);
    let answer = await getWeather(lat, lon);
    alert(answer.city);
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
        let city_url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ru`;
        xhr.open("GET", city_url);
        xhr.onload = function() {
            if (xhr.status !== 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                let answer = xhr.response;
                resolve(answer.city);
            }
        };
        xhr.onprogress = function (event) {
            // if (event.lengthComputable) {
            //     alert(`Получено ${event.loaded} из ${event.total} байт`);
            // } else {
            //     alert(`Получено ${event.loaded} байт`);
            // }
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
        xhr.onprogress = function (event) {
            // if (event.lengthComputable) {
            //     alert(`Получено ${event.loaded} из ${event.total} байт`);
            // } else {
            //     alert(`Получено ${event.loaded} байт`);
            // }
        };
        xhr.send();
    });
}