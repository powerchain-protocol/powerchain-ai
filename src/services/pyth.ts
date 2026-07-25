export interface PythPriceData {
  symbol: string;
  priceUsd: number;
  confidence: number;
  lastUpdated: string;
}

export async function fetchPythPrice(symbol: 'SOL' | 'PWRC' | 'ENERGY_MWH'): Promise<PythPriceData> {
  const basePrices = {
    SOL: 180.5,
    PWRC: 0.25,
    ENERGY_MWH: 45.0,
  };

  const current = basePrices[symbol] || 10.0;
  const jitter = (Math.random() - 0.5) * 0.5;

  return {
    symbol,
    priceUsd: parseFloat((current + jitter).toFixed(2)),
    confidence: 0.999,
    lastUpdated: new Date().toISOString(),
  };
}
