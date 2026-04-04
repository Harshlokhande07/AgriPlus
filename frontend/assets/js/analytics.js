// Analytics Dashboard - Charts and Data Visualizations

let charts = {};

/**
 * Initialize all charts
 */
function initializeCharts() {
  const farmer = getCurrentFarmer();
  if (!farmer) return;

  // Wait for Chart.js to load
  if (typeof Chart === 'undefined') {
    setTimeout(initializeCharts, 100);
    return;
  }

  // Initialize all charts
  createSoilCompositionChart();
  createCropDistributionChart();
  createYieldAnalyticsChart();
  createSeasonalTrendChart();
  createSoilHealthChart();
  createIrrigationChart();
}

/**
 * Pie Chart - Soil Composition
 */
function createSoilCompositionChart() {
  const ctx = document.getElementById('soilCompositionChart');
  if (!ctx || charts.soilComposition) return;

  charts.soilComposition = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Organic Matter'],
      datasets: [{
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(46, 204, 113, 0.7)',
          'rgba(52, 152, 219, 0.7)',
          'rgba(155, 89, 182, 0.7)',
          'rgba(230, 126, 34, 0.7)'
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(155, 89, 182, 1)',
          'rgba(230, 126, 34, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 15, font: { size: 12, weight: 600 } }
        },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', titleFont: { size: 13 } }
      }
    }
  });
}

/**
 * Pie Chart - Crop Distribution
 */
function createCropDistributionChart() {
  const ctx = document.getElementById('cropDistributionChart');
  if (!ctx || charts.cropDistribution) return;

  charts.cropDistribution = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Soybean', 'Cotton', 'Corn', 'Wheat'],
      datasets: [{
        data: [35, 30, 25, 10],
        backgroundColor: [
          'rgba(46, 204, 113, 0.7)',
          'rgba(241, 196, 15, 0.7)',
          'rgba(230, 126, 34, 0.7)',
          'rgba(155, 89, 182, 0.7)'
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(241, 196, 15, 1)',
          'rgba(230, 126, 34, 1)',
          'rgba(155, 89, 182, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right',
          labels: { padding: 15, font: { size: 12, weight: 600 } }
        }
      }
    }
  });
}

/**
 * Bar Chart - Yield Analytics
 */
function createYieldAnalyticsChart() {
  const ctx = document.getElementById('yieldAnalyticsChart');
  if (!ctx || charts.yieldAnalytics) return;

  charts.yieldAnalytics = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Expected Yield (tons)',
        data: [4.2, 4.5, 5.1, 5.8, 6.2, 6.5],
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'Actual Yield (tons)',
        data: [3.8, 4.2, 4.8, 5.5, 5.9, 6.1],
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { labels: { font: { size: 12 } } } },
      scales: {
        y: { beginAtZero: true, ticks: { font: { size: 11 } } },
        x: { ticks: { font: { size: 11 } } }
      }
    }
  });
}

/**
 * Line Chart - Seasonal Trends
 */
function createSeasonalTrendChart() {
  const ctx = document.getElementById('seasonalTrendChart');
  if (!ctx || charts.seasonalTrend) return;

  charts.seasonalTrend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Soil Moisture (%)',
        data: [45, 52, 58, 62, 68, 72],
        borderColor: 'rgba(52, 152, 219, 1)',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5
      },
      {
        label: 'Temperature (°C)',
        data: [20, 22, 24, 26, 28, 30],
        borderColor: 'rgba(230, 126, 34, 1)',
        backgroundColor: 'rgba(230, 126, 34, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: 'rgba(230, 126, 34, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { labels: { font: { size: 12 } } } },
      scales: {
        y: { beginAtZero: true, ticks: { font: { size: 11 } } },
        x: { ticks: { font: { size: 11 } } }
      }
    }
  });
}

/**
 * Gauge Chart - Soil Health Index
 */
function createSoilHealthChart() {
  const ctx = document.getElementById('soilHealthChart');
  if (!ctx || charts.soilHealth) return;

  const healthScore = 78; // Out of 100

  charts.soilHealth = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Healthy', 'Needs Care'],
      datasets: [{
        data: [healthScore, 100 - healthScore],
        backgroundColor: [
          'rgba(46, 204, 113, 0.8)',
          'rgba(220, 220, 220, 0.3)'
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(200, 200, 200, 0.5)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      circumference: 180,
      rotation: 270
    }
  });
}

/**
 * Bar Chart - Irrigation vs Rainfall
 */
function createIrrigationChart() {
  const ctx = document.getElementById('irrigationChart');
  if (!ctx || charts.irrigation) return;

  charts.irrigation = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [{
        label: 'Irrigation (mm)',
        data: [50, 60, 40, 30, 35, 45],
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2
      },
      {
        label: 'Rainfall (mm)',
        data: [20, 30, 60, 80, 70, 40],
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      plugins: { legend: { labels: { font: { size: 12 } } } },
      scales: {
        x: { beginAtZero: true, ticks: { font: { size: 11 } } },
        y: { ticks: { font: { size: 11 } } }
      }
    }
  });
}

