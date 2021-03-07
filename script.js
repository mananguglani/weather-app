const key = '13541d07bb9f6eb5e6b5570aef7694eb';

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main-content');

async function getWeatherByLocation(location) {
    const response = await fetch(url(location));
    const responseData = await response.json();

    showWeather(responseData);
};

function showWeather(data) {
    const temp = kelvinToCelsius(data.main.temp);
    const name = data.name;

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}" >
        <h1>${temp}°C (${data.weather[0].main})</h1>
        <p>${name}</p>
    `;

    main.innerHTML = '';

    main.appendChild(weather);
};

function kelvinToCelsius(K) {
    return Math.floor(K - 273.15);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    if(location) {
        getWeatherByLocation(location);
    }

    search.value = '';
});