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
      <img src="/favicon.ico" className={`rounded-full shrink-0 shadow-md border border-slate-300 dark:border-zinc-700 ${dimensions}`} alt="PWRC Coin" />

      {showLabel && (
        <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-1">
          {amount !== undefined ? amount.toLocaleString() : ''} <span className="text-emerald-700 dark:text-emerald-400">PWRC</span>
        </span>
      )}
    </div>
  );
};
