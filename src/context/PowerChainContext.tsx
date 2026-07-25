import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RENEWABLE_ASSETS, RenewableAsset } from '../data/renewables';
import { USER_ASSETS, AssetSummary } from '../data/assets';
import { ConnectedWallet, USER_WALLETS } from '../data/wallets';

interface PowerChainContextType {
  assets: RenewableAsset[];
  balances: AssetSummary[];
  wallets: ConnectedWallet[];
  activeWallet: ConnectedWallet;
  pwrcCredits: number;
  totalGenerationMW: number;
  updateNodeStatus: (id: string, status: RenewableAsset['status']) => void;
  addCredits: (amount: number) => void;
}

const PowerChainContext = createContext<PowerChainContextType | undefined>(undefined);

export const PowerChainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<RenewableAsset[]>(RENEWABLE_ASSETS);
  const [balances] = useState<AssetSummary[]>(USER_ASSETS);
  const [wallets] = useState<ConnectedWallet[]>(USER_WALLETS);
  const [pwrcCredits, setPwrcCredits] = useState<number>(42500);

  const totalGenerationMW = assets.reduce((sum, a) => sum + a.currentOutputMW, 0);

  const updateNodeStatus = (id: string, status: RenewableAsset['status']) => {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const addCredits = (amount: number) => {
    setPwrcCredits((prev) => prev + amount);
  };

  return (
    <PowerChainContext.Provider
      value={{
        assets,
        balances,
        wallets,
        activeWallet: wallets[0],
        pwrcCredits,
        totalGenerationMW,
        updateNodeStatus,
        addCredits,
      }}
    >
      {children}
    </PowerChainContext.Provider>
  );
};

export function usePowerChainContext() {
  const ctx = useContext(PowerChainContext);
  if (!ctx) {
    throw new Error('usePowerChainContext must be used within PowerChainProvider');
  }
  return ctx;
}
