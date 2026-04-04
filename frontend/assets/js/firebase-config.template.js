/**
 * Firebase Configuration Template
 * IMPORTANT: Replace placeholder values with your actual Firebase credentials
 * 
 * Steps to get credentials:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project or select existing one
 * 3. Click "Add App" and select Web
 * 4. Copy the firebaseConfig object below
 * 5. Replace all placeholder values
 */

const firebaseConfig = {
  // ⚠️ REPLACE WITH YOUR VALUES ⚠️
  apiKey: "AIzaSyDemoKeyForSankalp_REPLACE_ME",
  authDomain: "sankalp-digital-twin-REPLACE.firebaseapp.com",
  projectId: "sankalp-digital-twin-REPLACE",
  storageBucket: "sankalp-digital-twin-REPLACE.appspot.com",
  messagingSenderId: "123456789012-REPLACE",
  appId: "1:123456789012:web:abcdef1234567890-REPLACE",
  measurementId: "G-XXXXXXXXXX-REPLACE"
};

// Optional: Supabase Configuration (for hybrid setup)
const supabaseConfig = {
  supabaseUrl: "https://your-project.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};

// Environment indicator
const ENVIRONMENT = {
  isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  isProduction: window.location.hostname === 'yourdomain.com',
  isLocalFile: window.location.protocol === 'file:'
};

console.log(`🌾 Sankalp Environment: ${ENVIRONMENT.isDevelopment ? 'DEV' : ENVIRONMENT.isProduction ? 'PROD' : 'LOCAL'}`);
