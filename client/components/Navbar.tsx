import React from 'react';
import { ShieldCheck, LayoutDashboard, Utensils, Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">HostelGuard <span className="text-indigo-600">AI</span></h1>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="flex items-center gap-2 text-indigo-600"><LayoutDashboard size={18}/> Dashboard</a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-900"><Utensils size={18}/> Mess Menu</a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-900"><Activity size={18}/> Health Reports</a>
        </div>

        <div className="flex gap-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                ● System Online
            </span>
            <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                className="w-8 h-8 rounded-full border border-gray-200" 
                alt="Profile" 
            />
        </div>
    </nav>
  );
}