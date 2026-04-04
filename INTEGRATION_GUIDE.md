# 🌾 Sankalp Digital Twin - Firebase & Supabase Integration

> **Real-time Backend Integration for Farmer Management & Analytics**

## ✨ Features Implemented

### 🔐 Firebase Authentication
- ✅ Email/Password registration & login
- ✅ Secure password management
- ✅ Session persistence
- ✅ Real-time user state tracking
- ✅ Auto-redirect on auth state changes

### 💾 Firestore Database
- ✅ Farmer profile storage
- ✅ Analytics data persistence
- ✅ Real-time data sync
- ✅ Offline data support
- ✅ Automatic timestamps

### 👥 Collections
1. **farmers** - Farmer profiles & account info
2. **analytics** - Yield, soil health, farm metrics
3. **sessions** - Login history & device tracking

### 🔄 Real-time Features
- ✅ Listen to farmer profile changes
- ✅ Auto-update analytics dashboard
- ✅ Multi-device sync
- ✅ Presence indicators

---

## 📦 Files Created

```
frontend/assets/js/
├── firebase-config.js              (Firebase initialization)
├── firebase-config.template.js     (Credentials template)
├── firestore-operations.js         (Database CRUD operations)
├── firebase-auth.js                (Authentication module)
└── auth.js                         (Farmer auth management - updated)

Project root/
├── firebase.json                   (Firebase hosting config)
├── firestore.rules                 (Security rules)
├── .firebaserc                     (Firebase CLI config)
└── FIREBASE_SETUP.md              (Setup instructions)
```

---

## 🚀 Quick Start

### 1. Get Firebase Credentials
```bash
# Visit Firebase Console
https://console.firebase.google.com/

# Create new project named: sankalp-digital-twin
# Register web app
# Copy firebaseConfig object
```

### 2. Update Configuration
```bash
# Edit: frontend/assets/js/firebase-config.js
# Replace placeholder values with your credentials
const firebaseConfig = {
  apiKey: "YOUR_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other fields
};
```

### 3. Test Locally
```bash
# Open in browser (local file testing supported)
file:///path/to/Sankalp/frontend/index.html

# Or use Live Server
npm install -g live-server
live-server frontend/
```

---

## 🔧 Configuration Steps

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click **"Add project"**
3. Enter: `sankalp-digital-twin`
4. Accept terms and create

### Step 2: Register Web App
1. Click the `</>` icon (Web)
2. App name: `Sankalp Farmer Dashboard`
3. Copy the entire `firebaseConfig` object

### Step 3: Enable Authentication
1. Go to **Authentication** tab
2. Click **Get Started**
3. Enable **Email/Password**
4. (Optional) Enable Google, GitHub sign-in

### Step 4: Create Firestore Database
1. Go to **Firestore Database**
2. Click **Create Database**
3. Start in **Production mode**
4. Choose region (closest to your users)
5. Click **Enable**

### Step 5: Add Security Rules
1. In Firestore tab, go to **Rules**
2. Replace with content from `firestore.rules`
3. Click **Publish**

---

## 📚 API Reference

### Authentication

```javascript
// Register
const result = await registerFarmer(email, password, {
  fullName: 'Name',
  phone: '1234567890',
  location: 'City',
  farmSize: 50
});

// Login
const result = await loginFarmer(email, password);

// Update Profile
await updateFarmerProfile({
  phone: '9876543210',
  farmSize: 75
});

// Change Password
await updateFarmerPassword(newPassword);

// Logout
await logoutFarmer();

// Password Reset
await sendPasswordResetEmail(email);
```

### Database Operations

```javascript
// Save farmer profile
await saveFarmerToFirestore(farmerData);

// Get farmer profile
const farmer = await getFarmerFromFirestore(uid);

// Save analytics
await saveAnalyticsToFirestore(analyticsData);

// Get analytics
const analytics = await getAnalyticsFromFirestore();

// Listen to changes
const unsubscribe = listenToFarmerUpdates((farmer) => {
  updateUI(farmer);
});

// Search farmers
const results = await searchFarmers('location', 'Village');

// Batch update
await batchUpdateFarmers({
  'uid1': { farmSize: 100 },
  'uid2': { farmSize: 200 }
});

// Export data
const data = await exportFarmerData(uid);

// Delete account
await deleteFarmerAccount(uid);
```

---

## 🔐 Security

### Firestore Rules
```javascript
// Only own data accessible
match /farmers/{uid} {
  allow read, write: if request.auth.uid == uid;
}

// Admin override (optional)
match /admin/{document=**} {
  allow read, write: if request.auth.token.admin == true;
}
```

### Authentication Best Practices
- ✅ Passwords never sent to client
- ✅ Session tokens auto-managed
- ✅ CORS restrictions enforced
- ✅ SSL/TLS encryption required
- ✅ Rate limiting on login attempts

---

## 📊 Database Schema

### Farmers Collection
```javascript
{
  uid: "user123",
  email: "farmer@example.com",
  fullName: "Ramesh Kumar",
  phone: "9876543210",
  location: "Nagpur, Maharashtra",
  farmSize: 50,
  accountStatus: "active",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Analytics Collection
```javascript
{
  uid: "user123",
  farmSize: 50,
  activeCrops: 3,
  soilMoisture: 65,
  yieldIndex: 85,
  soilPH: 7.2,
  healthScore: 88,
  lastUpdated: Timestamp
}
```

---

## 🌐 Supabase Integration (Optional)

For **hybrid Firebase + Supabase** setup:

### Why Add Supabase?
- PostgreSQL (complex queries)
- Real-time subscriptions
- REST API support
- Open-source alternative
- Better for reports & analytics

### Setup Supabase
1. Go to https://supabase.com/
2. Create New Project
3. Create tables: `farmers`, `analytics`, `sessions`
4. Get API keys
5. Create `supabase-config.js`
6. Use alongside Firebase

---

## 🚀 Deployment

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

### Vercel/Netlify
```bash
# Build
npm run build

# Deploy
vercel deploy --prod
```

---

## 📋 Checklist

- [x] Firebase authentication module created
- [x] Firestore operations module created  
- [x] Security rules configured
- [x] Firebase SDK integrated into all pages
- [x] Real-time listener setup
- [x] Error handling implemented
- [ ] Firebase credentials configured (manual step)
- [ ] Database security rules deployed (manual step)
- [ ] Production testing
- [ ] User testing with real farmers

---

## 🐛 Troubleshooting

### "Firebase not initialized"
```javascript
// Ensure this is called before using auth/db
await initializeFirebase();
```

### "User not authenticated"
```javascript
// Check user is logged in before database operations
const user = getCurrentAuthUser();
if (!user) return; // User not authenticated
```

### "Permission denied" errors
- Check Firestore security rules
- Verify user UID matches document path
- Ensure user is authenticated

### "CORS Error"
- Firebase Hosting handles CORS automatically
- For local development, use `live-server`
- Add localhost to authorized domains

---

## 📞 Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Supabase Docs](https://supabase.com/docs)
- [GitHub Issues](https://github.com)

---

## 📝 Next Steps

1. **Get Firebase Credentials** - Follow setup guide above
2. **Update firebase-config.js** - Add your credentials
3. **Test Registration** - Create test account
4. **Test Login** - Verify Firestore integration
5. **Deploy** - Use Firebase Hosting

---

**Status:** ✅ Firebase Integration Complete  
**Last Updated:** April 4, 2026  
**Version:** 1.0.0
