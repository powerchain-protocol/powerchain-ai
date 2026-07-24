// Meteora Dynamic DLMM Pools for Carbon Token Yield
export interface MeteoraDlmmPool {
  poolAddress: string;
  name: string;
  binStep: number;
  baseFeePct: number;
  tvlUSD: number;
}

export const METEORA_DLMM_POOLS: MeteoraDlmmPool[] = [
  {
    poolAddress: '8Yd321kjs8dh128dh128dh128dh128dh128dh128dh',
    name: 'POWER - USDC Dynamic Vault',
    binStep: 10,
    baseFeePct: 0.15,
    tvlUSD: 3120000,
  },
];
