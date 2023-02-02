//Complete the Weather API Backend part using openweathermap api
// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.
let searchBar = document.getElementById('searchBar');
let btn = document.getElementById('button');
let place = document.getElementById('location');
let sky = document.getElementById('sky');
let temprature = document.getElementById('temp');
let date = document.getElementById('date');
let weather = document.getElementById('weather');
var locationProvided;

btn.onclick = () => {
  locationProvided = searchBar.value;
  place.innerText = locationProvided;
  var today = new Date();
  date.innerText = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  fetchInfo();
};
async function fetchInfo() {
  await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${locationProvided}&limit=1&appid=d7730b2e0f0ba90a3e84f67e9abb8d5d`
  )
    .then((res) => res.json())
    .then((e) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${e[0].lat}&lon=${e[0].lon}&appid=d7730b2e0f0ba90a3e84f67e9abb8d5d`
      )
    )
    .then((res) => res.json())
    .then((e) => weatherInfo(e));
}
function weatherInfo(zee) {
  console.log(zee);
  sky.innerText = zee['weather'][0]['main'];
  weather.innerText = `${(zee['main']['temp'] - 273.15) | 0}°c`;
  temprature.innerText = `${(zee['main']['temp_min'] - 273.15) | 0}°c/${
    (zee['main']['temp_max'] - 273.15) | 0
  }°c`;
}
