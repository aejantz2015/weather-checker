var apiKey = '6f15fc02723e10e4be2900b03fcb8415'
var searchButton = document.getElementById("searchButton")
var cityInput = document.getElementById("citySearch")
var cityName = document.getElementById("nameCity")
var currentDay = document.getElementById("currentDate")
var weatherIcon = document.getElementById("weatherIcon")
var todayTemp = document.getElementById("todayTemp")
var todayHumid = document.getElementById("todayHumid")
var todayWind = document.getElementById("todayWind")
var forcast = document.getElementById("forcast")

function citySearch() {
    var cityName = cityInput.value
    getWeatherData(cityName)
}
function getWeatherData(cityName) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            console.log(currentData)
            displayCurrentData(currentData)
        })
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(function (response) {
            return response.json()
        })
        .then(function (forcastData) {
            console.log(forcastData)
            displayForcastData(forcastData)
        })

}
function displayForcastData(forcastData){
    forcast.textContent=""
    for (var i=4; i < forcastData.list.length; i = i+8){
        forcast.innerHTML+=`<div class="col-sm-2 card-body bg-danger text-white mb-3">
        <p class="card-title font-weight-bold" id="dayOne">${dayjs.unix(forcastData.list[i].dt).format("MM/DD/YYYY")}</p>
        <p class="card-text" style="height: 75px">
        <p class="card-text">Temperature:
            <span id="tempOne">--</span>
        </p>
        <p class="card-text">Humidity:
            <span id="humidityOne">--</span>
        </p>
    </div>`
    }
}
function displayCurrentData(currentData){
    cityName.textContent = currentData.name
    currentDay.textContent = dayjs.unix(currentData.dt).format("MM/DD/YYYY")
    weatherIcon.src=`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`
    todayTemp.textContent = currentData.main.temp
    todayHumid.textContent = currentData.main.humidity
    todayWind.textContent = currentData.wind.speed
}

searchButton.addEventListener("click", citySearch)

