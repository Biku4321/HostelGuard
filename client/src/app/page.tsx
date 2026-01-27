// "use client"; // Client-side rendering ke liye zaroori hai
// import HealthHeatmap from "../../components/HealthHeatmap";
// import Predictor from "../../components/Predictor";
// import ComplaintBox from "../../components/ComplaintBox";
// import SymptomLogger from "../../components/SymptomLogger";
// import LeftoverManager from '../../components/LeftoverManager';
// import Navbar from '../../components/Navbar';
// import MenuPlanner from '../../components/MenuPlanner';
// import CostInsight from '../../components/CostInsight';
// import AttendanceCam from '../../components/AttendanceCam';
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { AlertTriangle, TrendingDown, Users, Utensils } from "lucide-react";

// // Types define karte hain (TypeScript best practice)
// interface MessLog {
//   _id: string;
//   date: string;
//   day: string;
//   menuItem: string;
//   attendance: number;
//   preparedQty: number;
//   wastedQty: number;
// }

// export default function Dashboard() {
//   const [data, setData] = useState<MessLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [highWastageAlert, setHighWastageAlert] = useState<MessLog | null>(
//     null,
//   );
//   const [refreshKey, setRefreshKey] = useState(0);

//   useEffect(() => {
//     // Backend se Data fetch karna
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/mess");
//         setData(res.data);

//         // Logic: Check agar aaj/kal mein wastage bahut zyada tha (> 10kg)
//         const criticalWastage = res.data.find(
//           (log: MessLog) => log.wastedQty > 10,
//         );
//         if (criticalWastage) {
//           setHighWastageAlert(criticalWastage);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading)
//     return (
//       <div className="p-10 text-center text-xl">🚀 Loading Dashboard...</div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <Navbar /> {/* Add Navbar */}
//       {/* HEADER */}
//       <MenuPlanner />
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           HostelGuard Dashboard
//         </h1>
//         <p className="text-gray-500">AI-Powered Food & Health Monitoring</p>
//       </header>

//       <Predictor />
//       <LeftoverManager data={data} />
//       {/* 🚨 ALERT SECTION (Condition Based) */}
//       {highWastageAlert && (
//         <div className="mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-center gap-4 animate-pulse">
//           <AlertTriangle className="h-8 w-8 text-red-600" />
//           <div>
//             <p className="font-bold text-lg">High Wastage Alert!</p>
//             <p>
//               On <span className="font-semibold">{highWastageAlert.day}</span>,
//               Menu:{" "}
//               <span className="font-semibold">{highWastageAlert.menuItem}</span>{" "}
//               resulted in
//               <span className="font-bold text-red-800">
//                 {" "}
//                 {highWastageAlert.wastedQty} kg
//               </span>{" "}
//               waste.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-full text-blue-600">
//               <Users size={24} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Avg Attendance</p>
//               <h3 className="text-2xl font-bold">185</h3>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-green-100 rounded-full text-green-600">
//               <Utensils size={24} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Meals Served</p>
//               <h3 className="text-2xl font-bold">{data.length} Days</h3>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-orange-100 rounded-full text-orange-600">
//               <TrendingDown size={24} />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Wastage</p>
//               <h3 className="text-2xl font-bold">
//                 {data.reduce((acc, curr) => acc + curr.wastedQty, 0).toFixed(1)}{" "}
//                 kg
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>
//       <CostInsight data={data} />
//       <AttendanceCam />

//       {/* 📊 CHARTS SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Chart 1: Wastage Analysis */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Food Consumption vs Wastage
//           </h2>
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data.slice(0, 7)}>
//                 {" "}
//                 {/* Showing last 7 days */}
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar
//                   dataKey="preparedQty"
//                   fill="#4F46E5"
//                   name="Prepared (kg)"
//                   radius={[4, 4, 0, 0]}
//                 />
//                 <Bar
//                   dataKey="wastedQty"
//                   fill="#EF4444"
//                   name="Wasted (kg)"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Chart 2: Menu Performance (Custom List) */}
//         <div className="bg-white p-6 rounded-xl shadow-md overflow-y-auto h-[400px]">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Recent Logs
//           </h2>
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b text-gray-500 text-sm">
//                 <th className="pb-2">Day</th>
//                 <th className="pb-2">Menu</th>
//                 <th className="pb-2">Waste</th>
//                 <th className="pb-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.slice(0, 10).map((log) => (
//                 <tr key={log._id} className="border-b hover:bg-gray-50">
//                   <td
//                     className="py-3 font-bold
//                   text-sm
//                   text-grey-600"
//                   >
//                     {log.day}
//                   </td>
//                   <td className="py-3 text-sm text-gray-600">{log.menuItem}</td>
//                   <td className="py-3 font-bold text-gray-800">
//                     {log.wastedQty} kg
//                   </td>
//                   <td className="py-3">
//                     {log.wastedQty > 5 ? (
//                       <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
//                         High
//                       </span>
//                     ) : (
//                       <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
//                         Good
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//           {/* Left: Symptom Logger (Student Input) */}
//           <div className="lg:col-span-1">
//             <SymptomLogger
//               onReportSuccess={() => setRefreshKey((prev) => prev + 1)}
//             />
//           </div>

