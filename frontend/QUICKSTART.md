# 🌾 AgriPuls Digital Twin - Quick Start Guide

## Overview
AgriPuls Digital Twin is a web-based platform empowering Indian farmers with climate-resilient agriculture through AI-powered soil analysis, weather intelligence, and irrigation optimization.

## 🚀 Quick Start (60 seconds)

### 1. Open in Browser
```
Frontend Entry Point: /frontend/index.html
Dashboard: /frontend/dashboard.html
```

### 2. Features at a Glance

| Feature | Location | How It Works |
|---------|----------|-------------|
| 📍 **Farm Mapping** | Dashboard > Map & Area | Draw rectangle on map to define farm boundary |
| 🧪 **Soil Analysis** | Dashboard > Soil Analysis | Enter soil parameters → Get 4-tab analysis |
| 🌤️ **Weather** | Dashboard > Weather Search | Search any city → View forecast + advisor |
| 🌱 **Sowing Dates** | Analysis > Sowing Dates Tab | AI recommends best crops per season |
| 💧 **Irrigation** | Analysis > Irrigation Tab | Auto-tests 3 strategies for your soil |
| 🤖 **AI Chatbot** | Bottom-right 🌾 button | Ask about farming, 24/7 support |

## 🎮 How to Use Each Feature

### Feature 1: Draw Farm Area
```javascript
1. Go to "Map & Area" section
2. Click "🖊️ Draw Farm Area" button
3. Click and drag on the map to draw rectangle
4. Farm coordinates auto-populate
5. Confirm to proceed to next section
```

### Feature 2: Map Layer Toggle
```javascript
1. Look above the map for buttons: "🗺️ Street", "🛰️ Satellite", "⛰️ Terrain"
2. Click any button to switch map view
3. Used for identifying farm elevation, landmarks, etc.
```

### Feature 3: Weather Search
```javascript
1. Go to "Weather Search" section
2. Type city name OR click quick buttons (Nagpur, Mumbai, Delhi, etc)
3. View:
   - Current temperature, humidity, winds
   - 5-day forecast with icons
   - Agricultural advisory (irrigation tips, pest warnings, etc.)
```

### Feature 4: Soil Analysis
```javascript
1. Go to "Soil Analysis" section
2. Enter soil parameters:
   - pH (6.0-8.5 is ideal)
   - Moisture (30-55% is good)
   - Nitrogen, Phosphorus, Potassium
3. Click "Generate Analysis"
4. View 4 tabs:
   
   Tab 1: Soil Analysis
   → See health assessment, warnings, recommendations
   
   Tab 2: Sowing Dates  
   → 6-month calendar with crop recommendations
   → Each month rated for compatibility
   
   Tab 3: Irrigation & Fertilizer
   → Compare 3 irrigation strategies
   → Compare 3 fertilizer plans
   → Best option highlighted in green
   
   Tab 4: Execution Guide
   → 7-step action plan
   → Timeline for each action
   → Emergency actions first
```

### Feature 5: AI Chatbot
```javascript
1. Click 🌾 button in bottom-right corner
2. Panel opens with chat interface
3. Ask questions about:
   - Crop problems
   - Soil issues
   - Irrigation methods
   - Pest control
   - Government schemes
   - Any farming topic
4. AI responds in simple, actionable language
5. Use suggested quick questions for examples
```

## 🧪 Test Data for Soil Analysis

**Scenario 1: Good Soil**
```
pH: 6.8
Moisture: 40%
Nitrogen: 200 mg/kg
Phosphorus: 25 mg/kg
Potassium: 150 mg/kg
→ Result: Excellent condition, low risk
```

**Scenario 2: Problem Soil**
```
pH: 5.2 (too acidic)
Moisture: 15% (too dry)
Nitrogen: 80 mg/kg (deficient)
Phosphorus: 10 mg/kg (deficient)
Potassium: 50 mg/kg (deficient)
→ Result: Critical condition, high risk, needs immediate action
```

**Scenario 3: Nitrogen-Heavy Soil**
```
pH: 7.0
Moisture: 38%
Nitrogen: 300 mg/kg (high)
Phosphorus: 15 mg/kg (low)
Potassium: 80 mg/kg (low)
→ Result: Needs phosphorus/potassium boost, nitrogen-heavy plan recommended
```

## 🎨 UI Navigation

### Sidebar Sections
- 📍 **Map & Area** - Farm boundary selection
- 📊 **Analytics** - Farm metrics (coming soon)
- 🌤️ **Weather Data** - Current weather for farm location
- 🔍 **Weather Search** - Search weather for any city
- 🧪 **Soil Analysis** - Multi-tab soil health assessment
- 📚 **Playbook** - Best practices guide (coming soon)

### Top Bar
- 🌝 **Dark Mode Toggle** - Switch between light/dark theme
- Welcome greeting - Shows logged-in user

## 🌐 Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Support
- Responsive design for tablets and phones
- Touch events supported on map drawing
- Chatbot scales appropriately
- Full touch-friendly interface

## 🔧 Customization

### Change Default Location
Edit `dashboard.html` line with:
```javascript
const map = L.map('map').setView([21.1458, 79.0882], 10);
// Change [latitude, longitude] to your location
// Change 10 to zoom level (1-19)
```

### Modify Soil Analysis Thresholds
Edit `analysis.js` - Look for threshold values:
```javascript
if (pH < 6.0) { ... }  // pH too acidic threshold
if (moisture < 20) { ... }  // Moisture critical threshold
if (nitrogen < 150) { ... }  // Nitrogen deficiency threshold
```

### Add More Quick Cities
Edit `dashboard.html` weather search section:
```html
<button onclick="quickCity('NewCity')">New City</button>
```

## 🐛 Troubleshooting

### Map Not Loading
- Check internet connection (needs tile server access)
- Clear browser cache
- Try incognito mode

### Weather Not Showing
- Ensure city name is spelled correctly
- Check API key in `weatherSearch.js`
- Verify internet connection

### Chatbot Not Responding
- Check Gemini API key in `chatbot.js`
- Verify API quota not exceeded (15 req/min limit)
- Check browser console for errors

### Analysis Not Generating
- Ensure ALL soil parameters are filled
- Check numbers are within valid ranges
- Try refreshing the page

## 📊 Sample Crop Recommendations

Based on Season & Soil Quality:

| Season | Best Crops | Soil pH | Nitrogen |
|--------|-----------|---------|----------|
| June (Kharif) | Soybean, Cotton | 6.5-7.5 | 150+ mg/kg |
| July (Kharif) | Paddy, Maize | 6.0-7.0 | 200+ mg/kg |
| October (Rabi) | Wheat, Chickpea | 7.0-8.0 | 150+ mg/kg |
| November (Rabi) | Mustard, Lentil | 6.5-7.5 | 100+ mg/kg |

## 🔐 API Information

All APIs are **read-only** and **free tier**:
- **OpenWeatherMap**: 1,000 calls/day (weather data)
- **Google Gemini**: 15 requests/minute (chatbot)
- **Map Tiles**: Free providers (no API key needed)

## 📞 Support

- **Landing Page**: `/frontend/index.html` - Learn about platform
- **Dashboard**: `/frontend/dashboard.html` - Use all features
- **Chatbot**: Available 24/7 on both pages
- **Documentation**: See `IMPLEMENTATION_SUMMARY.md`

---

**Start farming smarter today!** 🌾
