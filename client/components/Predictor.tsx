"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Bot,
  ChefHat,
  CloudRain,
  Calendar,
  ArrowRight,
  AlertTriangle,
  Check,
} from "lucide-react";

export default function Predictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    day: "Monday",
    weather: "Sunny",
    menu: "Paneer Butter Masala",
    attendance: 200,
    prepared: 80, // kg
  });

  const menuOptions = [
    "Paneer Butter Masala",
    "Chicken Biryani",
    "Aloo Gobhi",
    "Tinda Curry",
    "Rajma Chawal",
    "Mix Veg",
    "Lauki Kofta",
  ];

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Python Server (Port 8000) ko direct call
      const res = await axios.post(
        "http://localhost:8000/predict-waste",
        formData,
      );
      setResult(res.data);
    } catch (error) {
      console.error("AI Server Error:", error);
      alert("⚠️ AI Engine is Offline! (Make sure app.py is running)");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-md border border-indigo-100 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-600 rounded-lg text-white shadow-lg">
          <Bot size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            AI Kitchen Assistant
          </h2>
          <p className="text-sm text-gray-500">
            Predict wastage before cooking!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* INPUT FORM */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Day
              </label>
              <div className="flex items-center bg-white border rounded-md px-3 py-2">
                <Calendar size={16} className="text-gray-400 mr-2" />
                <select
                  className="w-full bg-transparent outline-none text-sm
                             text-gray-900"
                  value={formData.day}
                  onChange={(e) =>
                    setFormData({ ...formData, day: e.target.value })
                  }
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Weather
              </label>
              <div className="flex items-center bg-white border rounded-md px-3 py-2">
                <CloudRain size={16} className="text-gray-400 mr-2" />
                <select
                  className="w-full bg-transparent outline-none text-sm text-gray-900"
                  value={formData.weather}
                  onChange={(e) =>
                    setFormData({ ...formData, weather: e.target.value })
                  }
                >
                  {["Sunny", "Rainy", "Cloudy"].map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
              Planned Menu
            </label>
            <div className="flex items-center bg-white border rounded-md px-3 py-2">
              <ChefHat size={16} className="text-gray-400 mr-2" />
              <select
                className="w-full bg-transparent outline-none text-sm text-gray-900"
                value={formData.menu}
                onChange={(e) =>
                  setFormData({ ...formData, menu: e.target.value })
                }
              >
                {menuOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Exp. Attendance
              </label>
              <input
                type="number"
                className="w-full bg-white border rounded-md px-3 py-2 text-sm outline-none"
                value={formData.attendance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attendance: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Prepare (kg)
              </label>
              <input
                type="number"
                className="w-full bg-white border rounded-md px-3 py-2 text-sm outline-none"
                value={formData.prepared}
                onChange={(e) =>
                  setFormData({ ...formData, prepared: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              "Thinking..."
            ) : (
              <>
                Predict Outcome <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>

        {/* OUTPUT RESULT */}
        <div className="flex items-center justify-center bg-white rounded-xl border border-gray-100 p-6 relative overflow-hidden">
          {!result ? (
            <div className="text-center text-gray-400">
              <Bot size={48} className="mx-auto mb-2 opacity-20" />
              <p>Enter details to ask AI</p>
            </div>
          ) : (
            <div className="text-center w-full animation-fade-in">
              <p className="text-sm text-gray-500 mb-2">Predicted Wastage</p>
              <h3
                className={`text-4xl font-extrabold mb-2 ${result.predicted_waste > 5 ? "text-red-600" : "text-green-600"}`}
              >
                {result.predicted_waste} kg
              </h3>

              <div
                className={`mt-4 p-3 rounded-lg text-sm flex items-start gap-2 text-left ${result.predicted_waste > 5 ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
              >
                {result.predicted_waste > 5 ? (
                  <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                ) : (
                  <Check size={18} className="shrink-0 mt-0.5" />
                )}
                <p>{result.suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
