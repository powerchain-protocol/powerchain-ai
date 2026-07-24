// Cetus Protocol CLMM Liquidity Pool on Sui Network for PowerChain Carbon Credits
export interface CetusPoolInfo {
  poolAddress: string;
  coinTypeA: string;
  coinTypeB: string;
  currentPrice: number;
  feeRate: number;
}

export const CETUS_POWER_POOLS: CetusPoolInfo[] = [
  {
    poolAddress: '0xcetus_power_sui_pool_0x8491204910249',
    coinTypeA: '0xpowerchain::power::POWER',
    coinTypeB: '0x2::sui::SUI',
    currentPrice: 0.84,
    feeRate: 0.002,
  },
];
