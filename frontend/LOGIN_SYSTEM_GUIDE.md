# 🔐 FARMER LOGIN & PROFILE SYSTEM

## Overview
Sankalp Digital Twin now includes a complete farmer authentication and profile management system. Farmers can login, manage their profile, update farm details, and access all features.

---

## 🚀 Quick Start

### For Users/Farmers

#### Option 1: Login with Demo Account
1. Go to `/frontend/login.html`
2. Click **"Try Demo Account"** button
3. Automatically logs in with demo credentials
4. Redirected to dashboard

#### Option 2: Manual Login
1. Enter email: `demo@farm.com`
2. Enter password: `demo123`
3. Click **"Login to Dashboard"**

#### Option 3: Try as Guest
1. Click **"continue as guest"** link
2. Redirects to dashboard without login
3. All features available

---

## 📝 Sample Farmer Accounts (Pre-loaded)

| Email | Password | Name | Location | Farm Size |
|-------|----------|------|----------|-----------|
| demo@farm.com | demo123 | Demo Farmer | Nagpur, Maharashtra | 5.5 acres |
| rajesh@farm.com | password123 | Rajesh Patil | Vidarbha, Maharashtra | 8.2 acres |
| priya@farm.com | secure456 | Priya Sharma | Indore, Madhya Pradesh | 3.5 acres |

---

## 🔐 Authentication Flow

```
   Landing Page (index.html)
         ↓
   [Click Login or Get Started]
         ↓
   Login Page (login.html)
    /  |  \
   /   |   \
Demo  Manual Guest
Demo  Login  Access
Account     (No Auth)
   \   |   /
    \  |  /
    Dashboard (dashboard.html)
         ↓
   [Profile Button → profile.html]
```

---

## 📁 NEW/MODIFIED FILES

### New Files Created
```
✅ /frontend/login.html (250 lines)
   - Beautiful login page with form validation
   - Demo account button
   - Remember me functionality
   - Forgot password link (placeholder)

✅ /frontend/profile.html (400 lines)
   - Complete farmer profile management
   - 4 sections: Profile, Farm, Settings, Security
   - Edit personal info, farm details
   - Change password, delete account
   - Notification preferences

✅ /frontend/assets/js/auth.js (200 lines)
   - Authentication logic
   - Session management
   - Farmer data persistence
   - Sample farmer initialization
```

### Modified Files
```
✅ /frontend/dashboard.html
   - Added auth check on page load
   - Profile button in top bar
   - Logout button
   - Redirects to login if not authenticated

✅ /frontend/index.html
   - Added Login button to navigation
   - Links to login.html

✅ /frontend/assets/css/dashboard.css
   - Added button styles (.btn, .btn-primary, etc.)
```

---

## 🎨 Login Page Features

### Visual Design
- Gradient header (green to teal)
- Centered card layout
- Professional forms with validation
- Error/success alerts
- Links for signup and forgot password

### Form Fields
- 📧 Email Address
- 🔐 Password
- ☑️ Remember Me checkbox
- 🔗 Forgot Password link

### Action Buttons
- **Login to Dashboard** - Main login button
- **Try Demo Account** - Quick demo access
- **Create Account** (placeholder)
- **Continue as Guest** - Skip login

---

## 👤 Profile Page Features

### Sections

#### 1️⃣ My Profile
- Avatar (Farmer emoji)
- Display name, email, phone, location
- Statistics cards (farm size, crops, yield)
- Edit form for personal information
- Save/Cancel buttons

#### 2️⃣ Farm Details
- Farm size in acres
- Soil type selector (Black, Red, Alluvial, Laterite)
- Primary crops list
- Irrigation method (Flood, Sprinkler, Drip, Canal, Rainfall)
- Farm location description
- Save/Cancel buttons

#### 3️⃣ Settings
- Notification preferences:
  - Weather alerts
  - Soil recommendations
  - Government schemes
  - Weekly email summary
- Display preferences (Dark mode)
- Save settings button

#### 4️⃣ Security
- Change password form
  - Current password
  - New password
  - Confirm password
- Account actions:
  - Delete account (with confirmation)
- Logout button

---

## 📊 Data Storage

### Session Storage (Temporary)
```javascript
sessionStorage.get('currentFarmer')
{
  id: "demo-001",
  name: "Demo Farmer",
  email: "demo@farm.com",
  phone: "+91-9876543210",
  location: "Nagpur, Maharashtra",
  farmSize: "5.5",
  crops: "Soybean, Cotton",
  soilType: "Black Soil",
  // ... more fields
}
```

### Local Storage (Persistent)
```javascript
localStorage.get('farmers') // All registered farmers
localStorage.get('rememberedFarmer') // Remember me data
localStorage.get('farmerSettings') // User preferences
```

---

## 🔑 API Reference

### Authentication Functions (auth.js)

#### `getCurrentFarmer()`
Returns the currently logged-in farmer object
```javascript
const farmer = getCurrentFarmer();
// { id, name, email, phone, location, ... }
```

