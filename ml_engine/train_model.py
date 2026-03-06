import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "mess_data.csv")
MODEL_DIR = os.path.join(BASE_DIR, "models")

if not os.path.exists(MODEL_DIR): os.makedirs(MODEL_DIR)

def train_food_wastage_model():
    print("⏳ Loading Data...")
    df = pd.read_csv(DATA_PATH)

    encoders = {}
    for col in ['Day', 'Weather', 'Menu']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le
    
    
    X = df[['Day', 'Weather', 'Menu', 'Attendance', 'Prepared_Kg', 'Portion_Per_Student']]
    y = df['Wasted_Kg'] 

    print("🧠 Training Smart Logic Model...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"✅ Accuracy: {score:.2f}")

    joblib.dump(model, os.path.join(MODEL_DIR, "food_waste_model.pkl"))
    joblib.dump(encoders, os.path.join(MODEL_DIR, "encoders.pkl"))
    print("💾 Model Saved.")

if __name__ == "__main__":
    train_food_wastage_model()