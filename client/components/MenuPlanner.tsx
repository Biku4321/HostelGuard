'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, ChefHat, ArrowRight } from 'lucide-react';

export default function MenuPlanner() {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState<any[]>([]);

  const generateMenu = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://hostelguard-1.onrender.com/api/ai/suggest-menu');
      setMenu(res.data);
    } catch (err) {
      alert("Failed to generate menu. Check API Key.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl shadow-lg text-white mt-8 relative overflow-hidden">
      
      <Sparkles className="absolute top-4 right-4 text-purple-400 opacity-20 h-24 w-24" />

      <div className="relative z-10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
            <Sparkles className="text-yellow-400" /> AI Menu Architect
        </h2>
        <p className="text-purple-200 text-sm mb-6">
            Generate a waste-free menu based on students' recent preferences.
        </p>

        {menu.length === 0 ? (
            <div className="text-center py-4">
                <button 
                    onClick={generateMenu}
                    disabled={loading}
                    className="bg-white text-indigo-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2 mx-auto"
                >
                    {loading ? (
                        <span className="animate-pulse">Asking Gemini AI...</span>
                    ) : (
                        <>Generate Smart Menu <Sparkles size={18}/></>
                    )}
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animation-fade-in">
                {menu.map((item, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                        <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
                            {item.day}
                        </div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <ChefHat size={18} /> {item.dish}
                        </h3>
                        <p className="text-xs text-gray-300 mt-2 italic">
                            "{item.reason}"
                        </p>
                    </div>
                ))}
                
                <button 
                    onClick={() => setMenu([])}
                    className="md:col-span-3 mt-4 text-xs text-center text-purple-300 hover:text-white underline"
                >
                    Generate Again
                </button>
            </div>
        )}
      </div>
    </div>
  );
}