'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Thermometer, AlertCircle, CheckCircle } from 'lucide-react';

export default function SymptomLogger({ onReportSuccess }: { onReportSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  
  
  const [room, setRoom] = useState('101'); 

  const symptoms = ["Stomach Pain", "Fever", "Vomiting", "Headache", "Diarrhea"];

  const handleReport = async () => {
    if (!selectedSymptom) return;
    setLoading(true);
    try {
      await axios.post('https://hostelguard-1.onrender.com/api/health/report', {
        studentId: "STU-LIVE", 
        roomNumber: room,
        symptom: selectedSymptom
      });
      alert(`🚨 Symptom Reported for Room ${room}!`);
      setSelectedSymptom('');
      
  
      if (onReportSuccess) onReportSuccess();
      
    } catch (err) {
      alert("Error reporting symptom");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-xl shadow-md border border-red-100 h-fit">
      <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
        <Activity size={20} /> Report Sickness
      </h3>
      
      <div className="space-y-4">
        <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Your Room</label>
            <select 
                value={room} 
                onChange={(e) => setRoom(e.target.value)}
                className="w-full mt-1 p-2 border rounded bg-white text-gray-900 font-medium"
            >
                {['101', '102', '103', '104', '201', '202', '203', '204'].map(r => (
                    <option key={r} value={r}>Room {r}</option>
                ))}
            </select>
        </div>

        <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Symptom</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
                {symptoms.map((sym) => (
                    <button
                        key={sym}
                        onClick={() => setSelectedSymptom(sym)}
                        className={`text-sm py-2 px-1 rounded border transition-all
                            ${selectedSymptom === sym 
                                ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105' 
                                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        {sym}
                    </button>
                ))}
            </div>
        </div>

        <button
            onClick={handleReport}
            disabled={loading || !selectedSymptom}
            className={`w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-all
                ${!selectedSymptom ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'}`}
        >
            {loading ? "Reporting..." : <>Report Now <AlertCircle size={18} /></>}
        </button>
      </div>
    </div>
  );
}