import { CETUS_POWER_POOLS } from './cetus';

export interface SuiGridNetworkStatus {
  network: 'Sui Mainnet' | 'PowerChain Sui Subnet';
  epoch: number;
  checkpoint: number;
  tps: number;
  gasPriceMist: number;
}

export function getSuiNetworkStatus(): SuiGridNetworkStatus {
  return {
    network: 'PowerChain Sui Subnet',
    epoch: 582,
    checkpoint: 49201924,
    tps: 4500,
    gasPriceMist: 750,
  };
}

export { CETUS_POWER_POOLS };
