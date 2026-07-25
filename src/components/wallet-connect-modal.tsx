import React, { useState } from 'react';
import { X, Wallet, ShieldCheck, ArrowRight, Download, CheckCircle2, AlertCircle } from 'lucide-react';
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
  const [customAddress, setCustomAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const isPhantomInstalled = typeof window !== 'undefined' && (window as any)?.solana?.isPhantom;
  const isSolflareInstalled = typeof window !== 'undefined' && (window as any)?.solflare;

  const walletOptions = [
    {
      name: 'Phantom (Solana)',
      description: isPhantomInstalled ? 'Extension Installed & Detected' : 'Click to install or connect',
      installed: isPhantomInstalled,
      installUrl: 'https://phantom.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#AB9FF2]">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm4-6h-6v2h6V11zm-4-4h2v2h-2V7z"/>
        </svg>
      ),
    },
    {
      name: 'Solflare (Solana)',
      description: isSolflareInstalled ? 'Extension Installed & Detected' : 'Click to install or connect',
      installed: isSolflareInstalled,
      installUrl: 'https://solflare.com/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#F39C12]">
          <path d="M12 2L2 12h5l-2 10 10-10h-5l2-10z"/>
        </svg>
      ),
    },
    {
      name: 'PowerChain Vault MPC',
      description: 'Multi-party computation key recovery (2-of-3 shards)',
      installed: true,
      iconColor: 'bg-emerald-950/40 text-emerald-400',
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  const handleCustomConnect = async () => {
    if (!customAddress || customAddress.length < 10) {
      setErrorMsg('Please enter a valid Solana wallet pubkey or MPC address');
      return;
    }
    setErrorMsg('');
    await connectWallet(customAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                PowerChain Web3 & DePIN Wallet
              </h3>
              <p className="text-[10px] font-mono text-emerald-400">
                {network} • Pyth Oracle Verified
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {isConnected ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Wallet Connected</p>
                <p className="text-xs font-mono font-bold text-white bg-black/40 py-1.5 px-3 rounded-lg border border-zinc-800 break-all">
                  {address}
                </p>
                <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-zinc-300">
                  <span>Vault Balance:</span>
                  <span className="font-bold text-emerald-400">{balance}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  disconnectWallet();
                }}
                className="w-full py-2.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect your Solana wallet or MPC vault shard to sign energy credit settlements and receive automated email receipts.
              </p>

              <div className="space-y-2">
                {walletOptions.map((opt, i) => (
                  <div
                    key={i}
                    className="p-3 bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 rounded-2xl flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl flex items-center justify-center ${opt.iconColor || 'bg-zinc-950 border border-zinc-800'}`}>
                        {opt.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {opt.name}
                          </p>
                          {opt.installed && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Detected
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-400">{opt.description}</p>
                      </div>
                    </div>

                    {opt.installed ? (
                      <button
                        onClick={async () => {
                          await connectWallet(opt.name);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Connect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : opt.installUrl ? (
                      <a
                        href={opt.installUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-emerald-500/20 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Install</span>
                      </a>
                    ) : (
                      <button
                        onClick={async () => {
                          await connectWallet(opt.name);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Connect</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Custom Solana Address Connector */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Or Connect via Custom Solana Pubkey
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="Enter Solana wallet address..."
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleCustomConnect}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Set Active
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-[10px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errorMsg}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
