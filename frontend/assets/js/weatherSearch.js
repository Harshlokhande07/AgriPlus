var WEATHER_API_KEY = '7e0eeede72c8e498f570564aee6b3835';

function quickCity(city) {
  document.getElementById('city-search-input').value = city;
  searchCityWeather();
}

async function searchCityWeather() {
  const city = document.getElementById('city-search-input').value.trim();
  if (!city) {
    showWeatherError('Please enter a city name.');
    return;
  }

  const resultEl = document.getElementById('city-weather-result');
  const forecastEl = document.getElementById('city-forecast-result');

  if (!resultEl || !forecastEl) {
    console.error('Weather result elements not found');
    return;
  }

  resultEl.style.display = 'block';
  resultEl.innerHTML = '<div class="loading-spinner" style="text-align:center; padding:40px; color:#666;">⏳ Fetching weather data for ' + city + '...</div>';
  forecastEl.style.display = 'none';

  try {
    // Current weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!weatherRes.ok) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    
    const weather = await weatherRes.json();

    // 5-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecast = await forecastRes.json();

    // Render current weather
    const weatherHTML = `
      <div class="city-weather-card">
        <div class="city-weather-header">
          <div>
            <h3>${weather.name}, ${weather.sys.country}</h3>
            <p class="weather-description">${weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</p>
          </div>
          <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="weather icon" style="width: 80px; height: 80px;" />
        </div>
        <div class="city-weather-metrics">
          <div class="metric-chip">
            <span style="font-size: 18px;">🌡️</span>
            <strong>${Math.round(weather.main.temp)}°C</strong>
            <span>Temperature</span>
          </div>
          <div class="metric-chip">
            <span style="font-size: 18px;">🤔</span>
            <strong>${Math.round(weather.main.feels_like)}°C</strong>
            <span>Feels Like</span>
          </div>
          <div class="metric-chip">
            <span style="font-size: 18px;">💧</span>
            <strong>${weather.main.humidity}%</strong>
            <span>Humidity</span>
          </div>
          <div class="metric-chip">
            <span style="font-size: 18px;">💨</span>
            <strong>${weather.wind.speed} m/s</strong>
            <span>Wind Speed</span>
          </div>
          <div class="metric-chip">
            <span style="font-size: 18px;">🔽</span>
            <strong>${weather.main.pressure} hPa</strong>
            <span>Pressure</span>
          </div>
          <div class="metric-chip">
            <span style="font-size: 18px;">👁️</span>
            <strong>${(weather.visibility / 1000).toFixed(1)} km</strong>
            <span>Visibility</span>
          </div>
        </div>
        <div class="city-weather-extras">
          <span>🌅 Sunrise: ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}</span>
          <span>🌇 Sunset: ${new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}</span>
          <span>☁️ Cloud Cover: ${weather.clouds.all}%</span>
        </div>
      </div>
    `;

    resultEl.innerHTML = weatherHTML;
    resultEl.style.display = 'block';

    // Render 5-day forecast
    const dailyForecasts = forecast.list.filter(f => f.dt_txt.includes('12:00:00')).slice(0, 5);
    
    if (dailyForecasts.length > 0) {
      const forecastHTML = `
        <h4 style="margin-bottom:12px; color: #2c3e50; font-weight: 600;">📅 5-Day Forecast</h4>
        <div class="forecast-grid">
          ${dailyForecasts.map(f => `
            <div class="forecast-card">
              <span class="forecast-day">${new Date(f.dt * 1000).toLocaleDateString('en-IN', {weekday:'short', month:'short', day:'numeric'})}</span>
              <img src="https://openweathermap.org/img/wn/${f.weather[0].icon}.png" alt="${f.weather[0].description}" style="width: 40px; height: 40px;" />
              <span class="forecast-temp">${Math.round(f.main.temp_max)}° / ${Math.round(f.main.temp_min)}°</span>
              <span class="forecast-desc">${f.weather[0].main}</span>
              <span class="forecast-rain">💧 ${f.main.humidity}%</span>
            </div>
          `).join('')}
        </div>
      `;
      forecastEl.innerHTML = forecastHTML;
      forecastEl.style.display = 'block';
    }

    // Agricultural advisory
    const advisory = generateWeatherAdvisory(weather);
    const advisoryHTML = `
      <div class="weather-advisory" style="background: #f0fdf4; border-left: 4px solid #2ecc71; padding: 16px; border-radius: 8px; margin-top: 16px;">
        <h4 style="color: #2c3e50; margin-bottom: 12px;">🌾 Agricultural Advisory for ${weather.name}</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${advisory.map(a => `<li style="padding: 6px 0; color: #555;">${a}</li>`).join('')}
        </ul>
      </div>
    `;
    resultEl.innerHTML += advisoryHTML;

  } catch (err) {
    resultEl.innerHTML = `
      <div class="error-box" style="background: #fef2f2; border-left: 4px solid #e74c3c; padding: 16px; border-radius: 8px; color: #991b1b;">
        <strong>❌ Error:</strong> ${err.message}
      </div>
    `;
    console.error('Weather search error:', err);
  }
}

function generateWeatherAdvisory(weather) {
  const advisories = [];
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const description = weather.weather[0].main.toLowerCase();

  if (temp > 35) advisories.push('🚨 High heat alert — water crops early morning or late evening to reduce evaporation.');
  else if (temp < 10) advisories.push('❄️ Cold temperature — protect sensitive crops with mulching or frost covers.');
  else advisories.push('✅ Temperature is suitable for most field operations.');

  if (humidity > 80) advisories.push('⚠️ High humidity — monitor for fungal diseases (blight, rust). Avoid overhead irrigation.');
  else if (humidity < 30) advisories.push('💧 Low humidity — increase irrigation frequency. Consider drip irrigation.');
  else advisories.push('✅ Humidity levels are comfortable for crops.');

  if (wind > 10) advisories.push('💨 Strong winds — avoid pesticide/fertilizer spraying to prevent drift.');
  else advisories.push('✅ Wind speed is safe for spraying operations.');

  if (description.includes('rain') || description.includes('drizzle')) {
    advisories.push('🌧️ Rain expected — delay irrigation and hold off on fertilizer application to avoid runoff.');
  }
  if (description.includes('clear')) {
    advisories.push('☀️ Clear skies — good conditions for harvesting and field operations.');
  }
  if (description.includes('storm') || description.includes('thunder')) {
    advisories.push('⛈️ Storm warning — secure crops and farm equipment. Postpone all field work.');
  }

  return advisories;
}

function showWeatherError(message) {
  const resultEl = document.getElementById('city-weather-result');
  const forecastEl = document.getElementById('city-forecast-result');
  if (resultEl) {
    resultEl.innerHTML = `<div style="color:#dc2626;padding:16px;background:#fee2e2;border:1px solid #fecaca;border-radius:8px;">
      <strong>❌ Weather Search Error:</strong><br>${message}
    </div>`;
    resultEl.style.display = 'block';
  }
  if (forecastEl) {
    forecastEl.style.display = 'none';
  }
}
