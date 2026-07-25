export interface BirdeyeTokenOverview {
  address: string;
  symbol: string;
  price: number;
  v24hUSD: number;
  liquidity: number;
  mc: number;
}

export async function getBirdeyeTokenOverview(address: string): Promise<BirdeyeTokenOverview> {
  return {
    address,
    symbol: 'PWRC',
    price: 1.48,
    v24hUSD: 1420500,
    liquidity: 8400000,
    mc: 148000000,
  };
}
