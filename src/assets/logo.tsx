import React from 'react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'horizontal';
}

export const PowerChainLogo: React.FC<LogoProps> = ({
  className = '',
  showSubtitle = true,
  size = 'md',
  variant = 'full',
}) => {
  const iconDimensions =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : size === 'xl' ? 'w-14 h-14' : 'w-9 h-9';
  
  const titleSizeClass =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : 'text-base';

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Icon emblem: Curved P with 3 green dots inside and green lightning bolt at bottom left */}
      <div className={`${iconDimensions} rounded-xl bg-zinc-950 p-1.5 flex items-center justify-center shrink-0 border border-zinc-800 shadow-md relative group`}>
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main white 'P' shape */}
          <path
            d="M 28 22 H 78 C 96 22 106 36 102 54 C 98 70 82 82 62 82 H 50 L 50 82"
            stroke="#FFFFFF"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bottom leg of P extending down */}
          <path
            d="M 50 82 L 40 102"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* 3 Green Dots inside the curve */}
          <circle cx="52" cy="50" r="5" fill="#10B981" />
          <circle cx="67" cy="50" r="5" fill="#10B981" />
          <circle cx="82" cy="50" r="5" fill="#10B981" />
          {/* Green Lightning Bolt at lower left */}
          <path
            d="M 22 68 L 44 68 L 32 92 L 56 58 L 38 58 L 48 38 Z"
            fill="#10B981"
          />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-gray-900 dark:text-white ${titleSizeClass}`}>
              Power<span className="font-normal text-gray-600 dark:text-zinc-300">Chain</span> <span className="text-zinc-900 dark:text-zinc-100 font-black">AI</span>
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              BETA
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9.5px] text-gray-500 dark:text-zinc-400 font-medium tracking-widest uppercase mt-0.5">
              INTELLIGENCE • AUTOMATION • IMPACT
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PowerChainLogo;
