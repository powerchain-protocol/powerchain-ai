import React from 'react';

interface CoinProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  amount?: number;
  className?: string;
}

export const Coin: React.FC<CoinProps> = ({
  size = 'md',
  showLabel = false,
  amount,
  className = '',
}) => {
  const dimensions = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className={`relative shrink-0 rounded-full flex items-center justify-center shadow-md bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 p-0.5 border border-slate-300 dark:border-zinc-700 ${dimensions}`}>
        {/* Inner coin face with metallic texture & lightning P emblem */}
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
          {/* Circular coin ridges */}
          <div className="absolute inset-0.5 rounded-full border border-slate-500/30 pointer-events-none" />
          
          {/* Metallic "P" Lightning SVG Emblem */}
          <svg
            viewBox="0 0 100 100"
            className="w-3/5 h-3/5 text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            fill="currentColor"
          >
            {/* Top Loop P with sharp lightning cut */}
            <path d="M 25 15 L 65 15 C 80 15, 85 28, 80 42 C 75 54, 60 58, 48 58 L 40 58 L 28 85 L 20 85 L 32 58 L 25 58 Z M 38 28 L 38 45 L 55 45 C 65 45, 68 36, 65 28 Z" />
            <path d="M 42 55 L 30 85 L 50 50 L 38 50 Z" className="text-emerald-400 fill-current" />
            <text x="50" y="80" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#34d399" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>AI</text>
          </svg>
        </div>
      </div>

      {showLabel && (
        <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-1">
          {amount !== undefined ? amount.toLocaleString() : ''} <span className="text-emerald-700 dark:text-emerald-400">PWRC</span>
        </span>
      )}
    </div>
  );
};
