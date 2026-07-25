export interface GridNodeTelemetry {
  nodeId: string;
  name: string;
  region: string;
  status: 'active' | 'degraded' | 'offline' | 'maintenance';
  uptime: string;
  uptimePercentage: number;
  latencyMs: number;
  powerOutputMW: number;
  peakOutputMW: number;
  loadPercent: number;
  temperatureC: number;
  frequencyHz: number;
  solarContributionPercent: number;
  batteryReservePercent: number;
  lastUpdated: string;
}

export interface TelemetryOverview {
  totalNodes: number;
  activeNodes: number;
  totalOutputMW: number;
  avgLatencyMs: number;
  avgUptimePercent: number;
  peakGridEfficiencyPercent: number;
  carbonOffsetTons: number;
  pwrcCreditsGenerated: number;
  telemetryStreamActive: boolean;
}
