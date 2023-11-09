$(document).ready(function () {
    // Add click event listener for the "Search" button
    $("#submitCity").click(function () {
        getWeather();
    });

    // Add click event listener for the "Get Weather for Current Location" button
    $("#getCurrentLocation").click(function () {
        getWeatherByLocation();
    });

    // Call the showResults function with sample data (replace with your API response)
    showResults(); // This line is optional if you want to display initial weather data.
});

function getWeather() {
    var city = $("#city").val();

    if (city != '') {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=0f5823b60f56f54161db530643a59b95",
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.cod === 200) {
                    // Location found, display weather information
                    var widget = showResults(data)
                    $("#showWeather").html(widget);
                    $("#city").val('');
                    $("#error").html(''); // Clear any previous error messages
                } else {
                    // Handle any non-200 status codes with a generic error message
                    $("#showWeather").html('');
                    $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Failed to fetch weather data. Please try again later or check the city name.</div>");
                }
            },
            error: function (error) {
                // Handle API request errors
                console.error('Error fetching weather data:', error);
                $("#showWeather").html('');
                $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Failed to fetch weather data. Please try again later.</div>");
            }
        });
    } else {
        // City field is empty, display an error message
        $("#showWeather").html('');
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
}




// Function to get weather data by current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0f5823b60f56f54161db530643a59b95`,
                type: "GET",
                dataType: "json", // Change this to "json"
                success: function (data) {
                    var widget = showResults(data);
                    $("#showWeather").html(widget);
                },
                error: function (error) {
                    console.error('Error fetching weather data:', error);
                }
            });
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Rest of your code (toggleTemperatureUnit and showResults functions) remain the same.


// Rest of your code (toggleTemperatureUnit and showResults functions) remain the same.


function getWeather(){
    var city = $("#city").val();
    
    if(city != ''){
        
        $.ajax({
           url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=0f5823b60f56f54161db530643a59b95",
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                var widget = showResults(data)
                
                
                $("#showWeather").html(widget);
                
                $("#city").val('');
            }
            
        });
        
        
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
    
    
}





function toggleTemperatureUnit() {
    const temperatureElement = document.getElementById('temperature');
    const currentUnit = temperatureElement.dataset.unit;

    if (currentUnit === 'celsius') {
        // Convert to Fahrenheit
        const temperatureCelsius = parseFloat(temperatureElement.textContent);
        const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
        temperatureElement.textContent = temperatureFahrenheit.toFixed(2) + " °F";
        temperatureElement.dataset.unit = 'fahrenheit';
    } else {
        // Convert to Celsius
        const temperatureFahrenheit = parseFloat(temperatureElement.textContent);
        const temperatureCelsius = (temperatureFahrenheit - 32) * 5/9;
        temperatureElement.textContent = temperatureCelsius.toFixed(2) + " °C";
        temperatureElement.dataset.unit = 'celsius';
    }
}

// Function to display weather information
function showResults(data) {
    const weatherInfoElement = document.getElementById('weather-info');
    
    // Construct the HTML for weather information
    const html = `
        <h2 style="font-weight:bold; font-size:30px; padding-top:20px;" class="text-center">Current Weather for ${data.name}, ${data.sys.country}</h2>
        <h3 style='padding-left:40px;'><strong>Weather</strong>: ${data.weather[0].main}</h3>
        <h3 style='padding-left:40px;'><strong>Description</strong>:<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'> ${data.weather[0].description}</h3>
        <h3 style='padding-left:40px;'><strong>Temperature</strong>: <span id='temperature' data-unit='celsius'>${data.main.temp.toFixed(2)} °C</span></h3>
        <h3 style='padding-left:40px;'><strong>Pressure</strong>: ${data.main.pressure} hpa</h3>
        <h3 style='padding-left:40px;'><strong>Humidity</strong>: ${data.main.humidity}%</h3>
        <h3 style='padding-left:40px;'><strong>Min Temperature</strong>: ${data.main.temp_min.toFixed(2)} °C</h3>
        <h3 style='padding-left:40px;'><strong>Max Temperature</strong>: ${data.main.temp_max.toFixed(2)} °C</h3>
        <h3 style='padding-left:40px;'><strong>Wind Speed</strong>: ${data.wind.speed}m/s</h3>
        <h3 style='padding-left:40px; padding-bottom:30px;'><strong>Wind Direction</strong>: ${data.wind.deg}°</h3>
    `;

    // Set the HTML content of the weather-info element
    weatherInfoElement.innerHTML = html;

    // Add a click event listener to the temperature element
    const temperatureElement = document.getElementById('temperature');
    temperatureElement.addEventListener('click', toggleTemperatureUnit);
}

// Call the showResults function with sample data (replace with your API response)
showResults();