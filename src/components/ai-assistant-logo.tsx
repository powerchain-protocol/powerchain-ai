import React from 'react';
import { Zap } from 'lucide-react';

interface AIAssistantLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AIAssistantLogo: React.FC<AIAssistantLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const containerSizes = {
    sm: 'w-7 h-7 rounded-lg text-emerald-400 bg-emerald-950 border-emerald-800',
    md: 'w-9 h-9 rounded-xl text-emerald-400 bg-emerald-950 border-emerald-800',
    lg: 'w-12 h-12 rounded-2xl text-emerald-300 bg-emerald-950 border-emerald-700',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`flex items-center justify-center shrink-0 border shadow-xs transition-transform hover:scale-105 ${containerSizes[size]} ${className}`}
    >
      <Zap className={`${iconSizes[size]} fill-current text-emerald-500 dark:text-emerald-400`} />
    </div>
  );
};
