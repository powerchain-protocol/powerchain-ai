import React from 'react';

interface AvatarProps {
  name: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark-green' | 'onyx' | 'emerald';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  variant = 'dark-green',
  className = '',
}) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'JD';

  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  const variantClasses = {
    'dark-green':
      'bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-2xs',
    onyx:
      'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border border-zinc-800 dark:border-zinc-300 shadow-2xs',
    emerald:
      'bg-emerald-600 text-white border border-emerald-500 shadow-2xs',
  };

  return (
    <div
      className={`rounded-full font-bold flex items-center justify-center shrink-0 tracking-wider ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {initials}
    </div>
  );
};
