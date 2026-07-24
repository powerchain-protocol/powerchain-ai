// Raydium Concentrated Liquidity Pools for PowerChain Assets
export interface RaydiumPoolInfo {
  poolId: string;
  pair: string;
  tvlUSD: number;
  apr24h: number;
  volume24hUSD: number;
}

export const RAYDIUM_POWER_POOLS: RaydiumPoolInfo[] = [
  {
    poolId: '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2',
    pair: 'POWER / SOL',
    tvlUSD: 4850000,
    apr24h: 38.4,
    volume24hUSD: 1240000,
  },
  {
    poolId: '7XawhB1gmy2323hgh128h123h123h123h123h12312312',
    pair: 'REC / USDC',
    tvlUSD: 2150000,
    apr24h: 22.1,
    volume24hUSD: 680000,
  },
];
