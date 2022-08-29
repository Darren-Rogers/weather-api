var searchEl = document.querySelector('#searchCity')
var appid = '692efab00ae66e9f48137e6ea4766fcd'
//var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

var toJSON = function(response){
    return response.json();
}
var displayWeather = function(data){
    console.log(data)
    var currentWeatherEl = document.querySelector('#currentWeather')
    var h2El = document.createElement('h2')
    var pEl = document.createElement('p')
    h2El.textContent = data.name
    pEl.textContent = 'Temp: ' + data.current.temp
    currentWeatherEl.appendChild(h2El)
    currentWeatherEl.appendChild(pEl)

}
var getOneCall = function(city){
    var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&//units=imperial&exclude=hourly,minutely`

    fetch(oneCall)
    .then(toJSON)
    .then(displayWeather)
}
var getGeo = function(locations){
    var city = locations[0]
    console.log('LAT', city.lat)
    console.log('LON', city.lon)

    getOneCall(city)
}
var handler = function(event){
    event.preventDefault
    var q = document.querySelector('#input').value
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(geoURL)
    .then(toJSON)
    .then(getGeo)

}

searchEl.addEventListener('click', handler)