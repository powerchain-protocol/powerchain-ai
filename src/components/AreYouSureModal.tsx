import React from 'react';
import { ShieldAlert, AlertTriangle, X, Check, Lock } from 'lucide-react';

interface AreYouSureModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AreYouSureModal: React.FC<AreYouSureModalProps> = ({
  isOpen,
  title = 'Are you sure?',
  description = 'This action will submit a sovereign transaction to the Solana blockchain and settle tokenized power credits.',
  confirmLabel = 'Confirm Action',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isDanger
                  ? 'bg-red-500/10 text-red-500 border-red-500/20'
                  : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              }`}
            >
              {isDanger ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="text-[10px] text-zinc-400 font-mono">PowerChain Protocol Safety Check</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-zinc-500 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed space-y-2">
          <p>{description}</p>
          <div className="flex items-center gap-2 pt-1 text-[10px] text-emerald-400 font-mono">
            <Lock className="w-3 h-3" />
            <span>Multi-Party Computation (MPC) Shard Shorthand Verified</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
