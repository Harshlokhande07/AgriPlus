let isDrawing = false;
let startLatLng = null;
let selectionRect = null;
let drawnRectangle = null;

// Add a toolbar button above the map for "Draw Farm Area" mode
function initMapDrawing(map) {
  // 1. ADD: Location Search Bar
  const searchContainer = document.createElement('div');
  searchContainer.className = 'map-search-bar';
  searchContainer.style.cssText = 'margin-bottom: 15px; display: flex; gap: 10px;';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search village, region, or coordinates...';
  searchInput.style.cssText = 'flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; font-size: 14px;';
  
  const searchBtn = document.createElement('button');
  searchBtn.innerHTML = '🔍 Search Area';
  searchBtn.style.cssText = 'padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s;';
  
  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (!q) return;
    searchBtn.innerHTML = '⏳...';
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          map.flyTo([data[0].lat, data[0].lon], 13);
          searchBtn.innerHTML = '✅ Found';
          setTimeout(() => searchBtn.innerHTML = '🔍 Search Area', 2000);
        } else {
          searchBtn.innerHTML = '❌ Not Found';
          setTimeout(() => searchBtn.innerHTML = '🔍 Search Area', 2000);
        }
      })
      .catch(() => {
        searchBtn.innerHTML = '🔍 Search Area';
      });
  });
  
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchBtn);
  document.getElementById('map').parentNode.insertBefore(searchContainer, document.getElementById('map'));

  // 2. Add: Draw Area Button & Selected Actions Menu
  const toolbarContainer = document.createElement('div');
  toolbarContainer.style.cssText = 'display: flex; gap: 10px; flex-wrap: wrap; align-items: center;';
  document.getElementById('map').parentNode.insertBefore(toolbarContainer, document.getElementById('map'));

  const drawBtn = document.createElement('button');
  drawBtn.id = 'draw-area-btn';
  drawBtn.innerHTML = '🖊️ Draw Farm Area';
  drawBtn.className = 'map-draw-btn active';
  drawBtn.title = 'Click and drag to select your farm area';
  drawBtn.style.margin = '0';
  toolbarContainer.appendChild(drawBtn);



  let drawMode = false;

  drawBtn.addEventListener('click', () => {
    drawMode = !drawMode;
    drawBtn.classList.toggle('active', drawMode);
    drawBtn.innerHTML = drawMode ? '✅ Drawing Mode ON — Drag on map' : '🖊️ Draw Farm Area';
    map.dragging[drawMode ? 'disable' : 'enable']();
    document.getElementById('map').style.cursor = drawMode ? 'crosshair' : '';
  });

  // Mouse events on map
  map.on('mousedown', (e) => {
    if (!drawMode) return;
    isDrawing = true;
    startLatLng = e.latlng;
    if (drawnRectangle) { map.removeLayer(drawnRectangle); drawnRectangle = null; }
  });

  map.on('mousemove', (e) => {
    if (!isDrawing || !drawMode) return;
    const currentLatLng = e.latlng;
    const bounds = L.latLngBounds(startLatLng, currentLatLng);
    if (drawnRectangle) {
      drawnRectangle.setBounds(bounds);
    } else {
      drawnRectangle = L.rectangle(bounds, {
        color: '#2ecc71',
        weight: 2,
        fillOpacity: 0.15,
        dashArray: '6, 4'
      }).addTo(map);
    }
  });

  map.on('mouseup', (e) => {
    if (!isDrawing || !drawMode) return;
    isDrawing = false;
    drawMode = false;
    map.dragging.enable();
    drawBtn.innerHTML = '🖊️ Draw Farm Area';
    drawBtn.classList.remove('active');
    document.getElementById('map').style.cursor = '';

    if (!drawnRectangle) return;

    const bounds = drawnRectangle.getBounds();
    const center = bounds.getCenter();
    const areaSqKm = calculateArea(bounds);

    // Auto-populate farm info
    document.getElementById('farm-lat').value = center.lat.toFixed(6);
    document.getElementById('farm-lng').value = center.lng.toFixed(6);
    document.getElementById('farm-size').value = (areaSqKm * 247.105).toFixed(2); // convert to acres

    // Add popup on the rectangle
    drawnRectangle.bindPopup(`
      <strong>Farm Area Selected</strong><br>
      Center: ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}<br>
      Approx. Size: ${(areaSqKm * 247.105).toFixed(2)} acres<br>
      <button onclick="proceedToNextStep()" style="margin-top:8px;padding:4px 12px;background:#2ecc71;color:white;border:none;border-radius:4px;cursor:pointer;">
        ✅ Confirm & Continue →
      </button>
    `).openPopup();

    // Fetch weather for the center
    fetchWeatherData(center.lat, center.lng);
    
    // Auto-sync the analytics section
    if (window.updateAnalyticsWeather) {
      window.updateAnalyticsWeather(center.lat, center.lng, (areaSqKm * 247.105).toFixed(2));
    }
  });

  // Touch support for mobile
  map.on('touchstart', (e) => {
    if (!drawMode) return;
    isDrawing = true;
    startLatLng = e.latlng;
  });

  map.on('touchmove', (e) => {
    if (!isDrawing || !drawMode) return;
    const currentLatLng = e.latlng;
    const bounds = L.latLngBounds(startLatLng, currentLatLng);
    if (drawnRectangle) {
      drawnRectangle.setBounds(bounds);
    } else {
      drawnRectangle = L.rectangle(bounds, { color: '#2ecc71', weight: 2, fillOpacity: 0.15 }).addTo(map);
    }
  });

  map.on('touchend', () => {
    if (!isDrawing) return;
    isDrawing = false;
    // same logic as mouseup — trigger step advance
    if (drawnRectangle) {
      const center = drawnRectangle.getBounds().getCenter();
      fetchWeatherData(center.lat, center.lng);
      proceedToNextStep();
    }
  });
}

