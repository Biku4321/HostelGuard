'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, AlertOctagon, CheckCircle } from 'lucide-react';

interface HealthLog {
  _id: string;
  studentId: string;
  roomNumber: string;
  symptom: string;
  date: string;
}
interface Props {
  refreshTrigger: number; // Yeh number badlega toh map refresh hoga
}


export default function HealthHeatmap({ refreshTrigger }: Props) {
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [roomRisk, setRoomRisk] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  // Hostel Layout (Dummy Rooms for visualization)
  const floors = {
    "Ground Floor": ["101", "102", "103", "104"],
    "First Floor": ["201", "202", "203", "204"]
  };

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/health');
        setLogs(res.data);
        calculateRisk(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching health logs:", error);
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [refreshTrigger]);

  // 🧠 Logic: Count sick students per room (Clustering Logic)
  const calculateRisk = (data: HealthLog[]) => {
    const riskMap: { [key: string]: number } = {};
    
    data.forEach((log) => {
      // Sirf recent cases count karein (last 7 days - Logic can be added here)
      const room = log.roomNumber;
      riskMap[room] = (riskMap[room] || 0) + 1;
    });

    setRoomRisk(riskMap);
  };

  const getRoomColor = (count: number) => {
    if (count >= 5) return "bg-red-500 text-white animate-pulse"; // OUTBREAK! 🚨
    if (count >= 2) return "bg-orange-300 text-orange-900"; // Warning ⚠️
    return "bg-green-100 text-green-700"; // Safe ✅
  };

  if (loading) return <div>Loading Health Data...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="text-red-500" /> Disease Outbreak Heatmap
            </h2>
            <p className="text-sm text-gray-500">Visualizing high-risk zones based on reported symptoms.</p>
        </div>
        
        {/* Legend */}
        <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 border border-green-500 rounded"></span> Safe</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-300 rounded"></span> Risk</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span> Outbreak</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: The Map */}
        <div className="space-y-6">
            {Object.entries(floors).map(([floorName, rooms]) => (
                <div key={floorName}>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">{floorName}</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {rooms.map((room) => {
                            const count = roomRisk[room] || 0;
                            return (
                                <div key={room} className={`p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm ${getRoomColor(count)}`}>
                                    <span className="text-lg font-bold">{room}</span>
                                    <span className="text-xs">{count} Cases</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>

        {/* RIGHT: Recent Alerts */}
        <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-3 text-gray-700">Recent Reports</h3>
            <div className="space-y-3 h-[250px] overflow-y-auto pr-2">
                {logs.slice(0, 8).map((log) => (
                    <div key={log._id} className="flex items-start gap-3 bg-white p-3 rounded shadow-sm text-sm">
                        <AlertOctagon size={16} className="text-red-500 mt-1" />
                        <div>
                            <p className="font-medium text-gray-800">
                                Room {log.roomNumber} reported <span className="text-red-600">{log.symptom}</span>
                            </p>
                            <p className="text-xs text-gray-400">Student ID: {log.studentId}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}