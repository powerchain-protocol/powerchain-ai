export interface PythPriceFeed {
  symbol: string;
  price: number;
  confidence: number;
  change24h: number;
  lastUpdated: string;
}

export async function getPythOraclePrices(): Promise<Record<string, PythPriceFeed>> {
  return {
    'SOL/USD': {
      symbol: 'SOL/USD',
      price: 184.25,
      confidence: 0.12,
      change24h: 3.4,
      lastUpdated: new Date().toISOString(),
    },
    'PWRC/USD': {
      symbol: 'PWRC/USD',
      price: 1.48,
      confidence: 0.01,
      change24h: 8.9,
      lastUpdated: new Date().toISOString(),
    },
    'KWH/USD': {
      symbol: 'KWH/USD',
      price: 0.142,
      confidence: 0.001,
      change24h: -0.5,
      lastUpdated: new Date().toISOString(),
    },
  };
}
