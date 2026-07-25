import React from 'react';
import { PowerChainLogo } from '../assets/logo';
import { ArrowLeft, Cpu } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <PowerChainLogo size="lg" className="mb-6" />
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
        <Cpu className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold mb-2">404 - Node Telemetry Not Found</h1>
      <p className="text-gray-400 text-sm max-w-md mb-8">
        The requested energy grid route or AI intelligence endpoint could not be located on the PowerChain network.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Grid Operating System
      </a>
    </div>
  );
};

export default NotFoundPage;
