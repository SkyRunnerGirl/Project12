/* Coding Steps:
    - Create a CRD application (CRUD without update) using json-server or another API
    - Use fetch and async/await to interact with the API
    - Use a form to create/post new entities
    - Build a way for users to delete entities
    - Include a way to get entities from the API and display them
    - You do NOT need update, but you can add it if you'd like
    - Use Bootstrap and/or CSS to style your project
*/


/******* ADD LOCATION *******/

const onAddLocationClick = async () => {
    const locationDisplay = document.getElementById("locationDisplay");
    locationDisplay.textContent = document.getElementById("location").value;
    const weatherData = await fetchCurrentWeatherData();
    renderCurrentWeatherData(weatherData);
    const forecastData = await fetchForecastData();
    renderForecastData(forecastData);
}

/******* WEATHER *******/

// Get weather data from API
async function fetchCurrentWeatherData() {
    const location = document.getElementById("location").value
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=" + API_Key + "&q=" + location);
    const weatherData = await response.json()
    return weatherData
}

// Renders the current weather data to the page
function renderCurrentWeatherData(weatherData) {
    const tempC = weatherData.current.temp_c
    document.getElementById("temp_c").innerHTML = tempC
    const tempF = weatherData.current.temp_f
    document.getElementById("temp_f").innerHTML = tempF
    };
    


/******* FORECAST *******/
// Get forecast data from API
async function fetchForecastData() {
    const location = document.getElementById("location").value
    const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API_Key + "&q=" + location);
    const forecastData = await response.json()
    return forecastData
}

// Renders the forecast data to the page
function renderForecastData(forecastData) {
    const condition = forecastData.current.condition.text
    document.getElementById("condition").innerHTML = condition

    const uv_index = forecastData.current.uv
    document.getElementById("uv_index").innerHTML = uv_index
    
    const maxtempC = forecastData.forecast.forecastday[0].day.maxtemp_c
    document.getElementById("maxtemp_c").innerHTML = maxtempC

    const maxtempF = forecastData.forecast.forecastday[0].day.maxtemp_f
    document.getElementById("maxtemp_f").innerHTML = maxtempF
    
    const mintempC = forecastData.forecast.forecastday[0].day.mintemp_c
    document.getElementById("mintemp_c").innerHTML = mintempC

    const mintempF = forecastData.forecast.forecastday[0].day.mintemp_f
    document.getElementById("mintemp_f").innerHTML = mintempF
    
    const avgtempC = forecastData.forecast.forecastday[0].day.avgtemp_c
    document.getElementById("avgtemp_c").innerHTML = avgtempC
    
    const avgtempF = forecastData.forecast.forecastday[0].day.avgtemp_f
    document.getElementById("avgtemp_f").innerHTML = avgtempF

    const sunrise = forecastData.forecast.forecastday[0].astro.sunrise
    document.getElementById("sunrise").innerHTML = sunrise
    
    const sunset = forecastData.forecast.forecastday[0].astro.sunset
    document.getElementById("sunset").innerHTML = sunset

    };
    

/******* ASTRONOMY *******/
// Get astronomy data from API
function fetchAstronomyData() {
    const astronomyURL = "http://api.weatherapi.com/v1/astronomy.json?key=" + API_Key;
    fetch(astronomyURL)
    return []
}

/******* REMOVE *******/
// Removes the weather data from page
const onResetClick = async () => {
    const spanElements = document.querySelectorAll("span");
    spanElements.forEach(span => {
        span.innerHTML = "";
    });
    document.getElementById("location").value = "";
    document.getElementById("locationDisplay").textContent = ""
}
