export interface SolanaClusterConfig {
  name: string;
  endpoint: string;
  wsEndpoint: string;
  ticker: string;
}

export const SOLANA_CLUSTERS: Record<string, SolanaClusterConfig> = {
  'mainnet-beta': {
    name: 'Mainnet Beta',
    endpoint: 'https://api.mainnet-beta.solana.com',
    wsEndpoint: 'wss://api.mainnet-beta.solana.com',
    ticker: 'SOL',
  },
  devnet: {
    name: 'Devnet',
    endpoint: 'https://api.devnet.solana.com',
    wsEndpoint: 'wss://api.devnet.solana.com',
    ticker: 'SOL-DEV',
  },
  testnet: {
    name: 'Testnet',
    endpoint: 'https://api.testnet.solana.com',
    wsEndpoint: 'wss://api.testnet.solana.com',
    ticker: 'SOL-TEST',
  },
};

export function getActiveClusterConfig(cluster = 'mainnet-beta'): SolanaClusterConfig {
  return SOLANA_CLUSTERS[cluster] || SOLANA_CLUSTERS['mainnet-beta'];
}
