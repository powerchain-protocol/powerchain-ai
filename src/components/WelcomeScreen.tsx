import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { AIAssistantLogo } from './ai-assistant-logo';
import { Suggestions } from './suggestions';

interface WelcomeScreenProps {
  userName: string;
  onSelectPrompt: (promptText: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  userName,
  onSelectPrompt,
}) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 max-w-4xl mx-auto w-full overflow-y-auto custom-scrollbar">
      {/* Astra Emblem */}
      <div className="mb-4">
        <AIAssistantLogo size="lg" />
      </div>

      {/* Greeting Header */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white text-center tracking-tight flex items-center justify-center gap-3">
        <span>{greeting}, {userName.split(' ')[0]}.</span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 rounded-full text-emerald-800 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6L8 14h8z"/>
          </svg>
          PWRC AI
        </span>
      </h2>

      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-2 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Your PowerChain platform is operating normally.</span>
      </p>

      {/* System Status Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full my-8">
        <div className="p-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
            Infra Health
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 mt-1">99.98%</p>
          <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-medium">SLA Optimal</span>
        </div>

        <div className="p-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
            Today's Energy
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 mt-1">18.4 GWh</p>
          <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-medium">+12.5% vs avg</span>
        </div>

        <div className="p-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
            Treasury
          </p>
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-1">Healthy</p>
          <span className="text-[9px] text-gray-400">$14.2M Reserve</span>
        </div>

        <div className="p-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
            Bridge
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 mt-1">Operational</p>
          <span className="text-[9px] text-gray-400">0.4ms Latency</span>
        </div>

        <div className="p-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-center col-span-2 sm:col-span-1 shadow-2xs">
          <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
            Carbon Credits
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 mt-1">2,384</p>
          <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-medium">Verified On-Chain</span>
        </div>
      </div>

      {/* Modular Suggestions Component */}
      <Suggestions onSelectSuggestion={onSelectPrompt} />
    </div>
  );
};
