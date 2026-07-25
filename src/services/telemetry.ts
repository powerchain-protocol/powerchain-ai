export interface TelemetryNodeMetric {
  nodeId: string;
  nodeName: string;
  region: string;
  powerMW: number;
  voltageV: number;
  frequencyHz: number;
  bessSocPercent?: number;
  latencyMs: number;
  status: 'online' | 'degraded' | 'offline';
  oracleVerified: boolean;
  lastPing: string;
}

export interface GridTelemetrySnapshot {
  totalPowerOutputMW: number;
  totalStorageCapacityGWh: number;
  activeNodeCount: number;
  gridFrequencyHz: number;
  pythAvgLatencyMs: number;
  nodes: TelemetryNodeMetric[];
  timestamp: string;
}

export const INITIAL_TELEMETRY_NODES: TelemetryNodeMetric[] = [
  {
    nodeId: 'node-mojave-pv-01',
    nodeName: 'Mojave Desert Solar Array #04',
    region: 'CAISO-South',
    powerMW: 120.4,
    voltageV: 480.2,
    frequencyHz: 60.01,
    latencyMs: 12.4,
    status: 'online',
    oracleVerified: true,
    lastPing: new Date().toISOString(),
  },
  {
    nodeId: 'node-bess-silicon-04',
    nodeName: 'Silicon Valley BESS-04 Storage Bank',
    region: 'CAISO-North',
    powerMW: 42.5,
    voltageV: 800.5,
    frequencyHz: 60.00,
    bessSocPercent: 88.4,
    latencyMs: 14.8,
    status: 'online',
    oracleVerified: true,
    lastPing: new Date().toISOString(),
  },
  {
    nodeId: 'node-tehachapi-wind-02',
    nodeName: 'Tehachapi Pass Wind Generation Farm',
    region: 'CAISO-South',
    powerMW: 185.2,
    voltageV: 4160.0,
    frequencyHz: 59.99,
    latencyMs: 16.2,
    status: 'online',
    oracleVerified: true,
    lastPing: new Date().toISOString(),
  },
  {
    nodeId: 'node-columbia-hydro-01',
    nodeName: 'Columbia River Clean Hydro Facility',
    region: 'BPA-Northwest',
    powerMW: 150.0,
    voltageV: 13800.0,
    frequencyHz: 60.00,
    latencyMs: 11.5,
    status: 'online',
    oracleVerified: true,
    lastPing: new Date().toISOString(),
  },
];

export class TelemetryService {
  private static nodes: TelemetryNodeMetric[] = [...INITIAL_TELEMETRY_NODES];

  public static getSnapshot(): GridTelemetrySnapshot {
    const totalMW = parseFloat(this.nodes.reduce((acc, n) => acc + n.powerMW, 0).toFixed(1));
    const avgLatency = parseFloat(
      (this.nodes.reduce((acc, n) => acc + n.latencyMs, 0) / this.nodes.length).toFixed(1)
    );

    return {
      totalPowerOutputMW: totalMW,
      totalStorageCapacityGWh: 1.25,
      activeNodeCount: this.nodes.filter((n) => n.status === 'online').length,
      gridFrequencyHz: 60.0,
      pythAvgLatencyMs: avgLatency,
      nodes: this.nodes,
      timestamp: new Date().toISOString(),
    };
  }

  public static getNodeById(id: string): TelemetryNodeMetric | undefined {
    return this.nodes.find((n) => n.nodeId === id || n.nodeId.includes(id));
  }

  public static searchTelemetry(query: string): TelemetryNodeMetric[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.nodes;
    return this.nodes.filter(
      (n) =>
        n.nodeName.toLowerCase().includes(q) ||
        n.nodeId.toLowerCase().includes(q) ||
        n.region.toLowerCase().includes(q)
    );
  }
}