#### `logout()`
Clears session and redirects to login
```javascript
logout();
```

#### `isOnboardingComplete()`
Checks if farmer has completed their profile setup
```javascript
if (isOnboardingComplete()) {
  // Show dashboard features
}
```

#### `getFarmerStats()`
Returns farmer statistics
```javascript
const stats = getFarmerStats();
// { farmSize, cropCount, joinedDays, lastUpdated }
```

#### `updateFarmerProfile(farmerData)`
Updates farmer information
```javascript
updateFarmerProfile({
  name: "New Name",
  phone: "+91-98765",
  farmSize: "10"
});
```

---

## 🔄 Session Management

### Auto-Redirect Logic
```javascript
// If accessing dashboard without login → redirect to login
if (!sessionStorage.getItem('currentFarmer')) {
  window.location.href = 'login.html';
}

// If on login page and already logged in → go to dashboard
if (sessionStorage.getItem('currentFarmer')) {
  window.location.href = 'dashboard.html';
}
```

### Remember Me
```javascript
// Check if "Remember Me" was selected
const remembered = localStorage.getItem('rememberMe') === 'true';
if (remembered) {
  const farmer = JSON.parse(localStorage.getItem('rememberedFarmer'));
  // Auto-fill login form
}
```

---

## ✨ Features

### Login Features
✅ Email validation
✅ Password validation (min 6 chars)
✅ Remember me functionality
✅ Demo account quick access
✅ Guest access without login
✅ Error message display
✅ Form auto-fill from remember me
✅ Automatic redirect after login
✅ Session timeout protection

### Profile Features
✅ View farmer information
✅ Edit personal details
✅ Manage farm information
✅ Update soil type
✅ Notification preferences
✅ Dark mode toggle
✅ Change password
✅ Account deletion
✅ Statistics display
✅ Responsive sidebar

---

## 🔐 Security Notes

### Current Implementation
- Data stored locally in browser (for demo)
- Session-based authentication
- Password stored in localStorage (demo only)

### For Production
- Implement backend API authentication
- Use JWT tokens
- Hash passwords with bcrypt
- Enable HTTPS
- Implement CSRF protection
- Add rate limiting on login attempts
- Secure cookies for session

---

## 🎯 Navigation Flow

### From Login Page
```
login.html
├─ Demo Account → Auto-login → dashboard.html
├─ Manual Login → Validate → dashboard.html
└─ Guest Access → dashboard.html (no session)
```

### From Dashboard
```
dashboard.html
├─ Click Profile Button → profile.html
├─ Click Logout → Clear session → login.html
└─ Session expires → Auto-redirect → login.html
```

### From Profile Page
```
profile.html
├─ Edit & Save → Update session & localStorage
├─ Change Password → Update password
├─ Delete Account → Clear all data → login.html
└─ Back to Dashboard → dashboard.html (via sidebar)
```

---

## 🧪 Testing Workflow

### Test 1: Demo Login
1. Open `login.html`
2. Click "Try Demo Account"
3. Verify redirect to dashboard
4. Check Profile button shows farmer name

### Test 2: Manual Login
1. Enter `rajesh@farm.com` / `password123`
2. Verify login success
3. Check welcome message and profile

### Test 3: Remember Me
1. Check "Remember me" checkbox
2. Login as demo farmer
3. Clear session (logout)
4. Revisit `login.html`
5. Verify email is pre-filled

### Test 4: Profile Updates
1. Login to dashboard
2. Click Profile button
3. Navigate to "Farm Details"
4. Update farm size
5. Save and verify persistence

### Test 5: Logout
1. Click Logout button
2. Verify redirect to login
3. Verify session is cleared

---

## 📱 Mobile Support

- ✅ Responsive login form
- ✅ Touch-friendly buttons
- ✅ Mobile sidebar navigation
- ✅ Stacked form layout on small screens
- ✅ Full-width profile sections

---

## 🎓 Developer Guide

### To add new farmer accounts
Edit `auth.js` function `initializeSampleFarmers()`:
```javascript
function initializeSampleFarmers() {
  const sampleFarmers = {
    'newemail@farm.com': {
      // ... farmer data
    }
  };
  localStorage.setItem('farmers', JSON.stringify(sampleFarmers));
}
```

### To change login redirect
Edit `auth.js` function `isProtectedPage()`:
```javascript
const protectedPages = ['dashboard.html', 'profile.html', 'newpage.html'];
```

### To add new profile fields
1. Add form input in `profile.html`
2. Add to farmer object in `auth.js`
3. Update localStorage persistence

---

## 🚀 Next Steps (Backend Integration)

1. Replace local storage with API endpoints
2. Implement JWT token authentication
3. Add email verification
4. Implement password reset flow
5. Add social login (Google, Facebook)
6. Implement role-based access control
7. Add audit logging
8. Implement 2FA

---

**Status**: ✅ Complete and Ready to Use!

All authentication logic is working with local storage for development/demo purposes.
Easy to integrate with Node.js/MongoDB backend when ready.

---

Built for Indian Farmers | Sankalp Digital Twin
