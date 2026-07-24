import { useState, useEffect } from 'react';
import { EmbeddedWalletState, INITIAL_EMBEDDED_WALLET, signMpcTransaction } from '../lib/embedded-wallet';

export function useEmbeddedWallets() {
  const [wallet, setWallet] = useState<EmbeddedWalletState>(() => {
    try {
      const saved = localStorage.getItem('powerchain_embedded_wallet');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load embedded wallet state:', e);
    }
    return INITIAL_EMBEDDED_WALLET;
  });

  useEffect(() => {
    try {
      localStorage.setItem('powerchain_embedded_wallet', JSON.stringify(wallet));
    } catch (e) {
      console.error('Failed to persist embedded wallet state:', e);
    }
  }, [wallet]);

  const switchChain = (chain: EmbeddedWalletState['chain']) => {
    setWallet((prev) => ({ ...prev, chain }));
  };

  const transferPWRC = async (recipient: string, amount: number) => {
    if (wallet.balancePWRC < amount) {
      throw new Error('Insufficient PWRC token balance in embedded wallet');
    }
    const res = await signMpcTransaction(recipient, amount, wallet);
    if (res.success) {
      setWallet((prev) => ({
        ...prev,
        balancePWRC: prev.balancePWRC - amount,
      }));
    }
    return res;
  };

  const refillPWRC = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      balancePWRC: prev.balancePWRC + amount,
    }));
  };

  return {
    wallet,
    switchChain,
    transferPWRC,
    refillPWRC,
  };
}
