export interface PowerChainPlugin {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  author: string;
}

export const SYSTEM_PLUGINS: PowerChainPlugin[] = [
  { id: 'bess-auto-dispatch', name: 'BESS Battery Storage Optimizer', version: '1.2.0', enabled: true, author: 'PowerChain Core' },
  { id: 'esg-carbon-auditor', name: 'Scope 1-3 Carbon Accounting Plugin', version: '1.0.4', enabled: true, author: 'PowerChain Core' },
  { id: 'solana-blinks-action', name: 'Solana Blinks Payment Actions Plugin', version: '2.1.0', enabled: true, author: 'Solana Foundation' },
];
