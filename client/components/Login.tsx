'use client';

import React, { useState } from 'react';
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react';

interface Props {
  onLogin: (role: 'admin' | 'student') => void;
}

export default function Login({ onLogin }: Props) {
  const [role, setRole] = useState<'admin' | 'student'>('student');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin(role);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">HostelGuard <span className="text-indigo-400">AI</span></h1>
          <p className="text-gray-400 text-sm mt-1">Secure Campus Management System</p>
        </div>

        <div className="bg-black/30 p-1 rounded-lg flex mb-6">
          <button
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'student' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'admin' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Warden (Admin)
          </button>
        </div>


        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Username</label>
            <div className="flex items-center bg-black/20 border border-white/10 rounded-lg px-3 py-3 mt-1 focus-within:border-indigo-500 transition-colors">
              <User size={18} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder={role === 'admin' ? "admin@hostel.com" : "student@college.edu"}
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
            <div className="flex items-center bg-black/20 border border-white/10 rounded-lg px-3 py-3 mt-1 focus-within:border-indigo-500 transition-colors">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex justify-center items-center gap-2 mt-4 active:scale-95"
          >
            {loading ? "Authenticating..." : <>Login to Portal <ArrowRight size={18}/></>}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Powered by Generative AI & IoT
        </p>
      </div>
    </div>
  );
}