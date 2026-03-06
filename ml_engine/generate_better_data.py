import pandas as pd
import random
from datetime import datetime, timedelta
import os

NUM_DAYS = 1500 
TOTAL_STUDENTS = 200


menu_items = {
    "Paneer Butter Masala": 0.02, 
    "Chicken Biryani": 0.01,      
    "Aloo Gobhi": 0.15,
    "Tinda Curry": 0.60,         
    "Rajma Chawal": 0.05,
    "Mix Veg": 0.20,
    "Lauki Kofta": 0.50           
}

weather_conditions = ["Sunny", "Rainy", "Cloudy"]
mess_data = []
start_date = datetime(2022, 1, 1)

print("⏳ Generating Logic-Strict Data...")

for i in range(NUM_DAYS):
    curr_date = start_date + timedelta(days=i)
    day_name = curr_date.strftime("%A")
    menu = random.choice(list(menu_items.keys()))
    weather = random.choice(weather_conditions)
    
    
    if day_name in ["Saturday", "Sunday"]:
        attendance = random.randint(100, 150)
    else:
        attendance = random.randint(160, 200)

    
    avg_needed = 0.4 
    
    
    variation = random.choice([0.8, 1.0, 1.0, 1.2, 1.5]) 
    prepared_kg = round(attendance * avg_needed * variation, 2)
    
    
    portion_per_student = prepared_kg / attendance

    
    actual_consumption_per_student = 0.4
    
    
    if menu in ["Tinda Curry", "Lauki Kofta"]:
        actual_consumption_per_student = 0.25 
    
    total_consumed = attendance * actual_consumption_per_student
    
    
    surplus = max(0, prepared_kg - total_consumed)
    
    
    plate_waste = total_consumed * menu_items[menu] * 0.1 # Factor reduced
    
    total_waste = surplus + plate_waste
    
    
    total_waste += random.uniform(0, 1)
    
    
    total_waste = min(total_waste, prepared_kg)
    
    mess_data.append([
        curr_date.date(), day_name, weather, menu, 
        attendance, prepared_kg, portion_per_student, round(total_waste, 2)
    ])


df_mess = pd.DataFrame(mess_data, columns=[
    "Date", "Day", "Weather", "Menu", 
    "Attendance", "Prepared_Kg", "Portion_Per_Student", "Wasted_Kg"
])
OUTPUT_PATH = os.path.join("data", "mess_data.csv")
df_mess.to_csv(OUTPUT_PATH, index=False)
print(f"✅ Data Generated with 'Portion_Per_Student' Logic.")