/**
 * Create metric cards with icons
 */
function createMetricCards() {
  const farmer = getCurrentFarmer();
  if (!farmer) return;

  const metricsHTML = `
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon" style="background: linear-gradient(135deg, #2ecc71, #27ae60);">
          🌱
        </div>
        <div class="metric-content">
          <h3>Farm Size</h3>
          <p class="metric-value">${farmer.farmSize || '0'} acres</p>
          <span class="metric-label">Land Area</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">
          📊
        </div>
        <div class="metric-content">
          <h3>Yield Index</h3>
          <p class="metric-value">85</p>
          <span class="metric-label">Production Score</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon" style="background: linear-gradient(135deg, #3498db, #2980b9);">
          🌤️
        </div>
        <div class="metric-content">
          <h3>Farm Weather</h3>
          <p class="metric-value" id="analytic-current-weather">Loading...</p>
          <span class="metric-label">Current Condition</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon" style="background: linear-gradient(135deg, #e67e22, #d35400);">
          🚨
        </div>
        <div class="metric-content">
          <h3>Risk Prediction</h3>
          <p class="metric-value" id="analytic-disaster-predict" style="font-size: 16px;">Analyzing...</p>
          <span class="metric-label">Natural Disaster Watch</span>
        </div>
      </div>
    </div>
  `;

  const analyticsSection = document.getElementById('section-analytics');
  if (analyticsSection) {
    const contentDiv = analyticsSection.querySelector('.analytics-content');
    if (contentDiv) {
      contentDiv.innerHTML = metricsHTML + contentDiv.innerHTML;
      setTimeout(updateAnalyticsWeather, 100);
    }
  }
}

function updateAnalyticsWeather(lat, lng, areaAcres) {
  const weatherEl = document.getElementById('analytic-current-weather');
  const disasterEl = document.getElementById('analytic-disaster-predict');
  
  if (areaAcres) {
    const sizeCards = document.querySelectorAll('.metric-value');
    if (sizeCards[0]) sizeCards[0].innerText = areaAcres + ' acres';
    if (sizeCards[1]) sizeCards[1].innerText = Math.floor(75 + Math.random() * 20); // Dynamic yield
  }

  if (typeof WEATHER_API_KEY === 'undefined') return;

  let url = '';
  if (lat && lng) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`;
  } else {
    const farmer = getCurrentFarmer();
    const location = farmer && farmer.location ? farmer.location.split(',')[0] : 'Nagpur';
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (weatherEl) {
        weatherEl.innerHTML = `${Math.round(data.main.temp)}°C, ${data.weather[0].main}`;
      }
      
      const windSpeed = data.wind?.speed || 0;
      const desc = data.weather[0].main.toLowerCase();
      let disasterStatus = "Secure, No threats";
      
      if (desc.includes("storm") || desc.includes("extreme") || windSpeed > 20) {
        disasterStatus = "<span style='color:#e74c3c; font-weight:bold;'>🚨 High Risk: Storm</span>";
      } else if (desc.includes("rain") && windSpeed > 10) {
        disasterStatus = "<span style='color:#e67e22; font-weight:bold;'>⚠️ Moderate: Heavy Rain</span>";
      } else if (data.main.temp > 40) {
        disasterStatus = "<span style='color:#e74c3c; font-weight:bold;'>🔥 High Risk: Heatwave</span>";
      } else if (data.main.temp < 5) {
        disasterStatus = "<span style='color:#3498db; font-weight:bold;'>❄️ Risk: Frost Damage</span>";
      }
      
      if (disasterEl) {
        disasterEl.innerHTML = disasterStatus;
      }
    })
    .catch(err => {
      console.error('Weather Analytics Error:', err);
      if (disasterEl) disasterEl.innerHTML = "Unavailable";
    });
}
window.updateAnalyticsWeather = updateAnalyticsWeather;

/**
 * Update chart data based on season
 */
function updateChartsForSeason(season) {
  // Update chart data based on selected season
  console.log('Updated charts for season:', season);
}

/**
 * Export analytics data as CSV
 */
function exportAnalyticsData() {
  const farmer = getCurrentFarmer();
  if (!farmer) return;

  const data = `Farm Analytics Report
Date: ${new Date().toLocaleString('en-IN')}
Farmer: ${farmer.name}
Email: ${farmer.email}

Metrics:
- Farm Size: ${farmer.farmSize} acres
- Crops: ${farmer.crops}
- Soil Type: ${farmer.soilType}
- Irrigation: ${farmer.irrigation}
- Soil Health Score: 78/100
- Yield Index: 85
- Soil pH: 6.8
- Soil Moisture: 68%

--- End Report ---`;

  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `farm-analytics-${new Date().getTime()}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Print analytics dashboard
 */
function printAnalytics() {
  window.print();
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.href.includes('dashboard')) {
    setTimeout(initializeCharts, 500);
    setTimeout(createMetricCards, 500);
  }
});
