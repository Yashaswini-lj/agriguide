# AGRIGUIDE — Rule-Based Crop Recommendation System

A beginner-friendly Flask project that recommends suitable crops from three farmer inputs: soil type, growing season, and expected weather. It does not use AI, machine learning, scikit-learn, or a trained model. Recommendations use transparent, editable Python rules.

## Requirements
- Python 3.10 or newer
- Flask

## Run on Windows / VS Code
1. Extract this ZIP.
2. Open the `agriguide` folder in VS Code.
3. Open Terminal in VS Code.
4. Run `python -m pip install -r requirements.txt`.
5. Run `python app.py`.
6. Open `http://127.0.0.1:5000` in your browser.
7. Register a farmer account, log in, and open Prediction.

## Inputs
- Soil: Red, Sandy, Black, Clay, Loamy, Alluvial, Laterite
- Season: All-round, Kharif, Rabi, Zaid
- Weather: Dry / Sunny, Cloudy, Light Rain, Moderate Rain, Heavy Rain

The app stores user accounts and prediction history in `database/database.db`. A recommendation is a general educational suggestion, not an agricultural guarantee. Validate crop choices with local agricultural experts and current regional advice.
