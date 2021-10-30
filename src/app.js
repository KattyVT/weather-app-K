function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes(); 
if (minutes < 10 ) {
  minutes = `0${minutes}`;
}
  
    return `${day} ${hour}:${minutes}`;
}

function formatDay (timestamp) {
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue","Wed","Thu","Fri","Sat"];
  return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;    
    forecast.forEach(function(forecastDay, index) {
      if (index < 6) {
      forecastHTML =  forecastHTML +
    
    `
     <div class="col-2">
              <div class="weather-forecast-day">
                ${formatDay(forecastDay.dt)}
              </div>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>            
              </div>
    </div>
    `;
      }
})

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  console.log(coordinates);
    let apiKey = "743bee57fddbfaf52447193a87d5dd25";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement= document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date-time");
    let iconElement = document.querySelector("#icon");
    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000); 
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

   getForecast(response.data.coord);


}

function search(city) {
let apiKey = "743bee57fddbfaf52447193a87d5dd25";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-input");
    search(cityInputElement.value);
}


function displayFarenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove active class from celsius link
    celsiusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(farenheitTemperature);
}


function displayCelsiusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    farenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Frankfurt");
