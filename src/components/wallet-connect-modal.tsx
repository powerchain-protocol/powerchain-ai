import React from 'react';
import { X, Wallet, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useWallet } from './wallet-provider';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isConnected, address, balance, network, connectWallet, disconnectWallet } = useWallet();

  if (!isOpen) return null;

  const walletOptions = [
    { name: 'Metamask', description: 'Browser extension & Mobile App', iconColor: 'bg-amber-500/10 text-amber-600' },
    { name: 'Coinbase Wallet', description: 'Self-custody crypto wallet', iconColor: 'bg-blue-500/10 text-blue-600' },
    { name: 'WalletConnect', description: 'Scan with WalletConnect protocol', iconColor: 'bg-sky-500/10 text-sky-600' },
    { name: 'PowerChain Vault MPC', description: 'Multi-party computation key recovery', iconColor: 'bg-emerald-950/40 text-emerald-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                PowerChain On-Chain Treasury Wallet
              </h3>
              <p className="text-[10px] text-gray-400 dark:text-zinc-500">
                {network}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {isConnected ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/20 border border-emerald-800/60 rounded-xl text-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-emerald-400">Wallet Connected</p>
                <p className="text-xs font-mono font-semibold text-gray-800 dark:text-zinc-200 mt-1">
                  {address}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-gray-600 dark:text-zinc-400">
                  <span>Balance:</span>
                  <span className="font-bold text-emerald-400">{balance}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  disconnectWallet();
                }}
                className="w-full py-2.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 dark:text-zinc-400 mb-2">
                Connect your web3 identity or enterprise vault to sign automated PPA contracts and carbon offset settlements.
              </p>

              {walletOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={async () => {
                    await connectWallet(opt.name);
                    onClose();
                  }}
                  className="w-full p-3.5 bg-gray-50 dark:bg-zinc-800/60 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-700/80 rounded-xl flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${opt.iconColor}`}>
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {opt.name}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-zinc-400">{opt.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
