let city = document.querySelector('.search-input');
let btn = document.querySelector('.search-button');
let temp = document.querySelector('.temperature');
let hum = document.querySelector('.humidity');
let wind = document.querySelector('.wind-speed');
let country = document.querySelector('.country');
let sun = document.querySelector('.sun');

btn.addEventListener('click', function() {
    let cityName = city.value.trim();
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(cityName)}?unitGroup=metric&key=BQX8H7CHFMQNWPJE3HYDQK53A&contentType=json`, {
      method: "GET",
      headers: {}
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        let locationData = data.address;
        if (locationData) {

            let currentConditions = data.currentConditions;
            let temperature = parseFloat(currentConditions.temp);
            temp.textContent = `${temperature}°C`;
            hum.textContent = `${currentConditions.humidity}%`;
            wind.textContent = `${currentConditions.windspeed} km/h`;
            country.textContent = cityName;
            
            if (temperature <= 20) {
               sun.src = "cloud.svg";
            } else {
                sun.src = "sun.svg";
            }

        } else {
            temp.textContent = `N/A`;
            hum.textContent = `N/A`;
            wind.textContent = `N/A`;
            country.textContent = `N/A`;
            console.error('City not found');
        }
    })
    .catch(err => {
        console.error('Fetch error:', err);
        temp.textContent = `Error`;
        hum.textContent = `Error`;
        wind.textContent = `Error`;
    });
});
