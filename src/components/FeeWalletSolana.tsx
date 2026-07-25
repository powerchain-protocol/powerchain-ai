import React, { useState } from 'react';
import { Wallet, Copy, Check, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { SOLANA_WALLETS_CONFIG } from '../config/wallets';
import { SYSTEM_CONFIG } from '../config/system';

export const FeeWalletSolana: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SYSTEM_CONFIG.feeWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-100">Solana Fee Wallet</h4>
            <p className="text-[10px] text-gray-500 dark:text-zinc-400">Automated On-Chain Protocol Fees</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Solana Mainnet
        </span>
      </div>

      <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-[10px] text-gray-400 font-medium">Protocol Fee Collector Address</p>
          <p className="text-xs font-mono font-semibold text-gray-900 dark:text-zinc-100 truncate">
            {SYSTEM_CONFIG.feeWalletAddress}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 hover:text-emerald-500 transition-colors shrink-0"
          title="Copy address"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Supported Solana Wallets with Real Icons */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Supported Solana Wallets</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SOLANA_WALLETS_CONFIG.map((wallet) => (
            <div
              key={wallet.id}
              className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 flex items-center gap-2"
            >
              <img src={wallet.icon} alt={wallet.name} className="w-4 h-4 rounded shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-gray-800 dark:text-zinc-200 truncate">{wallet.name}</p>
                {wallet.installMessageBadge ? (
                  <a
                    href={wallet.installUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] text-emerald-600 dark:text-emerald-400 hover:underline block truncate"
                  >
                    Install if needed
                  </a>
                ) : (
                  <span className="text-[9px] text-gray-400 block">Ready</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
