const baseAPIurl = 'https://api.openweathermap.org/data/2.5/weather';
const APPID = 'be9d2efb9e81f7e5ad2446bcc5ebad2a';

// DOM Elements
const locationInput = document.getElementById('locationInput');
const addLocationButton = document.getElementById('addLocation');
const weatherList = document.getElementById('weatherList');

// Fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
    const APIurl = `${baseAPIurl}?q=${encodeURI(city)}&units=metric&APPID=${APPID}`;
    try {
        const response = await fetch(APIurl);
        
        if (response.status === 200) {
            const body = await response.json();
            const temperatures = {
                temp: body.main.temp,
                minTemp: body.main.temp_min,
                maxTemp: body.main.temp_max
            };
            return temperatures;
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}


function renderWeather(location, temp, tempMin, tempMax) {
    const weatherItem = document.createElement('div');
    weatherItem.classList.add('flex', 'justify-between', 'items-center', 'bg-blue-100', 'p-4', 'rounded-lg');

    weatherItem.innerHTML = `
        <div>
            <h2 class="font-bold">${location}</h2>
            <p>Temp: ${temp}°C</p>
            <p>Low: ${tempMin}°C</p>
            <p>High: ${tempMax}°C</p>
        </div>
        <button class="deleteButton bg-red-500 text-white p-2 rounded-full">🗑️</button>
    `;

    const deleteButton = weatherItem.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        weatherList.removeChild(weatherItem);
    });

    weatherList.appendChild(weatherItem);
}


addLocationButton.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    if (location === '') {
        alert('Please enter a location');
        return;
    }

    const weatherData = await getWeatherData(location);
    if (weatherData) {
        renderWeather(location, weatherData.temp, weatherData.minTemp, weatherData.maxTemp);
        locationInput.value = ''; // Clear input field
    }
});

async function main() {
    const city = '';
    const weatherData = await getWeatherData(city);

    if (weatherData) {
        console.log({
            city,
            ...weatherData
        });
    }
}

main();
