function toggleMenu(){document.getElementById("mainNav")?.classList.toggle("open");}

// Built-in English/Kannada translations for the interface, soil, seasons, weather, and crop names.
const knTranslations = {
  "Home":"ಮುಖಪುಟ", "Dashboard":"ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "Prediction":"ಬೆಳೆ ಸಲಹೆ", "Crop Health":"ಬೆಳೆಯ ಆರೋಗ್ಯ", "History":"ಹಿಂದಿನ ದಾಖಲೆಗಳು", "About":"ಯೋಜನೆಯ ಬಗ್ಗೆ", "Logout":"ಲಾಗ್ ಔಟ್", "Farmer Login":"ರೈತರ ಲಾಗಿನ್",
  "SIMPLE FARMING GUIDANCE":"ಸರಳ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ", "Choose the ":"ಆಯ್ಕೆಮಾಡಿ ", "Right Crop":"ಸರಿಯಾದ ಬೆಳೆ", " for Your Field":" ನಿಮ್ಮ ಹೊಲಕ್ಕೆ", "Choose the Right Crop for Your Field":"ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಸರಿಯಾದ ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
  "Enter your soil type, growing season, and expected weather. AGRIGUIDE uses clear, predefined farming rules to suggest crops that may suit your conditions.":"ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರ, ಬೆಳೆ ಬೆಳೆಯುವ ಕಾಲ ಮತ್ತು ನಿರೀಕ್ಷಿತ ಹವಾಮಾನವನ್ನು ನಮೂದಿಸಿ. ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಗೆ ಹೊಂದುವ ಬೆಳೆಗಳನ್ನು ಸೂಚಿಸಲು AGRIGUIDE ಸರಳ ಕೃಷಿ ನಿಯಮಗಳನ್ನು ಬಳಸುತ್ತದೆ.",
  "Find Suitable Crops →":"ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ →", "Simple inputs":"ಸರಳ ವಿವರಗಳು", "Soil types":"ಮಣ್ಣಿನ ವಿಧಗಳು", "Seasons":"ಋತುಗಳು", "WHY AGRIGUIDE?":"AGRIGUIDE ಏಕೆ?", "Simple inputs. Clear crop suggestions.":"ಸರಳ ವಿವರಗಳು. ಸ್ಪಷ್ಟ ಬೆಳೆ ಸಲಹೆಗಳು.",
  "Soil-Based Suggestions":"ಮಣ್ಣಿನ ಆಧಾರದ ಸಲಹೆಗಳು", "Choose red, sandy, black, clay, loamy, alluvial, or laterite soil to find crops associated with that soil type.":"ಕೆಂಪು, ಮರಳು, ಕಪ್ಪು, ಜೇಡಿ, ಲೋಮಿ, ಮೆಕ್ಕಲು ಅಥವಾ ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣನ್ನು ಆಯ್ಕೆಮಾಡಿ; ಆ ಮಣ್ಣಿಗೆ ಹೊಂದುವ ಬೆಳೆಗಳ ಸಲಹೆ ಪಡೆಯಿರಿ.",
  "Season & Weather Rules":"ಋತು ಮತ್ತು ಹವಾಮಾನದ ನಿಯಮಗಳು", "Recommendations compare your selected season and expected weather with the crop conditions stored in the application.":"ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಋತು ಮತ್ತು ಹವಾಮಾನವನ್ನು ಬೆಳೆಗಳಿಗೆ ಹೊಂದುವ ಪರಿಸ್ಥಿತಿಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ ಸಲಹೆ ನೀಡಲಾಗುತ್ತದೆ.", "Saved History":"ಉಳಿಸಿದ ದಾಖಲೆಗಳು", "Sign in to save recommendations and revisit your previous soil, season, and weather selections.":"ಸಲಹೆಗಳನ್ನು ಉಳಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ. ಹಿಂದಿನ ಮಣ್ಣು, ಋತು ಮತ್ತು ಹವಾಮಾನದ ಆಯ್ಕೆಗಳನ್ನು ಮತ್ತೆ ನೋಡಬಹುದು.",
  "HOW IT WORKS":"ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", "Three easy steps":"ಮೂರು ಸುಲಭ ಹಂತಗಳು", "Select soil":"ಮಣ್ಣನ್ನು ಆಯ್ಕೆಮಾಡಿ", "Choose the main soil type in your field.":"ನಿಮ್ಮ ಹೊಲದ ಮುಖ್ಯ ಮಣ್ಣಿನ ವಿಧವನ್ನು ಆಯ್ಕೆಮಾಡಿ.", "Choose season & weather":"ಋತು ಮತ್ತು ಹವಾಮಾನ ಆಯ್ಕೆಮಾಡಿ", "Tell us when you plan to grow and whether the weather is dry, cloudy, or rainy.":"ಯಾವ ಋತುವಿನಲ್ಲಿ ಬೆಳೆ ಬೆಳೆಯುತ್ತೀರಿ ಮತ್ತು ಹವಾಮಾನ ಒಣ, ಮೋಡ ಅಥವಾ ಮಳೆಯಿದೆಯೇ ಎಂದು ಆಯ್ಕೆಮಾಡಿ.", "View suitable crops":"ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ನೋಡಿ", "Read the rule-based crop suggestions and their matching reasons.":"ನಿಯಮಗಳ ಆಧಾರದ ಬೆಳೆ ಸಲಹೆಗಳನ್ನು ಮತ್ತು ಕಾರಣಗಳನ್ನು ನೋಡಿ.",
  "FARMER ACCESS":"ರೈತರ ಪ್ರವೇಶ", "Welcome back":"ಮತ್ತೆ ಸ್ವಾಗತ", "Login to continue to your AGRIGUIDE dashboard.":"AGRIGUIDE ಮುಂದುವರಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ.", "Phone number":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", "Password":"ಪಾಸ್‌ವರ್ಡ್", "Login":"ಲಾಗಿನ್", "New farmer? ":"ಹೊಸ ರೈತರೇ? ", "Create an account":"ಖಾತೆ ತೆರೆಯಿರಿ", "NEW FARMER":"ಹೊಸ ರೈತರು", "Create your account":"ನಿಮ್ಮ ಖಾತೆ ರಚಿಸಿ", "Your name and prediction history stay connected to your own account.":"ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಬೆಳೆ ಸಲಹೆಗಳ ದಾಖಲೆಗಳು ನಿಮ್ಮ ಖಾತೆಗೆ ಸಂಪರ್ಕವಾಗಿರುತ್ತವೆ.", "Farmer name":"ರೈತರ ಹೆಸರು", "Confirm password":"ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ", "Create Account":"ಖಾತೆ ರಚಿಸಿ", "Already registered? ":"ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿದ್ದೀರಾ? ",
  "CROP RECOMMENDATION":"ಬೆಳೆ ಸಲಹೆ", "Find a suitable crop":"ಸೂಕ್ತ ಬೆಳೆ ಹುಡುಕಿ", "Select your soil type, growing season, and expected weather. AGRIGUIDE uses simple rule-based guidance—no AI or machine-learning model.":"ನಿಮ್ಮ ಮಣ್ಣಿನ ವಿಧ, ಋತು ಮತ್ತು ನಿರೀಕ್ಷಿತ ಹವಾಮಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ. AGRIGUIDE ಸರಳ ನಿಯಮಗಳನ್ನು ಬಳಸುತ್ತದೆ; AI ಅಥವಾ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಬಳಸುವುದಿಲ್ಲ.", "Soil type":"ಮಣ್ಣಿನ ವಿಧ", "Choose the main soil in your field.":"ನಿಮ್ಮ ಹೊಲದ ಮುಖ್ಯ ಮಣ್ಣಿನ ವಿಧ ಆಯ್ಕೆಮಾಡಿ.", "Select soil type":"ಮಣ್ಣಿನ ವಿಧ ಆಯ್ಕೆಮಾಡಿ", "Season":"ಋತು", "Select the season in which you plan to grow the crop.":"ಬೆಳೆ ಬೆಳೆಯಲು ಯೋಜಿಸಿರುವ ಋತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ.", "Growing season":"ಬೆಳೆಯುವ ಋತು", "Select season":"ಋತು ಆಯ್ಕೆಮಾಡಿ", "Weather":"ಹವಾಮಾನ", "Choose the expected weather during the growing period.":"ಬೆಳೆ ಬೆಳೆಯುವ ಅವಧಿಯ ನಿರೀಕ್ಷಿತ ಹವಾಮಾನ ಆಯ್ಕೆಮಾಡಿ.", "Weather condition":"ಹವಾಮಾನದ ಸ್ಥಿತಿ", "Select weather":"ಹವಾಮಾನ ಆಯ್ಕೆಮಾಡಿ", "Dry / Sunny":"ಒಣ / ಬಿಸಿಲು", "Cloudy":"ಮೋಡ ಕವಿದ", "Light Rain":"ಹಗುರ ಮಳೆ", "Moderate Rain":"ಮಧ್ಯಮ ಮಳೆ", "Heavy Rain":"ಭಾರಿ ಮಳೆ", "Reset":"ಮರುಹೊಂದಿಸಿ", "🌱 Recommend Crop":"🌱 ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಿರಿ",
  "PREDICTION COMPLETE":"ಬೆಳೆ ಸಲಹೆ ಸಿದ್ಧವಾಗಿದೆ", "Rule-based match score":"ನಿಯಮಗಳ ಹೊಂದಾಣಿಕೆ ಅಂಕ", "Crop Health":"ಬೆಳೆಯ ಆರೋಗ್ಯ", "Project-level status":"ಯೋಜನೆಯ ಮಟ್ಟದ ಸ್ಥಿತಿ", "Compatibility assessment:":"ಹೊಂದಾಣಿಕೆ ಮೌಲ್ಯಮಾಪನ:", "Suitable Season":"ಸೂಕ್ತ ಋತು", "From project crop profile":"ಬೆಳೆ ಮಾಹಿತಿಯ ಆಧಾರದಲ್ಲಿ", "Other suitable crops":"ಇತರೆ ಸೂಕ್ತ ಬೆಳೆಗಳು", "Other crops matching your selected conditions.":"ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಹೊಂದುವ ಇತರೆ ಬೆಳೆಗಳು.", "Why this crop?":"ಈ ಬೆಳೆ ಏಕೆ?", "Transparent project explanation":"ಸಲಹೆಯ ಕಾರಣ", "Your actual entered values":"ನೀವು ನಮೂದಿಸಿದ ವಿವರಗಳು", "Your selected farm conditions.":"ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಕೃಷಿ ಪರಿಸ್ಥಿತಿಗಳು.", "New Prediction":"ಹೊಸ ಬೆಳೆ ಸಲಹೆ", "View History →":"ಹಿಂದಿನ ದಾಖಲೆಗಳನ್ನು ನೋಡಿ →",
  "FARMER DASHBOARD":"ರೈತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "Ready to make your next crop decision?":"ಮುಂದಿನ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?", "Start Prediction":"ಬೆಳೆ ಸಲಹೆ ಪ್ರಾರಂಭಿಸಿ", "Choose soil, season, and weather to get suitable crop suggestions.":"ಸೂಕ್ತ ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಲು ಮಣ್ಣು, ಋತು ಮತ್ತು ಹವಾಮಾನ ಆಯ್ಕೆಮಾಡಿ.", "Predict now →":"ಈಗ ಸಲಹೆ ಪಡೆಯಿರಿ →", "Review the latest project-level health assessment.":"ಇತ್ತೀಚಿನ ಬೆಳೆಯ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ ನೋಡಿ.", "View health →":"ಆರೋಗ್ಯ ನೋಡಿ →", "Prediction History":"ಬೆಳೆ ಸಲಹೆಗಳ ಇತಿಹಾಸ", "Open history →":"ಇತಿಹಾಸ ತೆರೆಯಿರಿ →", "LAST RECOMMENDATION":"ಕೊನೆಯ ಬೆಳೆ ಸಲಹೆ", "No prediction yet":"ಇನ್ನೂ ಯಾವುದೇ ಸಲಹೆ ಇಲ್ಲ", "Your first prediction will appear here.":"ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆ ಸಲಹೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",
  "YOUR RECORDS":"ನಿಮ್ಮ ದಾಖಲೆಗಳು", "Only predictions belonging to your account are shown.":"ನಿಮ್ಮ ಖಾತೆಯ ಬೆಳೆ ಸಲಹೆಗಳು ಮಾತ್ರ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.", "Clear History":"ಇತಿಹಾಸ ಅಳಿಸಿ", "Date":"ದಿನಾಂಕ", "Crop":"ಬೆಳೆ", "Health":"ಆರೋಗ್ಯ", "No predictions yet":"ಇನ್ನೂ ಯಾವುದೇ ಸಲಹೆ ಇಲ್ಲ", "Run your first crop prediction and it will appear here.":"ಮೊದಲ ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಿರಿ; ಅದು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.", "ABOUT THE PROJECT":"ಯೋಜನೆಯ ಬಗ್ಗೆ", "A crop recommendation website built with HTML, CSS, JavaScript, Python, Flask, and SQLite.":"HTML, CSS, JavaScript, Python, Flask ಮತ್ತು SQLite ಬಳಸಿ ನಿರ್ಮಿಸಿದ ಬೆಳೆ ಸಲಹೆ ವೆಬ್‌ಸೈಟ್.", "How recommendations work":"ಬೆಳೆ ಸಲಹೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", "Website technologies":"ವೆಬ್‌ಸೈಟ್ ತಂತ್ರಜ್ಞಾನಗಳು", "Project limitation":"ಯೋಜನೆಯ ಮಿತಿಗಳು", "Future improvements":"ಮುಂದಿನ ಸುಧಾರಣೆಗಳು",

  // Soil, season, and crop names for farmers using Kannada.
  "Red":"ಕೆಂಪು", "Sandy":"ಮರಳು ಮಣ್ಣು", "Black":"ಕಪ್ಪು ಮಣ್ಣು", "Clay":"ಜೇಡಿ ಮಣ್ಣು", "Loamy":"ಲೋಮಿ ಮಣ್ಣು", "Alluvial":"ಮೆಕ್ಕಲು ಮಣ್ಣು", "Laterite":"ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು",
  "Red soil":"ಕೆಂಪು ಮಣ್ಣು", "Sandy soil":"ಮರಳು ಮಣ್ಣು", "Black soil":"ಕಪ್ಪು ಮಣ್ಣು", "Clay soil":"ಜೇಡಿ ಮಣ್ಣು", "Loamy soil":"ಲೋಮಿ ಮಣ್ಣು", "Alluvial soil":"ಮೆಕ್ಕಲು ಮಣ್ಣು", "Laterite soil":"ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು",
  "All-round":"ವರ್ಷಪೂರ್ತಿ", "Kharif":"ಮುಂಗಾರು (ಖರೀಫ್)", "Rabi":"ಹಿಂಗಾರು (ರಬಿ)", "Zaid":"ಬೇಸಿಗೆ (ಜೈದ್)",
  "Rice":"ಭತ್ತ", "Maize":"ಮೆಕ್ಕೆಜೋಳ", "Ragi (Finger Millet)":"ರಾಗಿ", "Groundnut":"ಕಡಲೆಕಾಯಿ", "Pigeon Pea (Toor Dal)":"ತೊಗರಿ", "Green Gram":"ಹೆಸರುಕಾಳು", "Cotton":"ಹತ್ತಿ", "Jowar (Sorghum)":"ಜೋಳ", "Banana":"ಬಾಳೆಹಣ್ಣು", "Watermelon":"ಕಲ್ಲಂಗಡಿ", "Chickpea (Bengal Gram)":"ಕಡಲೆಕಾಳು", "Coffee":"ಕಾಫಿ",
  "Rice generally needs warm conditions and a reliable water supply.":"ಭತ್ತಕ್ಕೆ ಸಾಮಾನ್ಯವಾಗಿ ಬೆಚ್ಚಗಿನ ವಾತಾವರಣ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಅಗತ್ಯ.",
  "Maize often suits well-drained soil with moderate rainfall.":"ಮಧ್ಯಮ ಮಳೆ ಮತ್ತು ನೀರು ಚೆನ್ನಾಗಿ ಹರಿದುಹೋಗುವ ಮಣ್ಣು ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
  "Ragi is commonly grown in parts of Karnataka and can tolerate comparatively drier conditions.":"ರಾಗಿ ಕರ್ನಾಟಕದ ಹಲವು ಭಾಗಗಳಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ ಮತ್ತು ಕಡಿಮೆ ತೇವಾಂಶವನ್ನೂ ಸಹಿಸಬಲ್ಲದು.",
  "Groundnut generally prefers loose, well-drained soil and avoids waterlogging.":"ಕಡಲೆಕಾಯಿಗೆ ಸಡಿಲವಾದ, ನೀರು ಚೆನ್ನಾಗಿ ಹರಿಯುವ ಮಣ್ಣು ಸೂಕ್ತ; ನೀರು ನಿಂತುಕೊಳ್ಳಬಾರದು.",
  "Pigeon pea can suit warm conditions and moderate rainfall.":"ತೊಗರಿಗೆ ಬೆಚ್ಚಗಿನ ವಾತಾವರಣ ಮತ್ತು ಮಧ್ಯಮ ಮಳೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
  "Green gram often suits well-drained soils and moderate moisture.":"ಹೆಸರುಕಾಳಿಗೆ ನೀರು ಚೆನ್ನಾಗಿ ಹರಿಯುವ ಮಣ್ಣು ಮತ್ತು ಮಧ್ಯಮ ತೇವಾಂಶ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
  "Cotton is commonly associated with warm growing conditions and well-drained soil.":"ಹತ್ತಿಗೆ ಬೆಚ್ಚಗಿನ ವಾತಾವರಣ ಮತ್ತು ನೀರು ಚೆನ್ನಾಗಿ ಹರಿಯುವ ಮಣ್ಣು ಸೂಕ್ತವಾಗಿರಬಹುದು.",
  "Jowar is a useful dryland cereal in many parts of India.":"ಜೋಳವು ಭಾರತದ ಹಲವು ಭಾಗಗಳಲ್ಲಿ ಒಣಭೂಮಿಗೆ ಸೂಕ್ತವಾದ ಧಾನ್ಯ ಬೆಳೆ.",
  "Banana generally needs fertile soil, warmth, and regular moisture.":"ಬಾಳೆಗೆ ಫಲವತ್ತಾದ ಮಣ್ಣು, ಬೆಚ್ಚಗಿನ ವಾತಾವರಣ ಮತ್ತು ನಿಯಮಿತ ತೇವಾಂಶ ಬೇಕಾಗುತ್ತದೆ.",
  "Watermelon often suits warm weather and loose, well-drained soil.":"ಕಲ್ಲಂಗಡಿಗೆ ಬೆಚ್ಚಗಿನ ವಾತಾವರಣ ಮತ್ತು ಸಡಿಲವಾದ, ನೀರು ಹರಿಯುವ ಮಣ್ಣು ಸೂಕ್ತವಾಗಿರಬಹುದು.",
  "Chickpea is generally a cool-season crop that needs limited to moderate moisture.":"ಕಡಲೆಕಾಳು ಸಾಮಾನ್ಯವಾಗಿ ತಂಪಾದ ಋತುವಿನಲ್ಲಿ ಬೆಳೆಯುವ ಬೆಳೆ; ಇದಕ್ಕೆ ಕಡಿಮೆ ಅಥವಾ ಮಧ್ಯಮ ತೇವಾಂಶ ಬೇಕಾಗುತ್ತದೆ.",
  "Coffee is grown in suitable upland areas with shade and reliable rainfall.":"ಕಾಫಿಯನ್ನು ನೆರಳು ಮತ್ತು ನಿರಂತರ ಮಳೆಯಿರುವ ಸೂಕ್ತ ಎತ್ತರದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ.",
  "Soil selected: ":"ಆಯ್ಕೆ ಮಾಡಿದ ಮಣ್ಣು: ", "Season selected: ":"ಆಯ್ಕೆ ಮಾಡಿದ ಋತು: ", "Weather selected: ":"ಆಯ್ಕೆ ಮಾಡಿದ ಹವಾಮಾನ: ",
  "This crop matched ":"ಈ ಬೆಳೆ ಹೊಂದಿಕೆಯಾದ ವಿವರಗಳು: ", " of the 3 selected conditions.":" / 3.",
  "That page could not be found.":"ಆ ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ.", "Go Home":"ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ", "Something went wrong on the server. Please try again.":"ಸರ್ವರ್‌ನಲ್ಲಿ ತೊಂದರೆ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", "Logout":"ಲಾಗ್ ಔಟ್"
};

