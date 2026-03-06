'use client';

import React from 'react';
import Navbar from './Navbar';
import SymptomLogger from './SymptomLogger';
import ComplaintBox from './ComplaintBox';
import AttendanceCam from './AttendanceCam';
import { Sparkles } from 'lucide-react';

interface Props {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, Rahul! 👋</h1>
                <p className="text-gray-500">Room 204 | B.Tech CS</p>
            </div>
            <button onClick={onLogout} className="text-sm text-red-500 hover:underline">Logout</button>
        </header>

        <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Mark Daily Attendance</h2>
            <AttendanceCam />
        </section>

        <section className="mb-10">
             <h2 className="text-lg font-bold text-gray-700 mb-4">Feeling Sick? Report Immediately</h2>
             <SymptomLogger onReportSuccess={() => alert("Warden Notified!")} />
        </section>


        <section className="mb-10">
             <h2 className="text-lg font-bold text-gray-700 mb-4">Feedback & Complaints</h2>
             <ComplaintBox />
        </section>
        
        <div className="text-center mt-12 text-gray-400 text-sm">
            <Sparkles size={16} className="inline mr-1" />
            AI-Powered Student Safety System
        </div>

      </div>
    </div>
  );
}