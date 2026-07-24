import React from 'react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showSubtitle = true,
  size = 'md',
}) => {
  const iconSizeClass =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const titleSizeClass =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      <div
        className={`${iconSizeClass} rounded-xl bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-950 text-emerald-400 flex items-center justify-center shrink-0 shadow-md border border-slate-700/80 transition-transform hover:scale-105 p-1`}
      >
        {/* PowerChain Metallic "P" Lightning Emblem */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-100" fill="currentColor">
          <path d="M 22 12 L 68 12 C 84 12, 88 26, 82 42 C 76 56, 62 60, 48 60 L 38 60 L 26 88 L 18 88 L 32 60 L 22 60 Z M 36 26 L 36 46 L 56 46 C 66 46, 70 36, 66 26 Z" />
          <path d="M 44 56 L 28 88 L 52 50 L 38 50 Z" className="text-emerald-400 fill-current" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-gray-900 dark:text-white ${titleSizeClass}`}>
            PowerChain AI
          </span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-900/10 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-800/30 dark:border-emerald-700/50">
            PWRC
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium tracking-wide">
            Tokenized Grid Intelligence
          </span>
        )}
      </div>
    </div>
  );
};

