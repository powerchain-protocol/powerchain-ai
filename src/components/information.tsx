import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

export const InformationPanel: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-900 dark:text-zinc-100">System Information</h3>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">PowerChain Node Status</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-xs text-gray-600 dark:text-zinc-300">
          <p><strong>Version:</strong> v0.9.0-beta</p>
          <p><strong>Network:</strong> Solana Mainnet-Beta</p>
          <p><strong>MPC Nodes:</strong> 3/3 Online</p>
        </div>
        
        <a href="#" className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
          View Documentation <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
