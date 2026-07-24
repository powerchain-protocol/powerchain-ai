import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  balance: string;
  connectWallet: (providerType?: string) => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletState>({
  isConnected: false,
  address: null,
  network: 'PowerChain Gridnet Mainnet',
  balance: '0.00 PWR',
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(() => {
    return localStorage.getItem('powerchain_wallet_connected') === 'true';
  });
  const [address, setAddress] = useState<string | null>(() => {
    return localStorage.getItem('powerchain_wallet_address') || null;
  });

  const connectWallet = async (providerType = 'Metamask') => {
    // Generate realistic web3 account address for PowerChain network
    const mockAddress = `0x71C${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
    setAddress(mockAddress);
    setIsConnected(true);
    localStorage.setItem('powerchain_wallet_connected', 'true');
    localStorage.setItem('powerchain_wallet_address', mockAddress);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    localStorage.removeItem('powerchain_wallet_connected');
    localStorage.removeItem('powerchain_wallet_address');
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        network: 'PowerChain Gridnet (Chain ID 784)',
        balance: '14,280.50 PWR',
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
