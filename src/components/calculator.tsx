import React, { useState } from 'react';
import { Calculator as CalculatorIcon, Zap } from 'lucide-react';
import { Coin } from './coin';

export const TokenCalculator: React.FC = () => {
  const [queries, setQueries] = useState<number>(100);
  const [forecasts, setForecasts] = useState<number>(10);
  
  const QUERY_COST = 2;
  const FORECAST_COST = 5;
  
  const totalCost = (queries * QUERY_COST) + (forecasts * FORECAST_COST);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CalculatorIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-900 dark:text-zinc-100">Token Calculator</h3>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">Estimate PWRC costs</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600 dark:text-zinc-400">AI Chat Queries ({QUERY_COST} PWRC/each)</span>
            <span className="font-bold">{queries}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="10"
            value={queries} 
            onChange={(e) => setQueries(parseInt(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700"
          />
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600 dark:text-zinc-400">Predictive Forecasts ({FORECAST_COST} PWRC/each)</span>
            <span className="font-bold">{forecasts}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="1"
            value={forecasts} 
            onChange={(e) => setForecasts(parseInt(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700"
          />
        </div>
        
        <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-900 dark:text-zinc-100">Estimated Total</span>
          <div className="flex items-center gap-1.5">
            <Coin size="sm" />
            <span className="font-black text-emerald-600 dark:text-emerald-400 text-lg">{totalCost.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-500">PWRC</span>
          </div>
        </div>
      </div>
    </div>
  );
};
