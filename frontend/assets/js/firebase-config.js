/**
 * Firebase Configuration and Initialization
 * Integrates Firebase Authentication and Firestore Database
 */

// Firebase Configuration (Replace with your config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForSankalp_ReplaceWithYours",
  authDomain: "sankalp-digital-twin.firebaseapp.com",
  projectId: "sankalp-digital-twin",
  storageBucket: "sankalp-digital-twin.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
let app, auth, db;

async function initializeFirebase() {
  try {
    // Initialize Firebase App
    app = firebase.initializeApp(firebaseConfig);
    
    // Initialize Authentication
    auth = firebase.auth();
    
    // Initialize Firestore
    db = firebase.firestore();
    
    // Enable offline persistence
    await db.enablePersistence();
    
    console.log('✅ Firebase initialized successfully');
    return { app, auth, db };
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    throw error;
  }
}

/**
 * Get current Firebase Auth instance
 */
function getAuth() {
  if (!auth) {
    throw new Error('Firebase not initialized. Call initializeFirebase() first.');
  }
  return auth;
}

/**
 * Get Firestore database instance
 */
function getFirestore() {
  if (!db) {
    throw new Error('Firestore not initialized. Call initializeFirebase() first.');
  }
  return db;
}

/**
 * Check if user is authenticated
 */
function isAuthenticatedFirebase() {
  return auth && auth.currentUser !== null;
}

/**
 * Get current authenticated user
 */
function getCurrentAuthUser() {
  return auth ? auth.currentUser : null;
}

// Wait for Firebase to load and initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Firebase SDK should be loaded from CDN before this script
  if (typeof firebase !== 'undefined') {
    try {
      await initializeFirebase();
      console.log('🔐 Firebase ready for authentication');
    } catch (error) {
      console.error('Firebase setup failed:', error);
    }
  } else {
    console.warn('⚠️ Firebase SDK not loaded. Ensure it is included in HTML.');
  }
});
