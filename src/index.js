import './sass/main.scss';
import { getRefs } from './js/refs';
const refs = getRefs();

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        // console.log(long, lat);
        getWeatherByCoords(long, lat);
    })
}

function getWeatherByCoords(long, lat) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5c8dab899c73e9fec8517804e94f0209&units=metric`;
    fetch(url).then(response => {
        console.log(response);
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).then(renderMarkup);
}

function renderMarkup({main, weather, name}) {
    refs.timeZone.textContent = name;
    refs.degree.textContent = Math.round(main.temp);
    refs.description.textContent = weather[0].description;
    console.log(weather[0].icon);
    console.log(main.temp);
}

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid=5c8dab899c73e9fec8517804e94f0209