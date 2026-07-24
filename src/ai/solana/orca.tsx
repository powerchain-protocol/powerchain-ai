// Orca Whirlpools for Renewable Energy Derivatives
export interface OrcaWhirlpool {
  address: string;
  tokenA: string;
  tokenB: string;
  tickSpacing: number;
  liquidity: string;
}

export const ORCA_WHIRLPOOLS: OrcaWhirlpool[] = [
  {
    address: 'WhirlpoolPowerSol11111111111111111111111111',
    tokenA: 'POWER',
    tokenB: 'SOL',
    tickSpacing: 64,
    liquidity: '84920491024912',
  },
];
