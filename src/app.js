function displayTemperature(response) {
    console.log(response.data.main.temp);
}


let apiKey = "743bee57fddbfaf52447193a87d5dd25";
let units = "metric";
let city = "Frankfurt"

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);