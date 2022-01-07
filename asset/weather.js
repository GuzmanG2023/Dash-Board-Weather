// 5baede73a6126a44134a0eac8264a010

var searchButton = document.querySelector(".search-button");
var searchHistory = []

var callingIt = function(city) {
    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=5baede73a6126a44134a0eac8264a010"
    fetch (url)
    .then (function (response){
        if (response.ok){
            response.json () .then(function (data) {
                var lat = data[0].lat
                var lon = data[0].lon
                weatherData(city, lat, lon)
            })
        } else {
            alert ("error on data")
        }
    })
    .catch (function (error) {
        alert ("not a good connection")
    })
}

var weatherData = function(city, lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat +"&lon=" +lon+ "&units=imperial"+"&exclude=hourly,minutely,current,alerts&appid=5baede73a6126a44134a0eac8264a010"
    fetch (url)
    .then (function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                //var tempDay0 = data.daily[0].temp.day;
                //getting Data here
                var tempDay = []
                var windDay = []
                var humid = []
                var dates = []
                var icons = []
                var uvi = data.daily[0].uvi
                var uviColor = "green"
                console.log (uvi)
                if (uvi < 3 ){
                    uviColor = "green"
                }
                else if (uvi >= 0 && uvi <= 7){
                    uviColor = "yellow"
                }
                else {
                    uviColor = "red"
                }
                for (var i = 0; i < 6; i++){
                    tempDay.push(data.daily[i].temp.day)
                    windDay.push(data.daily[i].wind_speed)
                    humid.push(data.daily[i].humidity)
                    dates.push(new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US"))
                    icons.push(data.daily[i].weather[0].icon)
                }

                console.log(tempDay, windDay, humid, dates, icons, uvi, uviColor)

                var todayCity = document.querySelector(".todaycityname")
                todayCity.textContent = city + " " + dates[0]
                var todayIcon = document.querySelector(".todayicon")
                todayIcon.src = "http://openweathermap.org/img/wn/" + icons [0] + "@2x.png"
                var todayTemp  = document.querySelector(".todaytemp")
                todayTemp.textContent = "Temp " + tempDay[0] 
                var todayWind = document.querySelector(".todaywind")
                todayWind.textContent = "Wind Speed " + windDay[0]
                var todayHumidity = document.querySelector(".todayhumidity")
                todayHumidity.textContent = "Humidity " + humid [0]
                var todayUv = document.querySelector(".todayuv")
                todayUv.textContent = "UV " + uvi
                todayUv.style.backgroundColor = uviColor
                todayUv.style.display = "inline-block"
                for (var i = 2; i < 7; i++) {
                    var date = document.querySelector(".date" + i)
                    date.textContent = dates [i - 1]
                    var img = document.querySelector(".icon" + i)
                    img.src = "http://openweathermap.org/img/wn/" + icons [i - 1] + "@2x.png"
                    var temp = document.querySelector(".temp" + i)
                    temp.textContent = "Temp " + tempDay [i - 1]
                    var wind = document.querySelector(".wind" + i)
                    wind.textContent = "Wind Speed " + windDay [i - 1]
                    var humidity = document.querySelector(".humid" + i)
                    humidity.textContent = "Humidity " + humid [i - 1]
                }
            })
        } else {
            alert ("data error")
        }
    })
    .catch (function (error){
        alert ("bad connection")
    })
}

function addToSearchHistory (city) {
    searchHistory.push(city)
    localStorage.setItem ("search", JSON.stringify(searchHistory))
    displaySearchHistory ()
}

function loadSearchHistory () {
    var history = localStorage.getItem ("search")
    if (history) {
        searchHistory = JSON.parse(history)
    }
    displaySearchHistory ()
}
function displaySearchHistory () {
    var historyData = document.querySelector(".historydata")
    historyData.textContent = ""
    var dataString = ""
    for (var i = 0; i < searchHistory.length; i++) {
        dataString += searchHistory[i] + "\n"
    }
    historyData.textContent = dataString
}


searchButton.addEventListener ("click", function(event) {
    var inputElement = document.querySelector(".city")
    callingIt(inputElement.value)
    addToSearchHistory (inputElement.value)
})
loadSearchHistory ()