//           {/* Right: Live Heatmap (Admin Output) */}
//           <div className="lg:col-span-2">
//             <HealthHeatmap refreshTrigger={refreshKey} />
//           </div>
//         </div>
//         <ComplaintBox />
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- COMPONENTS ---
import Navbar from '../../components/Navbar';
import Login from '../../components/Login';
import StudentDashboard from '../../components/StudentDashboard';

// Admin Components
import HealthHeatmap from '../../components/HealthHeatmap';
import Predictor from '../../components/Predictor';
import ComplaintBox from '../../components/ComplaintBox';
import SymptomLogger from '../../components/SymptomLogger';
import LeftoverManager from '../../components/LeftoverManager';
import MenuPlanner from '../../components/MenuPlanner';
import CostInsight from '../../components/CostInsight';
import AttendanceCam from '../../components/AttendanceCam';

// --- ICONS & CHARTS ---
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AlertTriangle, TrendingDown, Users, Utensils, LogOut } from 'lucide-react';

// Types
interface MessLog {
  _id: string;
  date: string;
  day: string;
  menuItem: string;
  attendance: number;
  preparedQty: number;
  wastedQty: number;
}

export default function Home() {
  // --- AUTH STATE (Login Logic) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'student'>('student');

  // --- ADMIN DATA STATES ---
  const [data, setData] = useState<MessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [highWastageAlert, setHighWastageAlert] = useState<MessLog | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // --- 1. FETCH DATA (Only if Admin) ---
  useEffect(() => {
    if (isLoggedIn && userRole === 'admin') {
      const fetchData = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/mess');
          setData(res.data);

          // Alert Logic
          const criticalWastage = res.data.find((log: MessLog) => log.wastedQty > 10);
          if (criticalWastage) {
            setHighWastageAlert(criticalWastage);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isLoggedIn, userRole]);

  // --- HANDLERS ---
  const handleLogin = (role: 'admin' | 'student') => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setData([]); // Clear data on logout
  };

  // ==========================================
  // VIEW 1: LOGIN SCREEN
  // ==========================================
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // ==========================================
  // VIEW 2: STUDENT DASHBOARD
  // ==========================================
  if (userRole === 'student') {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  // ==========================================
  // VIEW 3: ADMIN (WARDEN) DASHBOARD
  // ==========================================
  if (loading) {
    return <div className="p-10 text-center text-xl animate-pulse">🚀 Loading HostelGuard System...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* Global Navbar */}

      <main className="p-8">
        
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500">AI-Powered Food & Health Monitoring</p>
            </div>
            <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-red-600 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
            >
                <LogOut size={18} /> Logout
            </button>
        </div>

        {/* 1. AI Menu Planner (Premium Feature) */}
        <MenuPlanner />

        {/* 2. Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Users size={24} /></div>
              <div><p className="text-sm text-gray-500">Avg Attendance</p><h3 className="text-2xl font-bold">185</h3></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full text-green-600"><Utensils size={24} /></div>
              <div><p className="text-sm text-gray-500">Meals Served</p><h3 className="text-2xl font-bold">{data.length} Days</h3></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full text-orange-600"><TrendingDown size={24} /></div>
              <div>
                  <p className="text-sm text-gray-500">Total Wastage</p>
                  <h3 className="text-2xl font-bold">{data.reduce((acc, curr) => acc + curr.wastedQty, 0).toFixed(1)} kg</h3>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Cost & Financial Insights */}
        <CostInsight data={data} />

        {/* 4. Smart Attendance System */}
        <AttendanceCam />

        {/* 5. Food Wastage Alert (Conditional) */}
        {highWastageAlert && (
          <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-center gap-4 animate-pulse">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <p className="font-bold text-lg">High Wastage Alert!</p>
              <p>On <span className="font-semibold">{highWastageAlert.day}</span>, Menu: <span className="font-semibold">{highWastageAlert.menuItem}</span> resulted in <span className="font-bold text-red-800">{highWastageAlert.wastedQty} kg</span> waste.</p>
            </div>
          </div>
        )}

        {/* 6. AI Predictor */}
        <div className="mt-8">
             <Predictor />
        </div>

        {/* 7. Sustainable Leftover Manager */}
        <LeftoverManager data={data} />

        {/* 8. Charts & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Food Consumption vs Wastage</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(0, 7)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="preparedQty" fill="#4F46E5" name="Prepared (kg)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="wastedQty" fill="#EF4444" name="Wasted (kg)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-xl shadow-md overflow-y-auto h-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Logs</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="pb-2">Day</th>
                  <th className="pb-2">Menu</th>
                  <th className="pb-2">Waste</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((log) => (
                  <tr key={log._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-bold text-sm text-gray-600">{log.day}</td>
                    <td className="py-3 text-sm text-gray-600">{log.menuItem}</td>
                    <td className="py-3 font-bold text-gray-800">{log.wastedQty} kg</td>
                    <td className="py-3">
                      {log.wastedQty > 5 ? (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">High</span>
                      ) : (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Good</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 9. Health & Outbreak Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left: Symptom Logger (Quick Admin Input) */}
          <div className="lg:col-span-1">
             <SymptomLogger onReportSuccess={() => setRefreshKey((prev) => prev + 1)} />
          </div>
          {/* Right: Live Heatmap */}
          <div className="lg:col-span-2">
            <HealthHeatmap refreshTrigger={refreshKey} />
          </div>
        </div>

        {/* 10. Complaints Section */}
        <div className="mt-8">
            <ComplaintBox />
        </div>

      </main>
    </div>
  );
}