//store the html elements in Javascript variables
const cityNameEl = document.getElementById('city-name');
const iconEl = document.getElementById('currentIcon');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
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
const API_Key = '3cd8d6b957b74b7758a739ae8140bcd1'
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_Key}`
fetch(API_URL).then(result=>result.json()).then(result=>{
    console.log(result)////we will pass the result to the updateWeather function 
    const list=result.list 
    const currentDay= list[0]    /// 0-40
    const temperature =currentDay.main.temp    
    console.log("temperature",  temperature)
    const humidity = currentDay.main.humidity
    const windSpeed = currentDay.wind.speed
    updateWeather("London", "", temperature, humidity, windSpeed)
    })
