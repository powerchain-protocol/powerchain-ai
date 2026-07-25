import { useState, useEffect } from 'react';
import { GridNodeTelemetry, TelemetryOverview } from '../types/telemetry';

const mockNodes: GridNodeTelemetry[] = [
  {
    nodeId: 'node-alpha-1',
    name: 'Node Alpha (Solana Mainnet)',
    region: 'US-West (California Solar Array)',
    status: 'active',
    uptime: '99.99%',
    uptimePercentage: 99.99,
    latencyMs: 12,
    powerOutputMW: 145.2,
    peakOutputMW: 180.0,
    loadPercent: 62,
    temperatureC: 38.4,
    frequencyHz: 60.01,
    solarContributionPercent: 88,
    batteryReservePercent: 94,
    lastUpdated: new Date().toISOString(),
  },
  {
    nodeId: 'node-beta-2',
    name: 'Node Beta (Wind Substation)',
    region: 'EU-Central (Germany Offshore Wind)',
    status: 'active',
    uptime: '99.95%',
    uptimePercentage: 99.95,
    latencyMs: 15,
    powerOutputMW: 112.8,
    peakOutputMW: 150.0,
    loadPercent: 75,
    temperatureC: 41.2,
    frequencyHz: 50.02,
    solarContributionPercent: 12,
    batteryReservePercent: 88,
    lastUpdated: new Date().toISOString(),
  },
  {
    nodeId: 'node-gamma-3',
    name: 'Node Gamma (Hydro Energy Cluster)',
    region: 'APAC-East (Japan Microgrid)',
    status: 'active',
    uptime: '99.98%',
    uptimePercentage: 99.98,
    latencyMs: 18,
    powerOutputMW: 98.4,
    peakOutputMW: 120.0,
    loadPercent: 82,
    temperatureC: 36.8,
    frequencyHz: 50.0,
    solarContributionPercent: 45,
    batteryReservePercent: 91,
    lastUpdated: new Date().toISOString(),
  },
  {
    nodeId: 'node-delta-4',
    name: 'Node Delta (Geothermal Microgrid)',
    region: 'US-East (Icelandic Thermal Station)',
    status: 'active',
    uptime: '99.91%',
    uptimePercentage: 99.91,
    latencyMs: 22,
    powerOutputMW: 64.1,
    peakOutputMW: 90.0,
    loadPercent: 71,
    temperatureC: 44.1,
    frequencyHz: 60.0,
    solarContributionPercent: 5,
    batteryReservePercent: 82,
    lastUpdated: new Date().toISOString(),
  },
];

export function useTelemetry() {
  const [nodes, setNodes] = useState<GridNodeTelemetry[]>(mockNodes);
  const [overview, setOverview] = useState<TelemetryOverview>({
    totalNodes: 12,
    activeNodes: 12,
    totalOutputMW: 420.5,
    avgLatencyMs: 14.8,
    avgUptimePercent: 99.98,
    peakGridEfficiencyPercent: 98.4,
    carbonOffsetTons: 1284.5,
    pwrcCreditsGenerated: 42050,
    telemetryStreamActive: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          const jitter = (Math.random() - 0.5) * 1.5;
          const newPower = Math.max(20, Math.min(node.peakOutputMW, +(node.powerOutputMW + jitter).toFixed(1)));
          return {
            ...node,
            powerOutputMW: newPower,
            latencyMs: Math.max(8, Math.min(45, Math.round(node.latencyMs + (Math.random() - 0.5) * 2))),
            lastUpdated: new Date().toISOString(),
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return { nodes, overview };
}
