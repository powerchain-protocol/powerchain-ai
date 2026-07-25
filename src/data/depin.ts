export interface DePINNetworkStats {
  totalNodesActive: number;
  totalStorageCapacityGWh: number;
  totalPowerOutputMW: number;
  solanaTotalPwrcMinted: number;
  pythFeedsActiveCount: number;
}

export const DEPIN_NETWORK_STATS: DePINNetworkStats = {
  totalNodesActive: 24,
  totalStorageCapacityGWh: 1.25,
  totalPowerOutputMW: 478.0,
  solanaTotalPwrcMinted: 4250000,
  pythFeedsActiveCount: 3,
};
