export interface TelemetrySnapshot {
  id: string;
  nodeAddress: string;
  timestamp: string;
  powerOutputMW: number;
  uptimePercent: number;
  latencyMs: number;
  pythOracleSignature?: string;
}

const telemetryStorageKey = 'powerchain_telemetry_snapshots_v1';

export const TelemetryStorage = {
  saveSnapshot: (snapshot: TelemetrySnapshot): void => {
    try {
      const existing = TelemetryStorage.getSnapshots();
      existing.unshift(snapshot);
      localStorage.setItem(telemetryStorageKey, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {
      console.warn('Failed to save telemetry snapshot to localStorage', e);
    }
  },

  getSnapshots: (): TelemetrySnapshot[] => {
    try {
      const raw = localStorage.getItem(telemetryStorageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  clearSnapshots: (): void => {
    localStorage.removeItem(telemetryStorageKey);
  },
};
