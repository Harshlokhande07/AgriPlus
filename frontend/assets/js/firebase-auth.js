/**
 * Firebase Authentication Module
 * Replaces localStorage-based auth with Firebase Authentication
 * Handles user registration, login, logout, and session management
 */

const AUTH_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error'
};

let currentAuthState = AUTH_STATE.IDLE;
let authStateCallbacks = [];

/**
 * Register a callback for auth state changes
 */
function onAuthStateChanged(callback) {
  authStateCallbacks.push(callback);
}

/**
 * Notify all callbacks of auth state change
 */
function notifyAuthStateChange(state, user = null) {
  currentAuthState = state;
  authStateCallbacks.forEach(callback => {
    callback({ state, user });
  });
}

/**
 * Register new farmer account with email and password
 */
async function registerFarmer(email, password, farmerDetails) {
  try {
    currentAuthState = AUTH_STATE.LOADING;
    const auth = getAuth();

    // Create user account
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Set display name
    await user.updateProfile({
      displayName: farmerDetails.fullName || 'Farmer'
    });

    // Save farmer profile to Firestore
    const farmerData = {
      uid: user.uid,
      email: user.email,
      fullName: farmerDetails.fullName || '',
      phone: farmerDetails.phone || '',
      location: farmerDetails.location || '',
      farmSize: farmerDetails.farmSize || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      accountStatus: 'active'
    };

    await saveFarmerToFirestore(farmerData);

    console.log('✅ Farmer registered successfully:', user.uid);
    notifyAuthStateChange(AUTH_STATE.AUTHENTICATED, user);

    return { success: true, user, message: 'Registration successful' };
  } catch (error) {
    console.error('❌ Registration error:', error);
    currentAuthState = AUTH_STATE.ERROR;
    notifyAuthStateChange(AUTH_STATE.UNAUTHENTICATED, null);

    // Return user-friendly error message
    let errorMessage = 'Registration failed';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already registered. Try logging in.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Use at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }

    return { success: false, error: errorMessage };
  }
}

/**
 * Login farmer with email and password
 */
async function loginFarmer(email, password) {
  try {
    currentAuthState = AUTH_STATE.LOADING;
    const auth = getAuth();

    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Fetch farmer profile from Firestore
    const farmerProfile = await getFarmerFromFirestore(user.uid);

    console.log('✅ Farmer logged in successfully:', user.uid);
    notifyAuthStateChange(AUTH_STATE.AUTHENTICATED, user);

    return { 
      success: true, 
      user, 
      profile: farmerProfile,
      message: 'Login successful' 
    };
  } catch (error) {
    console.error('❌ Login error:', error);
    currentAuthState = AUTH_STATE.ERROR;
    notifyAuthStateChange(AUTH_STATE.UNAUTHENTICATED, null);

    let errorMessage = 'Login failed';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Email not registered. Please sign up.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many login attempts. Try again later.';
    }

    return { success: false, error: errorMessage };
  }
}

/**
 * Logout current user
 */
async function logoutFarmer() {
  try {
    const auth = getAuth();
    await auth.signOut();

    console.log('✅ Farmer logged out successfully');
    notifyAuthStateChange(AUTH_STATE.UNAUTHENTICATED, null);

    return { success: true, message: 'Logout successful' };
  } catch (error) {
    console.error('❌ Logout error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(email) {
  try {
    const auth = getAuth();
    await auth.sendPasswordResetEmail(email);

    console.log('✅ Password reset email sent to:', email);
    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    console.error('❌ Password reset error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update farmer password
 */
async function updateFarmerPassword(newPassword) {
  try {
    const user = getCurrentAuthUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    await user.updatePassword(newPassword);

    console.log('✅ Password updated successfully');
    return { success: true, message: 'Password updated' };
  } catch (error) {
    console.error('❌ Password update error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update farmer profile in both Firebase Auth and Firestore
 */
async function updateFarmerProfile(updates) {
  try {
    const user = getCurrentAuthUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Update Firebase Auth profile
    if (updates.fullName) {
      await user.updateProfile({
        displayName: updates.fullName
      });
    }

    // Update Firestore profile
    const profileData = {
      ...updates,
      updatedAt: new Date()
    };

    await saveFarmerToFirestore(profileData);

    console.log('✅ Farmer profile updated');
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('❌ Profile update error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get current authenticated farmer
 */
function getCurrentFarmer() {
  const user = getCurrentAuthUser();
  return user ? {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: user.metadata.creationTime
  } : null;
}

/**
 * Check if user is currently authenticated
 */
function isAuthenticated() {
  return isAuthenticatedFirebase();
}

/**
 * Setup Firebase authentication state listener
 */
function setupAuthListener() {
  try {
    const auth = getAuth();

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('🔐 User authenticated:', user.email);
        notifyAuthStateChange(AUTH_STATE.AUTHENTICATED, user);

        // Auto-redirect to dashboard if on login page
        if (window.location.pathname.includes('login.html')) {
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 500);
        }
      } else {
        console.log('🚪 User logged out');
        notifyAuthStateChange(AUTH_STATE.UNAUTHENTICATED, null);

        // Auto-redirect to login if on protected pages
        const currentPage = window.location.pathname.split('/').pop();
        if (['dashboard.html', 'profile.html', 'analytics.html'].includes(currentPage)) {
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 500);
        }
      }
    });

    console.log('👂 Auth state listener set up');
  } catch (error) {
    console.error('❌ Error setting up auth listener:', error);
  }
}

/**
 * Get auth state
 */
function getAuthState() {
  return currentAuthState;
}

// Initialize auth listener when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (typeof firebase !== 'undefined' && isAuthenticatedFirebase !== undefined) {
    setupAuthListener();
  }
});
