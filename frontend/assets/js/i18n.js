// i18n.js - Internationalization and Localization Module
// Supports top 10 Indian languages

const LANGUAGES = {
  'en': { name: 'English', flag: '🇬🇧', nativeName: 'English' },
  'hi': { name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
  'bn': { name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  'te': { name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
  'mr': { name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
  'ta': { name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
  'gu': { name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
  'ur': { name: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  'kn': { name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
  'ml': { name: 'Malayalam', flag: '🇮🇳', nativeName: 'മലയാളം' }
};

const TRANSLATIONS = {
  // Common Terms
  'home': {
    'en': 'Home',
    'hi': 'होम',
    'bn': 'বাড়ি',
    'te': 'హోమ్',
    'mr': 'होम',
    'ta': 'வீடு',
    'gu': 'બધું',
    'ur': 'ہوم',
    'kn': 'ಮನೆ',
    'ml': 'വീട്'
  },
  
  // Navigation
  'dashboard': {
    'en': 'Dashboard',
    'hi': 'डैशबोर्ड',
    'bn': 'ড্যাশবোর্ড',
    'te': 'డ్యాష్‌బోర్డ్',
    'mr': 'डॅशबोर्ड',
    'ta': 'டாஷ்போர்டு',
    'gu': 'ડેશબોર્ડ',
    'ur': 'ڈیش بورڈ',
    'kn': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'ml': 'ഡാഷ്‌ബോര്‍ഡ്'
  },

  'map_area': {
    'en': 'Map & Area',
    'hi': 'नक्शा और क्षेत्र',
    'bn': 'মানচিত্র এবং এলাকা',
    'te': 'మ్యాప్ మరియు ప్రాంతం',
    'mr': 'नकाशा आणि क्षेत्र',
    'ta': 'வரைபடம் மற்றும் பகுதி',
    'gu': 'નકશો અને વિસ્તાર',
    'ur': 'نقشہ اور علاقہ',
    'kn': 'ನಕ್ಷೆ ಮತ್ತು ಪ್ರದೇಶ',
    'ml': 'ഭൂപടം ഒപ്പം പ്രദേശം'
  },

  'analytics': {
    'en': 'Analytics',
    'hi': 'विश्लेषण',
    'bn': 'বিশ্লেষণ',
    'te': 'విశ్లేషణ',
    'mr': 'विश्लेषण',
    'ta': 'பகுப்பாய்வு',
    'gu': 'વિશ્લેષણ',
    'ur': 'تجزیہ',
    'kn': 'ವಿಶ್ಲೇಷಣೆ',
    'ml': 'വിശകലനം'
  },

  'weather': {
    'en': 'Weather',
    'hi': 'मौसम',
    'bn': 'আবহাওয়া',
    'te': 'వాతావరణం',
    'mr': 'हवामान',
    'ta': 'வானிலை',
    'gu': 'હવામાન',
    'ur': 'موسم',
    'kn': 'ಹವಾಮಾನ',
    'ml': 'കാലാവസ്ഥ'
  },

  'weather-search': {
    'en': 'Weather Search',
    'hi': 'मौसम खोज',
    'bn': 'আবহাওয়া অনুসন্ধান',
    'te': 'వాతావరణ శోధన',
    'mr': 'हवामान शोध',
    'ta': 'வானிலை தேடல்',
    'gu': 'હવામાન શોધ',
    'ur': 'موسم تلاش',
    'kn': 'ಹವಾಮಾನ ಹುಡುಕು',
    'ml': 'കാലാവസ്ഥ തിരയൽ'
  },

  'soil': {
    'en': 'Soil Analysis',
    'hi': 'मृदा विश्लेषण',
    'bn': 'মাটি বিশ্লেষণ',
    'te': 'మట్టి విశ్లేషణ',
    'mr': 'माती विश्लेषण',
    'ta': 'மண் பகுப்பாய்வு',
    'gu': 'માટી વિશ્લેષણ',
    'ur': 'مٹی کا تجزیہ',
    'kn': 'ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ',
    'ml': 'മണ്ണ് വിശകലനം'
  },

  'playbook': {
    'en': 'Playbook',
    'hi': 'प्लेबुक',
    'bn': 'প্লেবুক',
    'te': 'ప్లేబుక్',
    'mr': 'प्लेबुक',
    'ta': 'பிளேபுக்',
    'gu': 'પ્લેબુક',
    'ur': 'پلے بک',
    'kn': 'ಪ್ಲೇಬುಕ್',
    'ml': 'പ്ലേബുക്'
  },

  'farming_playbook': {
    'en': 'Farming Playbook',
    'hi': 'कृषि प्लेबुक',
    'bn': 'কৃষি প্লেবুক',
    'te': 'వ్యవసాయ ప్లేబుక్',
    'mr': 'कृषी प्लेबुक',
    'ta': 'விவசाய பிளேபுக்',
    'gu': 'ખેતી પ્લેબુક',
    'ur': 'زراعت پلے بک',
    'kn': 'ಕೃಷಿ ಪ್ಲೇಬುಕ್',
    'ml': 'കൃഷി പ്ലേബുക്'
  },

  'best_practices': {
    'en': 'Best practices for successful farming',
    'hi': 'सफल खेती के लिए सर्वोत्तम प्रथाएं',
    'bn': 'সফল চাষাবাদের জন্য সেরা অনুশীলন',
    'te': 'విజయవంతమైన వ్యవసాయం కోసం ఉత్తమ పద్ధతులు',
    'mr': 'यशस्वी शेती साठी सर्वोत्तम पद्धती',
    'ta': 'வெற்றிகரமైన விவசாயத்திற்கான சிறந்த நடைமுறைகள்',
    'gu': 'સફળ ખેતી માટે શ્રેષ્ठ પદ્ધતિઓ',
    'ur': 'کامیاب زراعت کے لیے بہترین طریقے',
    'kn': 'ಯಶಸ್ವಿ ಕೃಷಿಗಾಗಿ ಅತ್ಯುತ್ತಮ ಅಭ್ಯಾಸಗಳು',
    'ml': 'വിജയകരമായ കൃഷിയ്ക്കുള്ള ഉത്തമ പ്രയോഗങ്ങൾ'
  },

  'profile': {
    'en': 'Profile',
    'hi': 'प्रोफाइल',
    'bn': 'প্রোফাইল',
    'te': 'ప్రొఫైల్',
    'mr': 'प्रोफाइल',
    'ta': 'சுயவிவரம்',
    'gu': 'પ્રોફાઇલ',
    'ur': 'پروفائل',
    'kn': 'ಪ್ರೊಫೈಲ್',
    'ml': 'പ്രൊഫൈല്‍'
  },

  'logout': {
    'en': 'Logout',
    'hi': 'लॉगआउट',
    'bn': 'লগআউট',
    'te': 'లాగ్‌అవుట్',
    'mr': 'लॉगआउट',
    'ta': 'வெளியேறு',
    'gu': 'લૉગઆઉટ',
    'ur': 'لاگ آؤٹ',
    'kn': 'ಲಾಗ್‌ಔಟ್',
    'ml': 'ലോഗ്‌ഔട്ട്'
  },

  'sankalp': {
    'en': 'AgriPuls',
    'hi': 'एग्रीपल्स',
    'bn': 'এগ্রিপালস',
    'te': 'అగ్రిపల్స్',
    'mr': 'एग्रीपल्स',
    'ta': 'அக்ரிபல்ஸ்',
    'gu': 'એગ્રીપલ્સ',
    'ur': 'ایگری پلس',
    'kn': 'ಅಗ್ರಿಪಲ್ಸ್',
    'ml': 'അഗ്രിപൽസ്'
  },

  'digital_twin': {
    'en': 'Digital Twin',
    'hi': 'डिजिटल जुड़वां',
    'bn': 'ডিজিটাল টুইন',
    'te': 'డిజిటల్ ట్విన్',
    'mr': 'डिजिटल ट्विन',
    'ta': 'டிஜிட்டல் இரட்டை',
    'gu': 'ડિજિટલ ટ્વિન',
    'ur': 'ڈیجیٹل ٹوائن',
    'kn': 'ಡಿಜಿಟಲ್ ಟ್ವಿನ್',
    'ml': 'ഡിജിറ്റൽ ട്വിന്‍'
  },

  // Login/Auth
  'sign_in': {
    'en': 'Sign In',
    'hi': 'साइन इन करें',
    'bn': 'সাইন ইন করুন',
    'te': 'సైన్ ఇన్',
    'mr': 'साइन इन करा',
    'ta': 'உள்நுழைக',
    'gu': 'સાઇન ઇન કરો',
    'ur': 'سائن ان کریں',
    'kn': 'ಸೈನ್ ಇನ್',
    'ml': 'സൈൻ ഇൻ ചെയ്യുക'
  },

  'create_account': {
    'en': 'Create Account',
    'hi': 'खाता बनाएं',
    'bn': 'অ্যাকাউন্ট তৈরি করুন',
    'te': 'ఖాతా సృష్టించండి',
    'mr': 'खाते तयार करा',
    'ta': 'கணக்கை உருவாக்கவும்',
    'gu': 'ખાતું બનાવો',
    'ur': 'اکاؤنٹ بنائیں',
    'kn': 'ಖಾತೆ ರಚಿಸಿ',
    'ml': 'അക്കൗണ്ട് സൃഷ്ടിക്കുക'
  },

  'email': {
    'en': 'Email Address',
    'hi': 'ईमेल पता',
    'bn': 'ইমেল ঠিকানা',
    'te': 'ఈమెయిల్ చిరునామా',
    'mr': 'ईमेल पता',
    'ta': 'மின்னஞ்சல் முகவரி',
    'gu': 'ઇમેલ સરનામું',
    'ur': 'ای میل پتہ',
    'kn': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'ml': 'ഇമെയിൽ വിലാസം'
  },

  'password': {
    'en': 'Password',
    'hi': 'पासवर्ड',
    'bn': 'পাসওয়ার্ড',
    'te': 'పాస్‌వర్డ్',
    'mr': 'पासवर्ड',
    'ta': 'கடவுச்சொல்',
    'gu': 'પાસવર્ડ',
    'ur': 'پاس ورڈ',
    'kn': 'ಪಾಸ್‌ವರ್ಡ್',
    'ml': 'പാസ്‌വേഡ്'
  },

  'full_name': {
    'en': 'Full Name',
    'hi': 'पूरा नाम',
    'bn': 'সম্পূর্ণ নাম',
    'te': 'పూర్తి పేరు',
    'mr': 'पूरा नाव',
    'ta': 'முழு பெயர்',
    'gu': 'સંપૂર્ણ નામ',
    'ur': 'مکمل نام',
    'kn': 'ಪೂರ್ಣ ಹೆಸರು',
    'ml': 'പൂർണ്ണ നാമം'
  },

  'phone': {
    'en': 'Phone Number',
    'hi': 'फोन नंबर',
    'bn': 'ফোন নম্বর',
    'te': 'ఫోన్ నంబర్',
    'mr': 'फोन नंबर',
    'ta': 'தொலைபேசி எண்',
    'gu': 'ફોન નંબર',
    'ur': 'فون نمبر',
    'kn': 'ಫೋನ್ ಸಂಖ್ಯೆ',
    'ml': 'ഫോൺ നമ്പർ'
  },

  'location': {
    'en': 'Farm Location',
    'hi': 'खेत की स्थिति',
    'bn': 'খামার অবস্থান',
    'te': 'గ్రామ ప్రదేశ',
    'mr': 'शेत स्थान',
    'ta': 'பண்ணை இருப்பிடம்',
    'gu': 'ખેતરનું સ્થાન',
    'ur': 'کھیت کی جگہ',
    'kn': 'ಹೊಲದ ಸ್ಥಾನ',
    'ml': 'കൃഷിയിടത്തിന്റെ സ്ഥാനം'
  },

  'remember_me': {
    'en': 'Remember me',
    'hi': 'याद रखें',
    'bn': 'আমাকে মনে রাখুন',
    'te': 'నన్ను గుర్తుపెట్టుకోండి',
    'mr': 'मला लक्षात ठेवा',
    'ta': 'என்னை நினைவில் வைத்துக்கொள்ளுங்கள்',
    'gu': 'મને યાદ રાખો',
    'ur': 'مجھے یاد رکھیں',
    'kn': 'ಮನೆ ನೋಡಿಕೊಳ್ಳಿ',
    'ml': 'എന്നെ ശ്രദ്ധിക്കുക'
  },

  'try_demo': {
    'en': 'Try Demo Account',
    'hi': 'डेमो खाता आज़माएं',
    'bn': 'ডেমো অ্যাকাউন্ট চেষ্টা করুন',
    'te': 'డెమో ఖాతాను ప్రయత్నించండి',
    'mr': 'डेमो खाते चेष्टा करा',
    'ta': 'டெமோ கணக்கை முயற்சி செய்யவும்',
    'gu': 'ડેમો એકાઉન્ટ ટ્રાય કરો',
    'ur': 'ڈیمو اکاؤنٹ آزمائیں',
    'kn': 'ಡೆಮೋ ಖಾತೆ ಪ್ರಯತ್ನಿಸಿ',
    'ml': 'ഡെമോ അക്കൗണ്ട്시도ിക്കുക'
  },

  // Dashboard
  'draw_farm_area': {
    'en': '📍 Draw Your Farm Area',
    'hi': '📍 अपना खेत क्षेत्र खींचें',
    'bn': '📍 আপনার খামার এলাকা আঁকুন',
    'te': '📍 మీ గ్రామ ప్రదేశాన్ని గీయండి',
    'mr': '📍 आपला शेत क्षेत्र काढा',
    'ta': '📍 உங்கள் பண்ணை பகுதியை வரையவும்',
    'gu': '📍 તમારા ખેતરનું ક્ષેત્ર દોરો',
    'ur': '📍 اپنے کھیت کا علاقہ کھینچیں',
    'kn': '📍 ನಿಮ್ಮ ಹೊಲದ ಪ್ರದೇಶವನ್ನು ಎಳೆಯಿರಿ',
    'ml': '📍 നിങ്ങളുടെ പയർ പ്രദേശം വരയ്ക്കുക'
  },

  'farm_analytics': {
    'en': '📊 Farm Analytics & Reports',
    'hi': '📊 खेत विश्लेषण और रिपोर्ट',
    'bn': '📊 খামার বিশ্লেষণ এবং প্রতিবেদন',
    'te': '📊 గ్రామ విశ్లేషణ మరియు నివేదనలు',
    'mr': '📊 शेत विश्लेषण आणि अहवाल',
    'ta': '📊 பண்ணை பகுப்பாய்வு மற்றும் அறிக்கைகள்',
    'gu': '📊 ખેતર વિશ્લેષણ અને અહેવાલ',
    'ur': '📊 کھیت کی تجزیہ اور رپورٹیں',
    'kn': '📊 ಹೊಲದ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವರದಿಗಳು',
    'ml': '📊 കൃഷിയിടത്തിന്റെ വിശകലനം ഒപ്പം റിപ്പോർട്ടുകൾ'
  },

  'weather_data': {
    'en': '🌤️ Weather Data',
    'hi': '🌤️ मौसम डेटा',
    'bn': '🌤️ আবহাওয়া ডেটা',
    'te': '🌤️ వాతావరణ డేటా',
    'mr': '🌤️ हवामान डेटा',
    'ta': '🌤️ வானிலை தரவு',
    'gu': '🌤️ હવામાન ડેટા',
    'ur': '🌤️ موسم کا ڈیٹا',
    'kn': '🌤️ ಹವಾಮಾನ ಡೇಟಾ',
    'ml': '🌤️ കാലാവസ്ഥ ഡേറ്റ'
  },

  'language': {
    'en': 'Language',
    'hi': 'भाषा',
    'bn': 'ভাষা',
    'te': 'భాష',
    'mr': 'भाषा',
    'ta': 'மொழி',
    'gu': 'ભાષા',
    'ur': 'زبان',
    'kn': 'ಭಾಷೆ',
    'ml': 'ഭാഷ'
  },

  'export_report': {
    'en': '📥 Export Report',
    'hi': '📥 रिपोर्ट निर्यात करें',
    'bn': '📥 রিপোর্ট রপ্তানি করুন',
    'te': '📥 నివేదనను ఎగుమతి చేయండి',
    'mr': '📥 अहवाल निर्यात करा',
    'ta': '📥 அறிக்கை ஏற்றுமதி செய்யவும்',
    'gu': '📥 અહેવાલ નિકાસ કરો',
    'ur': '📥 رپورٹ درآمد کریں',
    'kn': '📥 ವರದಿಯನ್ನು ರಫ್ತು ಮಾಡಿ',
    'ml': '📥 റിപ്പോർട്ട് ഉയർത്തുക'
  },

  'print': {
    'en': '🖨️ Print',
    'hi': '🖨️ प्रिंट करें',
    'bn': '🖨️ মুদ্রণ করুন',
    'te': '🖨️ ముద్రణ చేయండి',
    'mr': '🖨️ मुद्रण करा',
    'ta': '🖨️ அச்சிடுக',
    'gu': '🖨️ છાપો',
    'ur': '🖨️ پرنٹ کریں',
    'kn': '🖨️ ಮುದ್ರಿಸಿ',
    'ml': '🖨️ പ്രിന്റ് ചെയ്യുക'
  },

  'draw_farm_area_text': {
    'en': 'Draw Your Farm Area',
    'hi': 'अपना खेत क्षेत्र खींचें',
    'bn': 'আপনার খামার এলাকা আঁকুন',
    'te': 'మీ గ్రామ ప్రదేశాన్ని గీయండి',
    'mr': 'आपला शेत क्षेत्र काढा',
    'ta': 'உங்கள் பண்ணை பகுதியை வரையவும்',
    'gu': 'તમારા ખેતરનું ક্ષેત્ર દોરો',
    'ur': 'اپنے کھیت کا علاقہ کھینچیں',
    'kn': 'ನಿಮ್ಮ ಹೊಲದ ಪ್ರದೇಶವನ್ನು ಎಳೆಯಿರಿ',
    'ml': 'നിങ്ങളുടെ പയർ പ്രദേശം വരയ്ക്കുക'
  },

  'farm_analytics_text': {
    'en': 'Farm Analytics & Reports',
    'hi': 'खेत विश्लेषण और रिपोर्ट',
    'bn': 'খামার বিশ্লেষণ এবং প্রতিবেদন',
    'te': 'గ్రామ విశ్లేషణ మరియు నివేదనలు',
    'mr': 'शेत विश्लेषण आणि अहवाल',
    'ta': 'பண்ணை பகுப்பாய்வு மற்றும் அறிக்கைகள்',
    'gu': 'ખેતર વિશ્લેષણ અને અહેવાલ',
    'ur': 'کھیت کی تجزیہ اور رپورٹیں',
    'kn': 'ಹೊಲದ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವರದಿಗಳು',
    'ml': 'കൃഷിയിടത്തിന്റെ വിശകലനം ഒപ്പം റിപ്പോർട്ടുകൾ'
  },

  'weather_search_text': {
    'en': 'Weather Search',
    'hi': 'मौसम खोज',
    'bn': 'আবহাওয়া অনুসন্ধান',
    'te': 'వాతావరణ శోధన',
    'mr': 'हवामान शोध',
    'ta': 'வானிலை தேடல்',
    'gu': 'હવામાન શોધ',
    'ur': 'موسم تلاش',
    'kn': 'ಹವಾಮಾನ ಹುಡುಕು',
    'ml': 'കാലാവസ്ഥ തിരയൽ'
  },

  'soil_text': {
    'en': 'Soil Analysis',
    'hi': 'मृदा विश्लेषण',
    'bn': 'মাটি বিশ্লেষণ',
    'te': 'మట్టి విశ్లేషణ',
    'mr': 'माती विश्लेषण',
    'ta': 'மண் பகுப்பாய்வு',
    'gu': 'માટી વિશ્લેષણ',
    'ur': 'مٹی کا تجزیہ',
    'kn': 'ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ',
    'ml': 'മണ്ണ് വിശകലനം'
  }
};

/**
 * Get current language
 */
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'en';
}

/**
 * Set language
 */
function setLanguage(lang) {
  if (!LANGUAGES[lang]) return;
  localStorage.setItem('language', lang);
  
  // Apply translations before reload
  applyFullTranslations();
  
  // Small delay to show change, then reload for complete translation
  setTimeout(() => {
    location.reload();
  }, 300);
}

/**
 * Get translation
 */
function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  if (TRANSLATIONS[key] && TRANSLATIONS[key][currentLang]) {
    return TRANSLATIONS[key][currentLang];
  }
  return TRANSLATIONS[key]?.['en'] || key;
}

/**
 * Apply translations to entire page
 */
function applyTranslations() {
  const lang = getCurrentLanguage();
  
  // Translate elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key, lang);
    
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });

  // Translate innerHTML attributes
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const translation = t(key, lang);
    el.innerHTML = translation;
  });

  // Translate specific elements by class/ID based on content
  const translationMap = {
    'dashboard-title': { text: 'Dashboard' },
    'analytics-title': { text: 'Analytics' },
    'weather-title': { text: 'Weather' },
    'soil-analysis-title': { text: 'Soil Analysis' },
    'profile-link': { key: 'profile' },
    'logout-btn': { key: 'logout' },
    'sankalp-title': { key: 'sankalp' }
  };

  // Apply sidebar translations
  document.querySelectorAll('.sidebar-item').forEach((el, idx) => {
    const sections = ['map_area', 'analytics', 'weather', 'weather-search', 'analysis', 'playbook'];
    if (sections[idx]) {
      const translated = t(sections[idx], lang);
      if (el.textContent.trim()) {
        const span = el.querySelector('span');
        if (span) span.textContent = translated;
      }
    }
  });

  // Set document language
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ur' || lang === 'ar') ? 'rtl' : 'ltr';
}

/**
 * Translate page fully by replacing known text patterns
 */
function translatePageText(lang) {
  const textReplacements = [
    // Dashboard sidebar text (without emojis)
    { from: 'Map & Area', to: t('map_area', lang) },
    { from: 'Analytics', to: t('analytics', lang) },
    { from: 'Weather Data', to: t('weather_data', lang) },
    { from: 'Weather Search', to: t('weather-search', lang) },
    { from: 'Soil Analysis', to: t('soil', lang) },
    { from: 'Playbook', to: t('playbook', lang) },
    
    // Headers with emojis (exact match replacement)
    { from: '📊 Farm Analytics & Reports', to: t('farm_analytics', lang) },
    { from: '📍 Draw Your Farm Area', to: t('draw_farm_area', lang) },
    { from: '🌤️ Weather Data', to: t('weather_data', lang) },
    { from: '🔍 Weather Search', to: t('weather-search', lang) },
    { from: '🧪 Soil Analysis', to: t('soil', lang) },
    
    // Top bar
    { from: 'Profile', to: t('profile', lang) },
    { from: 'Logout', to: t('logout', lang) },
  ];

  // Deep walk through ALL text nodes - don't skip any
  function walkAndReplace(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      if (!text || !text.trim()) return;
      
      let changed = false;
      
      // Apply each replacement in order (longer strings first to avoid partial replacements)
      for (const replacement of textReplacements) {
        if (text.includes(replacement.from) && replacement.to !== replacement.from) {
          const newText = text.split(replacement.from).join(replacement.to);
          if (newText !== text) {
            text = newText;
            changed = true;
          }
        }
      }
      
      if (changed) {
        node.textContent = text;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
      // Recursively process all children
      const children = Array.from(node.childNodes);
      for (const child of children) {
        walkAndReplace(child);
      }
    }
  }

  // Start from body
  if (document.body) {
    walkAndReplace(document.body);
  }
}

/**
 * Apply all translations comprehensively
 */
function applyFullTranslations() {
  const lang = getCurrentLanguage();
  
  // First apply data-i18n translations
  applyTranslations();
  
  // Then replace all remaining text nodes
  if (document.body) {
    translatePageText(lang);
  }
}

/**
 * Create language switcher button
 */
function createLanguageSwitcher() {
  const currentLang = getCurrentLanguage();
  const currentLangName = LANGUAGES[currentLang];

  let html = `
    <div class="language-switcher">
      <button class="lang-toggle" onclick="toggleLanguageMenu()">
        <span class="lang-flag">${currentLangName.flag}</span>
        <span class="lang-name">${currentLangName.nativeName}</span>
        <span class="lang-arrow">▼</span>
      </button>
      <div class="lang-menu" id="langMenu" style="display: none;">
  `;

  Object.entries(LANGUAGES).forEach(([code, lang]) => {
    const isActive = code === currentLang ? 'active' : '';
    html += `
      <button class="lang-option ${isActive}" onclick="setLanguage('${code}')">
        <span class="lang-flag">${lang.flag}</span>
        <span>${lang.nativeName}</span>
      </button>
    `;
  });

  html += `
      </div>
    </div>
  `;

  return html;
}

/**
 * Toggle language menu
 */
function toggleLanguageMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  }
}

// Close language menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.language-switcher')) {
    const menu = document.getElementById('langMenu');
    if (menu) menu.style.display = 'none';
  }
});

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', () => {
  applyFullTranslations();
});
