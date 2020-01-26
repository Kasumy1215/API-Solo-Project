'use strict';

//get location, latitude geolocation
navigator.geolocation.getCurrentPosition(success, fail);

function success(pos) {
    // console.log('Your current position is:');
    // console.log(`Latitude : ${pos.coords.latitude}`);
    // console.log(`Longitude: ${pos.coords.longitude}`);
    request(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
    alert('Failed to get your position.'+ error.code);
}

function utcToJSTime(utcTime) {
    return utcTime * 1000;
}

//retrive API data from Open Weather
function request(lat, long) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = 'f94ae8aac9535a7624f3522d00c91446';

    $.ajax({
        url: url,
        data: {
            appid: appId,
            lat: lat,
            lon: long,
            units: 'metric',
            lang: 'en'
        }
    })
    .done(function(data) {
        const today = new Date();
        const year = today.getFullYear();
        const mon = today.getMonth();
        const month = ["Jan.","Feb.","March","Apr.","May","June","July","Aug.","Sep.","Oct.","Nov.","Dec."];
        const day = today.getDate();
        document.getElementById("place").innerText= `You are ${data.city.name}, ${data.city.country} now.`;
        document.getElementById("today").innerText= `Today is ${month[mon]} ${day}, ${year}`;
        data.list.forEach(function(forecast, idx) {
            const avrgTemperature = Math.round(forecast.main.temp);
            const minTemperature = Math.round(forecast.main.temp_min);
            const maxTemperature = Math.round(forecast.main.temp_max);
            const description = forecast.weather[0].description;
            if(idx === 0){
            //Today's weather
                const currentWeather = `
                    <div class="info">
                        <p>Today's weather is,<br>
                            <span class="description">     Current Weather ：${description}</span><br>
                            <span class="avrg_temp">     Average Temperture : ${avrgTemperature}</span>°C<br>
                            <span class="min_temp">     Minimum Temperture : ${minTemperature}</span>°C<br>
                            <span class="max_temp">     Maximum Temperture : ${maxTemperature}</span>°C<br>
                        </p>
                    </div>`;
                $('#weather').html(currentWeather);
            } else {
            //tomorrow's weather ---> doesn't work
            const weatherForecast = ``;
                $('#forecast').html(weatherForecast);
            }
        });
    })
    .fail(function() {
        console.log('Failed!');
    })
}
