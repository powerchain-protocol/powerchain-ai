export interface AssetSummary {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
}

export const USER_ASSETS: AssetSummary[] = [
  {
    symbol: 'PWRC',
    name: 'PowerChain Grid Credit',
    balance: 42500,
    usdValue: 10625.0,
    change24h: 4.8,
  },
  {
    symbol: 'SOL',
    name: 'Solana (Native Fee Vault)',
    balance: 18.42,
    usdValue: 3315.6,
    change24h: 2.1,
  },
  {
    symbol: 'REC-2026',
    name: 'Tokenized Renewable Energy Cert',
    balance: 120,
    usdValue: 3000.0,
    change24h: 0.0,
  },
];
