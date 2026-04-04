// auth.js - Authentication and session management

/**
 * Initialize authentication system
 * Checks if user is logged in and redirects appropriately
 */
function initializeAuth() {
  const currentFarmer = sessionStorage.getItem('currentFarmer');
  
  // If user tries to access dashboard without login, redirect to login
  if (!currentFarmer && isProtectedPage()) {
    window.location.href = 'login.html';
  }
}

/**
 * Check if current page is protected (requires login)
 */
function isProtectedPage() {
  const currentPage = window.location.pathname.split('/').pop();
  const protectedPages = ['dashboard', 'profile'];
  return protectedPages.some(page => currentPage.includes(page) || currentPage.startsWith(page));
}

/**
 * Get current logged-in farmer
 */
function getCurrentFarmer() {
  const farmer = sessionStorage.getItem('currentFarmer');
  return farmer ? JSON.parse(farmer) : null;
}

/**
 * Save farmer session data
 */
function saveSession(farmer, remember = false) {
  sessionStorage.setItem('currentFarmer', JSON.stringify(farmer));
  
  if (remember) {
    localStorage.setItem('rememberedFarmer', JSON.stringify(farmer));
    localStorage.setItem('rememberMe', 'true');
  }
}

/**
 * Logout farmer
 */
function logout() {
  sessionStorage.removeItem('currentFarmer');
  localStorage.removeItem('rememberMe');
  window.location.href = 'login.html';
}

/**
 * Register new farmer account
 */
function registerFarmer(farmerData) {
  const farmers = JSON.parse(localStorage.getItem('farmers')) || {};
  
  // Check if email already exists
  if (farmers[farmerData.email]) {
    return { success: false, message: 'Email already registered' };
  }
  
  // Store new farmer
  farmers[farmerData.email] = {
    id: 'farmer-' + Date.now(),
    ...farmerData,
    createdAt: new Date().toISOString(),
    joinDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })
  };
  
  localStorage.setItem('farmers', JSON.stringify(farmers));
  
  // Auto-login
  saveSession(farmers[farmerData.email], true);
  
  return { success: true, message: 'Account created successfully' };
}

/**
 * Update farmer profile
 */
function updateFarmerProfile(farmerData) {
  const farmer = getCurrentFarmer();
  if (!farmer) return false;
  
  const updatedFarmer = { ...farmer, ...farmerData };
  saveSession(updatedFarmer);
  
  // Also update in stored farmers if they have an account
  const farmers = JSON.parse(localStorage.getItem('farmers')) || {};
  if (farmers[farmer.email]) {
    farmers[farmer.email] = updatedFarmer;
    localStorage.setItem('farmers', JSON.stringify(farmers));
  }
  
  return true;
}

/**
 * Change farmer password
 */
function changeFarmerPassword(oldPassword, newPassword) {
  const farmer = getCurrentFarmer();
  const farmers = JSON.parse(localStorage.getItem('farmers')) || {};
  
  if (!farmers[farmer.email]) {
    return { success: false, message: 'Farmer not found' };
  }
  
  if (farmers[farmer.email].password !== oldPassword) {
    return { success: false, message: 'Current password is incorrect' };
  }
  
  if (newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters' };
  }
  
  farmers[farmer.email].password = newPassword;
  localStorage.setItem('farmers', JSON.stringify(farmers));
  
  return { success: true, message: 'Password changed successfully' };
}

/**
 * Get all demo/sample farmers for testing
 */
function initializeSampleFarmers() {
  const existingFarmers = localStorage.getItem('farmers');
  if (existingFarmers) return; // Don't overwrite if already exists
  
  const sampleFarmers = {
    'demo@farm.com': {
      id: 'demo-001',
      name: 'Demo Farmer',
      email: 'demo@farm.com',
      password: 'demo123',
      phone: '+91-9876543210',
      location: 'Nagpur, Maharashtra',
      farmSize: '5.5',
      crops: 'Soybean, Cotton',
      soilType: 'Black Soil',
      irrigation: 'drip',
      joinDate: 'Jan 2026',
      createdAt: new Date().toISOString()
    },
    'rajesh@farm.com': {
      id: 'farmer-001',
      name: 'Rajesh Patil',
      email: 'rajesh@farm.com',
      password: 'password123',
      phone: '+91-9123456789',
      location: 'Vidarbha, Maharashtra',
      farmSize: '8.2',
      crops: 'Soybean, Maize, Wheat',
      soilType: 'Black Soil',
      irrigation: 'sprinkler',
      joinDate: 'Dec 2025',
      createdAt: new Date().toISOString()
    },
    'priya@farm.com': {
      id: 'farmer-002',
      name: 'Priya Sharma',
      email: 'priya@farm.com',
      password: 'secure456',
      phone: '+91-8765432109',
      location: 'Indore, Madhya Pradesh',
      farmSize: '3.5',
      crops: 'Chickpea, Lentil',
      soilType: 'Red Soil',
      irrigation: 'flood',
      joinDate: 'Nov 2025',
      createdAt: new Date().toISOString()
    }
  };
  
  localStorage.setItem('farmers', JSON.stringify(sampleFarmers));
}

/**
 * Display farmer info in navigation/header
 */
function updateFarmerDisplay() {
  const farmer = getCurrentFarmer();
  if (!farmer) return;
  
  // Update any elements with farmer-name class
  document.querySelectorAll('.farmer-name').forEach(el => {
    el.textContent = farmer.name;
  });
  
  // Update any elements with farmer-email class
  document.querySelectorAll('.farmer-email').forEach(el => {
    el.textContent = farmer.email;
  });
  
  // Update any elements with farmer-avatar class
  document.querySelectorAll('.farmer-avatar').forEach(el => {
    el.textContent = farmer.name.charAt(0).toUpperCase();
  });
}

/**
 * Check if farmer has completed onboarding
 */
function isOnboardingComplete() {
  const farmer = getCurrentFarmer();
  if (!farmer) return false;
  
  return !!(farmer.farmSize && farmer.crops && farmer.location);
}

/**
 * Get farmer statistics
 */
function getFarmerStats() {
  const farmer = getCurrentFarmer();
  if (!farmer) return null;
  
  return {
    farmSize: farmer.farmSize || '0',
    cropCount: (farmer.crops || '').split(',').filter(c => c.trim()).length,
    joinedDays: calculateDaysSince(farmer.createdAt),
    lastUpdated: getLastUpdatedDate()
  };
}

/**
 * Calculate days since a date
 */
function calculateDaysSince(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  return diff;
}

/**
 * Get last profile update date
 */
function getLastUpdatedDate() {
  const farmer = getCurrentFarmer();
  if (!farmer || !farmer.updatedAt) return 'Today';
  
  const date = new Date(farmer.updatedAt);
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

/**
 * Create farmer login token (for backend integration later)
 */
function createAuthToken(farmer) {
  const payload = {
    id: farmer.id,
    email: farmer.email,
    timestamp: Date.now()
  };
  
  // In production, this would be a JWT token
  return btoa(JSON.stringify(payload));
}

/**
 * Initialize farmers on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeSampleFarmers();
  initializeAuth();
  updateFarmerDisplay();
});

// Export functions for use in other scripts
window.auth = {
  getCurrentFarmer,
  logout,
  registerFarmer,
  updateFarmerProfile,
  changeFarmerPassword,
  isOnboardingComplete,
  getFarmerStats,
  createAuthToken
};
