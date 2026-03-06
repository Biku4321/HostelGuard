'use client';

import React from 'react';
import { IndianRupee, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

interface Props {
  data: any[]; 
}

export default function CostInsight({ data }: Props) {
  const COST_PER_KG = 120; 


  const totalWasteKg = data.reduce((acc, curr) => acc + curr.wastedQty, 0);
  
  const totalLoss = Math.round(totalWasteKg * COST_PER_KG);
  
  const avgDailyLoss = totalLoss / (data.length || 1);
  const projectedYearlyLoss = Math.round(avgDailyLoss * 365);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      
  
      <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10">
          <TrendingDown size={100} className="text-red-500" />
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Money Wasted</p>
          <h3 className="text-3xl font-extrabold text-red-600 mt-2 flex items-center">
            <IndianRupee size={28} /> {totalLoss.toLocaleString()}
          </h3>
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
             <TrendingDown size={12} /> Loss from {totalWasteKg.toFixed(1)} kg food
          </p>
        </div>
      </div>


      <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10">
          <Wallet size={100} className="text-orange-500" />
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Projected Annual Loss</p>
          <h3 className="text-3xl font-extrabold text-gray-800 mt-2 flex items-center">
            <IndianRupee size={28} /> {projectedYearlyLoss.toLocaleString()}
          </h3>
          <p className="text-xs text-orange-500 mt-1">
             If wastage continues at this rate
          </p>
        </div>
      </div>

      
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow-md text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-20">
          <TrendingUp size={100} className="text-white" />
        </div>
        <div>
          <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Potential Savings (AI)</p>
        
          <h3 className="text-3xl font-extrabold text-white mt-2 flex items-center">
            <IndianRupee size={28} /> {(projectedYearlyLoss * 0.4).toLocaleString()}
          </h3>
          <p className="text-xs text-indigo-100 mt-1">
             Estimated yearly savings using HostelGuard
          </p>
        </div>
      </div>

    </div>
  );
}