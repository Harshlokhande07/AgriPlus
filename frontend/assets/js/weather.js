// weather.js - Weather data fetching for the farm location
var WEATHER_API_KEY = '7e0eeede72c8e498f570564aee6b3835';

function fetchWeatherData(lat, lng, city = null) {
  let url = '';
  if (lat && lng) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`;
  } else {
    const farmer = window.auth ? window.auth.getCurrentFarmer() : null;
    const location = city || (farmer && farmer.location ? farmer.location.split(',')[0] : 'Nagpur');
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayWeatherOnDashboard(data);
      // Sync analytics if it exists
      if (window.updateAnalyticsWeather && lat && lng) {
        window.updateAnalyticsWeather(lat, lng, null);
      }
    })
    .catch(err => console.error('Weather fetch error:', err));
}

// Auto-initialize weather on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => fetchWeatherData(), 500);
});

function displayWeatherOnDashboard(data) {
  const weatherEl = document.getElementById('weather-display');
  if (!weatherEl) return;
  
  weatherEl.innerHTML = `
    <div class="weather-card">
      <h3>${data.name}</h3>
      <div class="weather-main">
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather" />
      </div>
      <div class="weather-details">
        <span>💧 Humidity: ${data.main.humidity}%</span>
        <span>💨 Wind: ${data.wind.speed} m/s</span>
        <span>🔽 Pressure: ${data.main.pressure} hPa</span>
      </div>
      <p class="weather-desc">${data.weather[0].description}</p>
    </div>
  `;
}
