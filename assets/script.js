var searchEl = document.querySelector('#searchCity')
var buttons = document.querySelector('#pastSearch')
var fiveDays = document.querySelector('#fiveDayForecast')
var currentWeather = document.querySelector('#currentWeather')
var appid = '692efab00ae66e9f48137e6ea4766fcd'

var toJSON = function(response){
    return response.json();
}
var displayWeather = function(data, city){
    console.log(data)
    var currentWeatherEl = document.querySelector('#currentWeather')
    var h2El = document.createElement('h2')
    var pEl = document.createElement('p')
    var humidityEl = document.createElement('p')
    var windEl = document.createElement('p')
    var uviEl = document.createElement('p')
    h2El.textContent = city.name
    pEl.textContent = 'Temperature: ' + data.current.temp
    humidityEl.textContent = 'Humidity: '+data.daily[0].humidity
    windEl.textContent = 'Wind Speed: '+data.daily[0].wind_speed
    uviEl.textContent = 'UV Index: '+data.daily[0].uvi
    currentWeatherEl.appendChild(h2El)
    currentWeatherEl.appendChild(pEl)
    currentWeatherEl.appendChild(humidityEl)
    currentWeatherEl.appendChild(windEl)
    currentWeatherEl.appendChild(uviEl)

    var fiveDayForecast = data.daily.slice(1,6);
    fiveDays.innerHTML = null
    for(var day of fiveDayForecast){
        console.log('Day', day)
        var dates = new Date(day.dt *1000).toLocaleDateString();
        var temps = day.temp.day
        var icon = day.weather[0].icon
        var collumn = document.createElement('div')
        var card = document.createElement('div')
        var date = document.createElement('p')
        date.textContent = dates
        var temp = document.createElement('p')
        temp.textContent= 'Temp: '+ temps
        var imgEl = document.createElement('img')
        imgEl.alt = icon
        imgEl.src =  'http://openweathermap.org/img/wn/'+icon+'@2x.png'
        collumn.className = 'col-12 col-md'
        card.className = 'card p-3 m-3'
        fiveDays.appendChild(collumn)
        collumn.appendChild(card)
        card.appendChild(date)
        card.appendChild(imgEl)
        card.appendChild(temp)
    }
}
var displayBtn = function(cities){
    var citySaved = JSON.parse(localStorage.getItem('cities')) || [];
    buttons.innerHTML = null
    currentWeather.innerHTML= null
    for(var city of citySaved){
        var btnEl = document.createElement('button')
        btnEl.textContent = city
        btnEl.className ='btn btn-primary m-2'
        buttons.appendChild(btnEl)
        
    }
}
var getOneCall = function(city){
    var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`

    fetch(oneCall)
        .then(toJSON)
        .then(function(data){
            displayWeather(data, city);
        })
}
var toLocalStorage = function(city){
    var citySaved = JSON.parse(localStorage.getItem('cities')) || [];
    citySaved.push(city)
    var saved = JSON.stringify(citySaved);
    localStorage.setItem('cities', saved)
    
}
var getGeo = function(locations){
    var city = locations[0]
    console.log('LAT', city.lat);
    console.log('LON', city.lon);
    toLocalStorage(city.name)
    getOneCall(city)
    displayBtn()
}
var handler = function(event){
    event.preventDefault()
    var q = document.querySelector('#input')
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appid}`;
    fetch(geoURL)
        .then(toJSON)
        .then(getGeo)

}
var handleCity = function(event){
    event.preventDefault()
    buttons.innerHTML = null

    if(event.target.matches('button')){
        var q = event.target.textContent
        var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
        fetch(geoURL)
            .then(toJSON)
            .then(getGeo)
    }
}
displayBtn()
searchEl.addEventListener('click', handler)
buttons.addEventListener('click', handleCity)