
function getWeather() {
            const apiKey = '596e7f20281c08ad502090c3419feaf1';
            const city = document.getElementById('city').value;

            if (!city) {
                alert('Please enter a city or check your spelling');
                return;
            }

            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            fetch(currentWeatherUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching current weather data:', error);
                    alert('Error fetching current weather data. Please try again.');
                });
        }

        function displayWeather(data) {
            const tempDivInfo = document.getElementById('temp-div');
            const weatherInfoDiv = document.getElementById('weather-info');
            const weatherIcon = document.getElementById('weather-icon');

            // Clear previous content
            weatherInfoDiv.innerHTML = '';
            tempDivInfo.innerHTML = '';

            if (data.cod === '404') {
                weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
            } else {
                const cityName = data.name;
                const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
                const description = data.weather[0].description;
                const pressure = data.main.pressure; // Pressure in hPa
                const humidity = data.main.humidity; // Humidity in %
                const windSpeed = data.wind.speed; // Wind speed in m/s
                const windDirection = data.wind.deg; // Wind direction in degrees
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

                const temperatureHTML = `<p>${temperature}°C</p>`;

                const weatherHtml = `
                    <p><strong>City:</strong> ${cityName}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Pressure:</strong> ${pressure} hPa</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                    <p><strong>Wind Direction:</strong> ${windDirection}°</p>
                `;

                tempDivInfo.innerHTML = temperatureHTML;
                weatherInfoDiv.innerHTML = weatherHtml;
                weatherIcon.src = iconUrl;
                weatherIcon.alt = description;

                showImage();
            }
        }

        function showImage() {
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
        }