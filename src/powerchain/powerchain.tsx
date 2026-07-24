// PowerChain High-Throughput Sub-Station & Smart Grid Protocol Kernel
export interface PowerChainSubstation {
  id: string;
  name: string;
  capacityMW: number;
  currentOutputMW: number;
  status: 'optimal' | 'warning' | 'maintenance';
  p2pTradeVolume24h: number;
  carbonOffsetTons: number;
}

export const POWERCHAIN_SUBSTATIONS: PowerChainSubstation[] = [
  {
    id: 'sub-alpha-01',
    name: 'Mojave Solar Hub - Substation A',
    capacityMW: 450,
    currentOutputMW: 412,
    status: 'optimal',
    p2pTradeVolume24h: 184500,
    carbonOffsetTons: 1240,
  },
  {
    id: 'sub-beta-02',
    name: 'Columbia Gorge Wind Facility B',
    capacityMW: 320,
    currentOutputMW: 298,
    status: 'optimal',
    p2pTradeVolume24h: 142000,
    carbonOffsetTons: 980,
  },
  {
    id: 'sub-gamma-03',
    name: 'Texas Panhandle Battery Array (BESS-04)',
    capacityMW: 200,
    currentOutputMW: 185,
    status: 'optimal',
    p2pTradeVolume24h: 98000,
    carbonOffsetTons: 640,
  },
];

export function getPowerChainOverview() {
  return {
    totalCapacityMW: 970,
    activeSubstations: 3,
    avgEfficiencyPct: 98.4,
    p2pSettlements24hUSD: 424500,
    mpcNodeSecurityScore: '99.98% Cryptographic Integrity',
  };
}
