import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300 block">{label}</label>}
      <input
        className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs text-gray-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-[10px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
};
