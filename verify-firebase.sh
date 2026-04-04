#!/bin/bash
# Firebase Integration Verification Script
# Run this to verify Firebase setup and configuration

echo "🌾 Sankalp Firebase Integration Verification"
echo "=============================================="
echo ""

# Check if Firebase config file exists
echo "1️⃣  Checking Firebase configuration file..."
if [ -f "frontend/assets/js/firebase-config.js" ]; then
    echo "   ✅ firebase-config.js found"
    
    # Check if config has placeholder values
    if grep -q "REPLACE_ME\|REPLACE\|Demo" "frontend/assets/js/firebase-config.js"; then
        echo "   ⚠️  WARNING: firebase-config.js still has placeholder values"
        echo "   → Update with real credentials from Firebase Console"
    else
        echo "   ✅ Configuration appears to have real values"
    fi
else
    echo "   ❌ firebase-config.js not found"
fi

echo ""

# Check if all necessary JS files exist
echo "2️⃣  Checking Firebase module files..."
FILES=(
    "frontend/assets/js/firebase-config.js"
    "frontend/assets/js/firestore-operations.js"
    "frontend/assets/js/firebase-auth.js"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $(basename $file)"
    else
        echo "   ❌ $(basename $file) missing"
    fi
done

echo ""

# Check if documentation files exist
echo "3️⃣  Checking documentation..."
DOCS=(
    "FIREBASE_SETUP.md"
    "INTEGRATION_GUIDE.md"
    "firebase.json"
    "firestore.rules"
    ".firebaserc"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo "   ✅ $doc"
    else
        echo "   ⚠️  $doc not found"
    fi
done

echo ""

# Check HTML files for Firebase SDK
echo "4️⃣  Checking Firebase SDK integration in HTML..."
HTML_FILES=(
    "frontend/login.html"
    "frontend/dashboard.html"
    "frontend/profile.html"
    "frontend/index.html"
)

for html in "${HTML_FILES[@]}"; do
    if grep -q "firebasejs" "$html" 2>/dev/null; then
        echo "   ✅ $(basename $html) - Firebase SDK found"
    else
        echo "   ❌ $(basename $html) - Firebase SDK not found"
    fi
done

echo ""
echo "🔐 Setup Verification Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Go to https://console.firebase.google.com/"
echo "2. Create a new project named 'sankalp-digital-twin'"
echo "3. Register a web app and copy the config"
echo "4. Update frontend/assets/js/firebase-config.js with your config"
echo "5. Enable Email/Password authentication in Firebase Console"
echo "6. Create Firestore database in Production mode"
echo "7. Deploy Firestore security rules from firestore.rules file"
echo "8. Test by opening frontend/login.html in your browser"
echo ""
echo "📚 Documentation:"
echo "- FIREBASE_SETUP.md - Detailed setup instructions"
echo "- INTEGRATION_GUIDE.md - API reference and examples"
echo ""