function translatePage(language){
  const button=document.getElementById("languageToggle");
  const toKannada=language==="kn";
  document.documentElement.lang=toKannada?"kn":"en";
  if(button) button.textContent=toKannada?"English":"ಕನ್ನಡ";
  const entries=Object.entries(knTranslations).sort((a,b)=>b[0].length-a[0].length);
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    if(!node.parentElement || ["SCRIPT","STYLE"].includes(node.parentElement.tagName)) return;
    let value=node.nodeValue;
    if(toKannada){
      // Save original text so repeated toggles never translate translated text.
      if(!node.__englishText) node.__englishText=value;
      value=node.__englishText;
      for(const [en,kn] of entries) value=value.split(en).join(kn);
    } else if(node.__englishText){ value=node.__englishText; }
    node.nodeValue=value;
  });
  document.querySelectorAll("select option").forEach(option=>{
    if(!option.dataset.englishLabel) option.dataset.englishLabel=option.textContent;
    option.textContent=toKannada?(knTranslations[option.dataset.englishLabel]||option.dataset.englishLabel):option.dataset.englishLabel;
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  const language=localStorage.getItem("agriguideLanguage")||"en";
  translatePage(language);
  document.getElementById("languageToggle")?.addEventListener("click",()=>{
    const next=(localStorage.getItem("agriguideLanguage")||"en")==="en"?"kn":"en";
    localStorage.setItem("agriguideLanguage",next);
    location.reload();
  });
  const form=document.getElementById("cropForm");
  const btn=document.getElementById("predictBtn");
  if(form&&btn){form.addEventListener("submit",()=>{btn.disabled=true;btn.innerHTML=(localStorage.getItem("agriguideLanguage")==="kn"?"⏳ ಸಲಹೆ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...":"⏳ Generating prediction...");});}
  const reset=document.getElementById("resetBtn");
  if(reset){reset.addEventListener("click",()=>{setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),50);});}
});
