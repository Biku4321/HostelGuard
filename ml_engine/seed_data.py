import pandas as pd
import requests
import json
import os


SERVER_URL = "http://localhost:5000/api"
DATA_DIR = "data"  


MESS_CSV = os.path.join(DATA_DIR, "mess_data.csv")
HEALTH_CSV = os.path.join(DATA_DIR, "health_data.csv")

def seed_mess_data():
    print("⏳ Reading Mess CSV...")
    try:
        df = pd.read_csv(MESS_CSV)
        
        
        df = df.rename(columns={
            "Date": "date",
            "Day": "day",
            "Menu": "menuItem",
            "Weather": "weather",
            "Attendance": "attendance",
            "Prepared_Kg": "preparedQty",
            "Wasted_Kg": "wastedQty"
        })
        
        
        data = df.to_dict(orient="records")
        
        
        print(f"🚀 Sending {len(data)} records to Server...")
        response = requests.post(f"{SERVER_URL}/mess/seed", json=data)
        
        if response.status_code == 200:
            print("✅ Mess Data Seeded Successfully!")
        else:
            print(f"❌ Error Seeding Mess Data: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def seed_health_data():
    print("\n⏳ Reading Health CSV...")
    try:
        df = pd.read_csv(HEALTH_CSV)
        
        
        df = df.rename(columns={
            "Date": "date",
            "Student_ID": "studentId",
            "Room_No": "roomNumber",
            "Symptom": "symptom"
        })
        
        
        data = df.to_dict(orient="records")
        
        
        print(f"🚀 Sending {len(data)} records to Server...")
        response = requests.post(f"{SERVER_URL}/health/seed", json=data)
        
        if response.status_code == 200:
            print("✅ Health Data Seeded Successfully!")
        else:
            print(f"❌ Error Seeding Health Data: {response.text}")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("--- HOSTELGUARD DATA SEEDER ---")
    seed_mess_data()
    seed_health_data()
    print("\n🎉 DONE! Database is populated.")