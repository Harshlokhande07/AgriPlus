# Firebase & Supabase Integration Guide for Sankalp Digital Twin

## Overview

This project integrates **Firebase Authentication** and **Firestore Database** to manage farmer accounts, profiles, and analytics data. Firebase provides:

- ✅ **Secure Authentication** - Email/password login & registration
- ✅ **Real-time Database** - Firestore for farmer profiles & analytics
- ✅ **Offline Support** - Data persists even when offline
- ✅ **Auto-Sync** - Changes sync automatically across devices
- ✅ **Security Rules** - Protect farmer data

---

## 🔧 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: **sankalp-digital-twin**
4. Accept terms and create project
5. Wait for project to initialize
6. Click "Add app" and select web (</> icon)
7. Register app name: **Sankalp Farmer Dashboard**

### Step 2: Get Firebase Configuration

After registering, you'll see your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

Copy this config and paste into `assets/js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForSankalp_ReplaceWithYours",
  authDomain: "sankalp-digital-twin.firebaseapp.com",
  projectId: "sankalp-digital-twin",
  storageBucket: "sankalp-digital-twin.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 3: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Click **Email/Password** provider
4. Enable it and save
5. Optionally enable Google, GitHub, Facebook sign-in

### Step 4: Create Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click **Create database**
3. Start in **Production mode** (we'll add security rules)
4. Choose region closest to users
5. Click **Enable**

### Step 5: Add Security Rules

In Firestore, go to **Rules** tab and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Farmers collection - only owner can read/write
    match /farmers/{uid} {
      allow read, write: if request.auth.uid == uid;
    }

    // Analytics collection - only owner can read/write
    match /analytics/{uid} {
      allow read, write: if request.auth.uid == uid;
    }

    // Sessions collection - only owner can read/write
    match /sessions/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

Click **Publish** to apply rules.

### Step 6: Enable CORS for Local Development

1. In Firebase Console, go to **Project Settings**
2. Under "Authorized domains", add:
   - `localhost`
   - `127.0.0.1`
   - `file://` (for local development)

---

## 📝 File Structure

```
frontend/
├── assets/
│   └── js/
│       ├── firebase-config.js          ← Firebase initialization
│       ├── firestore-operations.js     ← Database CRUD operations
│       ├── firebase-auth.js            ← Authentication logic
│       └── auth.js                     ← Farmer auth management
├── login.html
├── dashboard.html
├── profile.html
└── index.html
```

---

## 🔐 Authentication Flow

### Registration
```javascript
// User fills registration form
const result = await registerFarmer(email, password, {
  fullName: 'Farmer Name',
  phone: '1234567890',
  location: 'Village, State',
  farmSize: 50
});

// Firebase Auth creates user
// Firestore stores farmer profile
// User auto-redirects to dashboard
```

### Login
```javascript
const result = await loginFarmer(email, password);

if (result.success) {
  const farmer = result.profile;  // Farmer data from Firestore
  // User redirected to dashboard
}
```

### Profile Update
```javascript
const result = await updateFarmerProfile({
  phone: '9876543210',
  location: 'New Village',
  farmSize: 75
});
// Firestore updates automatically
```

---

## 💾 Database Schema

### Farmers Collection
```javascript
{
  uid: "firebase-user-id",
  email: "farmer@example.com",
  fullName: "Farmer Name",
  phone: "1234567890",
  location: "Village, State",
  farmSize: 50,  // in acres
  accountStatus: "active",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Analytics Collection
```javascript
{
  uid: "firebase-user-id",
  farmSize: 50,
  activeCrops: 3,
  soilMoisture: 65,
  yieldIndex: 85,
  soilPH: 7.2,
  healthScore: 88,
  lastUpdated: Timestamp
}
```

### Sessions Collection
```javascript
{
  uid: "firebase-user-id",
  lastLogin: Timestamp,
  rememberMe: true,
  deviceInfo: "Mobile/Desktop",
  ipAddress: "192.168.1.1"
}
```

---

## 🔄 Real-time Sync Features

### Listen to Farmer Profile Changes
```javascript
// Auto-update UI when profile changes
const unsubscribe = listenToFarmerUpdates((farmer) => {
  console.log('Profile updated:', farmer);
  updateUI(farmer);
});

// Stop listening
unsubscribe();
```

### Listen to Analytics Changes
```javascript
// Real-time analytics dashboard
const unsubscribe = listenToAnalyticsUpdates((analytics) => {
  console.log('Analytics updated:', analytics);
  refreshCharts(analytics);
});
```

---

## 🌐 Supabase Integration (Optional)

The project currently uses **Firebase** primary. For **Supabase** integration:

### Why Supabase?
- PostgreSQL database (more powerful than Firestore)
- Open-source Firebase alternative
- Better for complex queries
- Real-time subscriptions
- RestAPI support

### Adding Supabase

1. Go to [Supabase](https://supabase.com/)
2. Create project
3. Create tables: `farmers`, `analytics`, `sessions`
4. Create `supabase-config.js` similar to firebase-config.js
5. Use alongside Firebase for hybrid setup

---

## ⚙️ Deployment

### Prerequisites
- Firebase project created
- Security rules configured
- CORS domains added

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Build and deploy
firebase deploy
```

### Deploy to Vercel/Netlify

```bash
# Vercel deployment
npm install -g vercel
vercel

# Netlify deployment
npm run build
netlify deploy --prod
```

---

## 🐛 Troubleshooting

### Firebase not initializing?
- Check `firebase-config.js` has correct credentials
- Verify Firebase SDK is loaded (check browser console)
- Ensure `.firebaserc` file exists in project root

### Authentication failing?
- Check Email/Password provider is enabled in Firebase Console
- Verify security rules allow authentication
- Check browser console for specific error codes

### Firestore operations failing?
- Verify security rules allow read/write for user
- Check user is authenticated before database operations
- Enable Firestore persistence for offline support

### CORS errors?
- Add localhost to authorized domains in Firebase
- Use Firebase Hosting for production (handles CORS automatically)

---

## 📚 Migration Path

### Phase 1 (Current)
- Firebase Auth for login/signup
- Firestore for farmer profiles
- Real-time profile sync

### Phase 2 (Next)
- Migrate analytics storage to Firestore
- Real-time analytics dashboard
- Weather data caching

### Phase 3 (Future)
- Add Supabase PostgreSQL for complex queries
- Hybrid Firebase + Supabase setup
- Advanced analytics & reports

---

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Database Guide](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Supabase Documentation](https://supabase.com/docs)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

---

## 📞 Support

For issues:
1. Check Firebase Console logs
2. Review browser console for errors
3. Check network tab in DevTools
4. Verify Firebase credentials and security rules

---

**Last Updated:** April 4, 2026  
**Status:** ✅ Firebase Integration Complete | ⏳ Supabase Optional
