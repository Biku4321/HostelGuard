from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import numpy as np
from textblob import TextBlob

app = Flask(__name__)
CORS(app)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "food_waste_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "encoders.pkl")

model = joblib.load(MODEL_PATH)
encoders = joblib.load(ENCODER_PATH)

print("✅ ML Engine Loaded & Ready!")

@app.route('/', methods=['GET'])
def home():
    return "HostelGuard ML Engine is Running 🐍"

@app.route('/predict-waste', methods=['POST'])
def predict_waste():
    try:
        data = request.json
        
        day_enc = encoders['Day'].transform([data['day']])[0]
        weather_enc = encoders['Weather'].transform([data['weather']])[0]
        menu_enc = encoders['Menu'].transform([data['menu']])[0]
        
        
        portion_per_student = data['prepared'] / max(data['attendance'], 1)
        
        
        features_df = pd.DataFrame(
            [[day_enc, weather_enc, menu_enc, data['attendance'], data['prepared'], portion_per_student]], 
            columns=['Day', 'Weather', 'Menu', 'Attendance', 'Prepared_Kg', 'Portion_Per_Student']
        )
        
        
        predicted_waste = model.predict(features_df)[0]
        
        
        final_waste = max(0, min(predicted_waste, data['prepared']))
        
        
        suggestion = "Quantity is optimal. Good job!"
        
        
        if final_waste > (data['prepared'] * 0.15):
            ideal_prep = data['prepared'] - final_waste
            suggestion = f"⚠️ High Waste! Based on {data['attendance']} students, try cooking {ideal_prep:.1f} kg."
        elif portion_per_student < 0.3:
            suggestion = "⚠️ Warning: Food might be insufficient for everyone!"
        
        return jsonify({
            "predicted_waste": round(final_waste, 2),
            "suggestion": suggestion
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.json
        text = data.get('text', '')
        
        blob = TextBlob(text)
        sentiment_score = blob.sentiment.polarity 
        
        category = "General"
        is_urgent = False
        
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['vomit', 'poison', 'sick', 'hospital', 'faint', 'die']):
            category = "Health Emergency"
            is_urgent = True
        elif any(word in text_lower for word in ['insect', 'cockroach', 'hair', 'smell', 'stale', 'dirty']):
            category = "Hygiene Issue"
            is_urgent = True if sentiment_score < -0.3 else False
        elif any(word in text_lower for word in ['water', 'filter', 'ro', 'taste']):
            category = "Water Quality"
        elif any(word in text_lower for word in ['tasty', 'good', 'best', 'yum']):
            category = "Appreciation"
            
        return jsonify({
            "score": sentiment_score,
            "category": category,
            "is_urgent": is_urgent
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=8000, debug=True)