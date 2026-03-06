'use client';

import React from 'react';
import { Recycle, ChefHat, ArrowRight, Leaf } from 'lucide-react';

interface Props {
  data: any[]; 
}

export default function LeftoverManager({ data }: Props) {
  const lastLog = data[data.length - 1]; 
  
  if (!lastLog || lastLog.wastedQty < 5) return null; 

  const getRecycleIdea = (menu: string) => {
    const m = menu.toLowerCase();
    if (m.includes('rice') || m.includes('biryani')) return { dish: "Lemon Rice or Fried Rice", time: "Breakfast" };
    if (m.includes('dal') || m.includes('rajma')) return { dish: "Dal Paratha (Knead dough with dal)", time: "Breakfast" };
    if (m.includes('roti') || m.includes('chapati')) return { dish: "Roti Noodles or Churma Ladoo", time: "Snacks" };
    if (m.includes('aloo') || m.includes('gobi') || m.includes('curry')) return { dish: "Veg Cutlets or Pav Bhaji Mash", time: "Evening Snacks" };
    if (m.includes('chicken')) return { dish: "Shredded Chicken Sandwiches", time: "Breakfast" };
    return { dish: "Donate to Local NGO", time: "Immediate" };
  };

  const idea = getRecycleIdea(lastLog.menuItem);

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm border border-green-200 mt-8 flex items-center justify-between relative overflow-hidden">
      
      <Leaf className="absolute -right-5 -top-5 text-green-100 h-32 w-32 rotate-12" />

      <div className="z-10">
        <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
            <Recycle className="animate-spin-slow" size={24} /> Sustainable Action Needed
        </h3>
        <p className="text-green-700 mt-1">
            <span className="font-bold">{lastLog.wastedQty} kg</span> of {lastLog.menuItem} was wasted recently.
        </p>
        
        <div className="mt-4 flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 border border-green-100">
                <ChefHat className="text-orange-500" />
                <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Chef's Recommendation</p>
                    <p className="text-gray-800 font-semibold text-lg">{idea.dish}</p>
                </div>
            </div>
            
            <ArrowRight className="text-green-400" />
            
            <div className="bg-white px-3 py-2 rounded-lg text-xs font-bold text-green-600 border border-green-100">
                Serve in: {idea.time}
            </div>
        </div>
      </div>

      <button className="z-10 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all">
        Notify Kitchen Staff
      </button>
    </div>
  );
}