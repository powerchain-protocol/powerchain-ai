import React from 'react';

export type ButtonVariant =
  | 'white'
  | 'onyx'
  | 'dark-green'
  | 'framed-dark-white'
  | 'framed-dark-green';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'onyx',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2 text-xs font-semibold rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2.5',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    white:
      'bg-white text-gray-900 hover:bg-gray-100 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 border border-gray-200 dark:border-zinc-300 shadow-2xs',
    onyx:
      'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-2xs',
    'dark-green':
      'bg-emerald-900 text-white hover:bg-emerald-800 dark:bg-emerald-800 dark:text-emerald-50 dark:hover:bg-emerald-700 shadow-2xs',
    'framed-dark-white':
      'bg-transparent text-gray-800 dark:text-zinc-200 border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800',
    'framed-dark-green':
      'bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-800/80 dark:border-emerald-600/80 hover:bg-emerald-900/20 dark:hover:bg-emerald-900/40',
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
