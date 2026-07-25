import { SYSTEM_CONFIG } from '../config/system';

export interface SolanaClusterStatus {
  endpoint: string;
  slot: number;
  tps: number;
  blockTimeMs: number;
  status: 'online' | 'degraded' | 'offline';
}

export async function getSolanaClusterStatus(): Promise<SolanaClusterStatus> {
  return {
    endpoint: SYSTEM_CONFIG.solanaRpcEndpoint,
    slot: 284102941,
    tps: 3410,
    blockTimeMs: 400,
    status: 'online',
  };
}

export function truncateAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
