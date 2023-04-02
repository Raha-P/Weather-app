        function changeCityTemp(response) {
            console.log(response);
            
            document.querySelector("#cityy").innerHTML = response.data.name;
            document.querySelector("#degreeNumber").innerHTML = Math.round(response.data.main.temp);
            document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
            document.querySelector("#humidity").innerHTML = response.data.main.humidity;
            document.querySelector("#firstweather").innerHTML = response.data.weather[0].main;
            document.querySelector("#icon").setAttribute("src", "http://openweathermap.org/img/wn/" +response.data.weather[0].icon+ "@2x.png");

            getforecast(response.data.coord);
        }

        function getforecast(coordinates){
            console.log(coordinates);
            let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
            let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
            axios.get(apiUrl).then(displayforecastforotherdays);
        }

        function formatday(timestamp) {
            let date = new Date (timestamp * 1000);
            let day = date.getDay();
            let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            return days[day];
        }


        function displayforecastforotherdays(response) {
             let forecast = response.data.daily;
 
             let forecastElement = document.querySelector("#otherdays");
 
             let forecastHTML = `<div class="row">`;
 
             forecast.forEach(function(forecastDay, index) {
                 if (index < 7 && index > 0) { 
                 forecastHTML = forecastHTML + `
                 <div class="col-2">
                     <div class="forcast-date">${formatday(forecastDay.dt)}</div>
                     <img
                     src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png";
                     alt=""
                     width="42"/>
                     <div class="forecast-temps">
                     <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span> <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
                     </div>
                 </div>`;}
                })
             forecastElement.innerHTML = forecastHTML;   
            }
        

        function defaultt(cityyy) {
            let apiKey = "8944afa6845bd7c413a687258d3211ef";
            let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityyy + "&appid=" + apiKey + "&units=metric";
            axios.get(apiUrl).then(changeCityTemp);
        }


        function changeCity(event) {
            event.preventDefault();
            let cityyy = document.querySelector("#searchinput").value;
            defaultt(cityyy);
        }


        function currentstatus1() {
            navigator.geolocation.getCurrentPosition(currentstatus);
        }

        function currentstatus(position) {
            let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            axios.get(url).then(changeCityTemp);
        }


        let now = new Date();
        let clock = document.querySelector("#clock");
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        if (minutes<10) {
            clock.innerHTML = hours + ":0" + minutes;}
            else {
                clock.innerHTML = hours + ":" + minutes;
            }


        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentday = days[now.getDay()];
        document.querySelector("#day").innerHTML = currentday;


        let searchbuttom = document.querySelector("#searchengine");
        searchbuttom.addEventListener("click", changeCity);

        let form = document.querySelector("#search-form");
        form.addEventListener("submit", changeCity);

        let currentsearchbuttom = document.querySelector("#currentsearchengine");
        currentsearchbuttom.addEventListener("click", currentstatus1);

        defaultt("tehran");
        
