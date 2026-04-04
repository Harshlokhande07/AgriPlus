@echo off
REM Firebase Integration Verification Script for Windows
REM Run this to verify Firebase setup and configuration

cls
echo.
echo 🌾 Sankalp Firebase Integration Verification
echo =============================================
echo.

REM Check if Firebase config file exists
echo 1. Checking Firebase configuration file...
if exist "frontend\assets\js\firebase-config.js" (
    echo    ✅ firebase-config.js found
    
    REM Check if config has placeholder values
    findstr /m "REPLACE_ME REPLACE Demo" "frontend\assets\js\firebase-config.js" >nul
    if %errorlevel% equ 0 (
        echo    ⚠  WARNING: firebase-config.js still has placeholder values
        echo    Update with real credentials from Firebase Console
    ) else (
        echo    ✅ Configuration appears to have real values
    )
) else (
    echo    ❌ firebase-config.js not found
)

echo.

REM Check if all necessary JS files exist
echo 2. Checking Firebase module files...
if exist "frontend\assets\js\firebase-config.js" echo    ✅ firebase-config.js
if exist "frontend\assets\js\firestore-operations.js" echo    ✅ firestore-operations.js
if exist "frontend\assets\js\firebase-auth.js" echo    ✅ firebase-auth.js

echo.

REM Check if documentation files exist
echo 3. Checking documentation...
if exist "FIREBASE_SETUP.md" echo    ✅ FIREBASE_SETUP.md
if exist "INTEGRATION_GUIDE.md" echo    ✅ INTEGRATION_GUIDE.md
if exist "firebase.json" echo    ✅ firebase.json
if exist "firestore.rules" echo    ✅ firestore.rules
if exist ".firebaserc" echo    ✅ .firebaserc

echo.

REM Check HTML files for Firebase SDK
echo 4. Checking Firebase SDK integration in HTML...
findstr /m "firebasejs" "frontend\login.html" >nul
if %errorlevel% equ 0 echo    ✅ login.html - Firebase SDK found
if %errorlevel% neq 0 echo    ❌ login.html - Firebase SDK not found

findstr /m "firebasejs" "frontend\dashboard.html" >nul
if %errorlevel% equ 0 echo    ✅ dashboard.html - Firebase SDK found
if %errorlevel% neq 0 echo    ❌ dashboard.html - Firebase SDK not found

findstr /m "firebasejs" "frontend\profile.html" >nul
if %errorlevel% equ 0 echo    ✅ profile.html - Firebase SDK found
if %errorlevel% neq 0 echo    ❌ profile.html - Firebase SDK not found

findstr /m "firebasejs" "frontend\index.html" >nul
if %errorlevel% equ 0 echo    ✅ index.html - Firebase SDK found
if %errorlevel% neq 0 echo    ❌ index.html - Firebase SDK not found

echo.
echo 🔐 Setup Verification Complete!
echo.
echo 📝 Next Steps:
echo 1. Go to https://console.firebase.google.com/
echo 2. Create a new project named 'sankalp-digital-twin'
echo 3. Register a web app and copy the config
echo 4. Update frontend\assets\js\firebase-config.js with your config
echo 5. Enable Email/Password authentication in Firebase Console
echo 6. Create Firestore database in Production mode
echo 7. Deploy Firestore security rules from firestore.rules file
echo 8. Test by opening frontend\login.html in your browser
echo.
echo 📚 Documentation:
echo - FIREBASE_SETUP.md - Detailed setup instructions
echo - INTEGRATION_GUIDE.md - API reference and examples
echo.
pause
