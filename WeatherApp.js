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
// This is kind of the "start" button, it calls multiple functions when the "Add Location" button is clicked
// It displays the location above the data
// It fetches the data from the API for weather and forecast
// It then displays (renders) the data on the page
const onAddLocationClick = async (event) => {
    console.log(event)
    event.preventDefault()
    const locationDisplay = document.getElementById("locationDisplay");
    locationDisplay.textContent = document.getElementById("location").value;
    const weatherData = await fetchCurrentWeatherData();
    renderCurrentWeatherData(weatherData);
    const forecastData = await fetchForecastData();
    renderForecastData(forecastData);
    saveLocation();
}

// This creates an entry for each location on the db.json file
async function saveLocation() {
    const location = document.getElementById("location").value
    const response = await fetch('http://localhost:3000/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {location: location} )
    })
    const newlySavedLocation = await response.json()
    

    // after creating on the db.json file, this creates a pill element to show the previous locations added
    const newPill = document.createElement('span');
    newPill.classList.add("badge");
    newPill.classList.add("rounded-pill");
    newPill.classList.add("text-bg-primary");
    newPill.classList.add("ps-2");
    newPill.textContent = location;
    newPill.setAttribute("id", newlySavedLocation.id);

    // put newly created pill into container element to display
    document.getElementById("pill-container").appendChild(newPill);

};

const pillContainer = document.getElementById("pill-container");

// sets doubleclick event to delete the pill object from db.json file and DOM
pillContainer.addEventListener("dblclick", function(event) {
    const pillId = event.target.getAttribute("id") // finding the correct element to delete by the ID generated when added to db.json file
    if (pillId) {
        // sends request to delete to db.json file
        fetch(`http://localhost:3000/locations/${pillId}`, {
            method: 'DELETE',
        })
    }
    // removes pill element from DOM and page
    event.target.remove()
})


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

/******* REMOVE *******/
// Removes the weather data from page when reset button is clicked
const onResetClick = async () => {
    const spanElements = document.querySelectorAll("li span");
    spanElements.forEach(span => {
        span.innerHTML = "";
    });
    document.getElementById("location").value = "";
    document.getElementById("locationDisplay").textContent = ""
}
