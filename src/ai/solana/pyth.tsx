// Pyth Network Oracle Feed Integration for PowerChain
export interface PythEnergyPriceFeed {
  symbol: string;
  priceUSD: number;
  confidence: number;
  lastUpdated: string;
  feedId: string;
  status: 'active' | 'stale' | 'circuit-breaker';
}

export const PYTH_ENERGY_FEEDS: PythEnergyPriceFeed[] = [
  {
    symbol: 'KWH/USD',
    priceUSD: 0.142,
    confidence: 0.0002,
    lastUpdated: '1s ago',
    feedId: '0xe62df6e014e2b60539639303287db1c981173b62',
    status: 'active',
  },
  {
    symbol: 'MWH/USD (PJM West Peak)',
    priceUSD: 48.75,
    confidence: 0.12,
    lastUpdated: '2s ago',
    feedId: '0xff61491a931112ddf1bd8147cd1b641375f79f58',
    status: 'active',
  },
  {
    symbol: 'CARBON-TON/USD',
    priceUSD: 84.30,
    confidence: 0.05,
    lastUpdated: '4s ago',
    feedId: '0xc112b231908d13264789d20d4f04c62b21b79878',
    status: 'active',
  },
];

export function getPythFeed(symbol: string): PythEnergyPriceFeed | undefined {
  return PYTH_ENERGY_FEEDS.find((f) => f.symbol.toLowerCase().includes(symbol.toLowerCase()));
}
