//store the html elements in Javascript variables
const cityNameEl = document.getElementById('city-name');
const iconEl = document.getElementById('currentIcon');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const cityNameInput = document.getElementById('cityName');
const searchButton = document.getElementById('search-button');
const citiesListEl = document.getElementById("city-list");


//define a function that changes the UI elements
function updateWeather (cityName, icon, temperature, humidity, windSpeed) {
    cityNameEl.innerText = cityName
    temperatureEl.innerText = temperature
    humidityEl.innerText = humidity
    windSpeedEl.innerText = windSpeed
    iconEl.src = icon
}

// updateWeather("New York", "", 100, 10, 20)
//my key c944d55ec25c64eb0faa7c441e510230
function fetchData (cityName) {
const API_Key = 'c944d55ec25c64eb0faa7c441e510230'
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_Key}&units=metric`
fetch(API_URL).then(result=>result.json()).then(result=>{
    console.log(result)////we will pass the result to the updateWeather function 
    const list=result.list 
    const isFahrenheit = result.city.country == "US"
    const currentDay= list[0]    /// 0-40
    let temperature =currentDay.main.temp
    if (isFahrenheit) {
        temperature = convertCToF(temperature)
    }
    console.log("temperature",  temperature)
    const humidity = currentDay.main.humidity
    const windSpeed = currentDay.wind.speed
    const iconCode = currentDay.weather[0].icon
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    updateWeather(cityName, iconURL, temperature, humidity, windSpeed)
    updateWeatherCard(document.querySelector(".card1"), list[7], 1, isFahrenheit)
    updateWeatherCard(document.querySelector(".card2"), list[15], 2, isFahrenheit)
    updateWeatherCard(document.querySelector(".card3"), list[23], 3, isFahrenheit)
    updateWeatherCard(document.querySelector(".card4"), list[31], 4, isFahrenheit)
    updateWeatherCard(document.querySelector(".card5"), list[39], 5, isFahrenheit)
    })
}
searchButton.addEventListener('click', searchForCity)

function searchForCity() {
    const cityName = cityNameInput.value
    fetchData(cityName)
    //add city to local storage
    /*
    let storage = window.localStorage.getItem("history")
    if (storage == undefined) {
        storage = {}
    } else {
        storage = JSON.parse(storage)
    }
    const cityName = cityNameInput.value
    console.log(storage)
    storage [cityName] = true
    storage = JSON.stringify(storage)
    window.localStorage.setItem("history", storage)
    */
    
    let storage = window.localStorage.getItem("history")
    if (storage == undefined) {
        storage = ""
    } 
    let citiesList = storage.split("-")
    if (citiesList.includes (cityName)) return
     storage +="-"+cityName
    window.localStorage.setItem("history", storage)
    loadStorage()
}

function loadStorage() {
    let storage = window.localStorage.getItem("history")
    if (storage == undefined) return
    let citiesList = storage.split("-")
    citiesList.shift()
    console.log(citiesList)
    citiesListEl.innerHTML = ""
    for (let city of citiesList) {
        const liEl = document.createElement("li")
        liEl.innerText = city
        liEl.addEventListener('click', function() {
            fetchData(city)
        })
        citiesListEl.appendChild(liEl)
    }
}
loadStorage()
function updateWeatherCard(cardEl, day, dayNumber, isFahrenheit) {
    let temperature =day.main.temp    
    if (isFahrenheit) {
        temperature = convertCToF(temperature)
    }
    const humidity = day.main.humidity
    const windSpeed = day.wind.speed
    const iconCode = day.weather[0].icon
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    let htmlCode = `<div class="card">
    <div class="card-header">
        <span>Day ${dayNumber} </span>
        <img src=${iconURL} alt="" width=30px>
    </div>
    <div>
        <span>Temperature:</span>
        <span class="current-info">${temperature}</span>
    </div>
    <div>
        <span>Humidity:</span>
        <span class="current-info">${humidity}</span>
    </div>
    <div>
        <span>Wind Speed:</span>
        <span class="current-info">${windSpeed}</span>
    </div>
</div>`
    cardEl.innerHTML = htmlCode
}

function convertCToF(celsius) {
    return (celsius * 9/5) + 32;
  }