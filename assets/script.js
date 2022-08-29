var appid = '692efab00ae66e9f48137e6ea4766fcd'
var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

var toJSON = function(response){
    return response.json();
}
var displayWeather = function(data){
    var h2El = document.createElement('h2')
    var pEl = document.createElement('p')
    h2El.textContent = city.name
    pEl.textContent = 'Temp: ' + data.current.temp
    document.body.appendChild(h2El)
    document.body.appendChild(pEl)

}
var getOneCallc = function(city){
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&//units=imperial&exclude=hourly,minutely`

    fetch(oneCall)
        .then(toJSON)
        .then(displayWeather)
}
var getGeo = function(locations){
    var city = locations[0]
    console.log('LAT', city.lat)
    console.log('LON', city.lon)
}