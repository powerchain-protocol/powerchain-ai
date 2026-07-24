import { PYTH_ENERGY_FEEDS } from './pyth';
import { HELIUS_GRID_NODES } from './helius';
import { RAYDIUM_POWER_POOLS } from './raydium';
import { METEORA_DLMM_POOLS } from './meteora';
import { ORCA_WHIRLPOOLS } from './orca';

export interface SolanaClusterStatus {
  cluster: 'mainnet-beta' | 'powerchain-L2';
  tps: number;
  blockHeight: number;
  slot: number;
  oracleStatus: string;
}

export function getSolanaGridStatus(): SolanaClusterStatus {
  return {
    cluster: 'powerchain-L2',
    tps: 3120,
    blockHeight: 284910241,
    slot: 295019284,
    oracleStatus: 'Pyth Active (3 feeds operational)',
  };
}

export {
  PYTH_ENERGY_FEEDS,
  HELIUS_GRID_NODES,
  RAYDIUM_POWER_POOLS,
  METEORA_DLMM_POOLS,
  ORCA_WHIRLPOOLS,
};
