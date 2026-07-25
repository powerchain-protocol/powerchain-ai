import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'darkGreen' | 'thinFramed' | 'accentRed';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
}) => {
  const variantStyles = {
    default: 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    darkGreen: 'bg-gradient-to-br from-emerald-950/90 via-zinc-950 to-zinc-950 border border-emerald-500/30 text-emerald-100 shadow-xl',
    thinFramed: 'bg-zinc-900/80 dark:bg-zinc-950/90 border border-zinc-800/90 dark:border-emerald-500/20 text-zinc-100',
    accentRed: 'bg-gradient-to-r from-red-950/80 via-zinc-950 to-zinc-950 border border-red-500/30 text-zinc-100 shadow-xl',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 shadow-sm transition-all ${variantStyles[variant]} ${
        onClick ? 'cursor-pointer hover:border-emerald-500/50' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
