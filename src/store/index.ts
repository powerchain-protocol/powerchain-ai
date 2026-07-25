import { useState, useEffect } from 'react';

export interface PowerChainGlobalStoreState {
  isWalletConnected: boolean;
  activeWalletAddress: string;
  pwrcBalance: number;
  selectedCluster: string;
}

let storeState: PowerChainGlobalStoreState = {
  isWalletConnected: true,
  activeWalletAddress: 'PWRC111111111111111111111111111111111111111',
  pwrcBalance: 42500,
  selectedCluster: 'mainnet-beta',
};

const listeners = new Set<() => void>();

export const store = {
  getState: () => storeState,
  setState: (partial: Partial<PowerChainGlobalStoreState>) => {
    storeState = { ...storeState, ...partial };
    listeners.forEach((l) => l());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function usePowerChainStore() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setState(store.getState());
    });
    return unsub;
  }, []);

  return {
    ...state,
    setWalletConnected: (connected: boolean, address?: string) =>
      store.setState({ isWalletConnected: connected, activeWalletAddress: address || '' }),
    setPwrcBalance: (balance: number) => store.setState({ pwrcBalance: balance }),
    setSelectedCluster: (cluster: string) => store.setState({ selectedCluster: cluster }),
  };
}
