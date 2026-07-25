import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'darkGreen' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-bold rounded-xl transition-all cursor-pointer disabled:opacity-50 active:scale-95';
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md',
    darkGreen: 'bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 shadow-md',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/50',
    outline: 'border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-200',
    ghost: 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md',
  };
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