function calculateArea(bounds) {
  const R = 6371; // Earth radius km
  const lat1 = bounds.getSouth() * Math.PI / 180;
  const lat2 = bounds.getNorth() * Math.PI / 180;
  const lng1 = bounds.getWest() * Math.PI / 180;
  const lng2 = bounds.getEast() * Math.PI / 180;
  return Math.abs((lat2 - lat1) * (lng2 - lng1) * R * R);
}

// Step progression — called after area is drawn and confirmed
function proceedToNextStep() {
  const steps = ['section-map', 'section-analytics', 'section-weather', 'section-analysis', 'section-playbook'];
  const currentActive = document.querySelector('.sidebar-item.active');
  const currentSection = currentActive ? currentActive.dataset.section : 'map';

  const stepMap = {
    'map': 'analytics',
    'analytics': 'weather',
    'weather': 'analysis',
    'analysis': 'playbook'
  };

  const nextSection = stepMap[currentSection];
  if (nextSection) {
    // Activate next sidebar item
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.toggle('active', item.dataset.section === nextSection);
    });
    // Show next section
    document.querySelectorAll('.dashboard-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `section-${nextSection}`);
    });
    // Show a toast notification
    showToast(`✅ Farm area saved! Moved to ${nextSection.charAt(0).toUpperCase() + nextSection.slice(1)} section.`);
  }
}

function showToast(message) {
  let toast = document.getElementById('agripuls-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'agripuls-toast';
    toast.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #2ecc71; color: white; padding: 12px 24px;
      border-radius: 8px; font-size: 14px; z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: opacity 0.4s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// Layer toggle function
function initLayerToggle(map) {
  // Define all tile layers
  const layers = {
    street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }),
    satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri World Imagery',
      maxZoom: 19
    }),
    terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenTopoMap contributors',
      maxZoom: 17
    })
  };

  // Add default street layer
  layers.street.addTo(map);
  let currentLayer = layers.street;

  // Build the toggle UI
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'map-layer-toggle';
  toggleContainer.innerHTML = `
    <span class="layer-label">Map View:</span>
    <button class="layer-btn active" data-layer="street">🗺️ Street</button>
    <button class="layer-btn" data-layer="satellite">🛰️ Satellite</button>
    <button class="layer-btn" data-layer="terrain">⛰️ Terrain</button>
  `;

  // Place it above the map
  const mapWrapper = document.getElementById('map').parentNode;
  mapWrapper.insertBefore(toggleContainer, document.getElementById('map'));

  // Event listeners
  toggleContainer.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const layerKey = btn.dataset.layer;
      map.removeLayer(currentLayer);
      currentLayer = layers[layerKey];
      currentLayer.addTo(map);
      toggleContainer.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Add Fullscreen Control
  const FullscreenControl = L.Control.extend({
    options: { position: 'topright' },
    onAdd: function (map) {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      const btn = L.DomUtil.create('a', '', container);
      btn.innerHTML = '⛶';
      btn.href = '#';
      btn.title = 'Toggle Fullscreen';
      btn.style.fontSize = '20px';
      btn.style.lineHeight = '30px';
      btn.style.textAlign = 'center';
      btn.style.textDecoration = 'none';
      btn.style.color = '#333';
      btn.style.display = 'block';
      btn.style.width = '32px';
      btn.style.height = '32px';
      btn.style.backgroundColor = 'white';

      L.DomEvent.disableClickPropagation(container);
      
      L.DomEvent.on(btn, 'click', function(e) {
        L.DomEvent.stop(e);
        const mapEl = document.getElementById('map');
        if (!document.fullscreenElement) {
          if (mapEl.requestFullscreen) { mapEl.requestFullscreen(); }
          else if (mapEl.webkitRequestFullscreen) { mapEl.webkitRequestFullscreen(); }
          else if (mapEl.msRequestFullscreen) { mapEl.msRequestFullscreen(); }
        } else {
          if (document.exitFullscreen) { document.exitFullscreen(); }
          else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
          else if (document.msExitFullscreen) { document.msExitFullscreen(); }
        }
      });
      
      return container;
    }
  });
  map.addControl(new FullscreenControl());
}
