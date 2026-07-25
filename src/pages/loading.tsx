import React from 'react';
import { PowerChainLogo } from '../assets/logo';
import { Activity } from 'lucide-react';

export const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <PowerChainLogo size="xl" className="mb-8" />
      <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs">
        <Activity className="w-5 h-5 animate-spin" />
        Synchronizing Sovereign Grid Telemetry & Solana Oracles...
      </div>
    </div>
  );
};

export default LoadingPage;
