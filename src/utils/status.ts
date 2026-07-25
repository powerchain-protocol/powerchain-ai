export type NodeStatusType = 'optimal' | 'warning' | 'maintenance' | 'offline';

export interface SystemStatusSummary {
  status: 'healthy' | 'degraded' | 'critical';
  activeNodes: number;
  totalNodes: number;
  overallUptimePercent: number;
  avgLatencyMs: number;
  pythOracleSynced: boolean;
  solanaRpcCluster: string;
}

export function getSystemStatusSummary(): SystemStatusSummary {
  return {
    status: 'healthy',
    activeNodes: 24,
    totalNodes: 24,
    overallUptimePercent: 99.98,
    avgLatencyMs: 14.2,
    pythOracleSynced: true,
    solanaRpcCluster: 'mainnet-beta',
  };
}

export function getStatusBadgeColor(status: NodeStatusType): string {
  switch (status) {
    case 'optimal':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'warning':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'maintenance':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    case 'offline':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  }
}
