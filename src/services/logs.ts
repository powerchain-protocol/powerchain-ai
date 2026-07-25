export interface SystemLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'telemetry' | 'audit';
  source: string;
  message: string;
  details?: Record<string, any>;
}

const INITIAL_LOGS: SystemLogEntry[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    level: 'info',
    source: 'RPC-Gateway',
    message: 'Connected to Solana Mainnet-Beta RPC primary cluster.',
    details: { latencyMs: 18.4, cluster: 'mainnet-beta' },
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    level: 'telemetry',
    source: 'Grid-Oracle',
    message: 'Mojave Desert Solar Array #04 verified by Pyth Hermes oracle.',
    details: { mwhOutput: 120.4, oracleLatencyMs: 12.4 },
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    level: 'audit',
    source: 'PWRC-Vault',
    message: 'Cleared 1,000 PWRC tokenized power credits settlement via Solana Pay.',
    details: { reference: 'PWRC_PAY_991823', usdValue: 250.0 },
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    level: 'info',
    source: 'Workspace-OAuth',
    message: 'Parsed incoming Gmail telemetry receipt digest for CAISO BESS dispatch.',
    details: { userEmail: 'powerchain.network@gmail.com' },
  },
];

class SystemLogsManager {
  private logs: SystemLogEntry[] = [...INITIAL_LOGS];
  private listeners: Set<() => void> = new Set();

  public getLogs(): SystemLogEntry[] {
    return this.logs;
  }

  public addLog(
    level: SystemLogEntry['level'],
    source: string,
    message: string,
    details?: Record<string, any>
  ): SystemLogEntry {
    const entry: SystemLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      level,
      source,
      message,
      details,
    };
    this.logs.unshift(entry);
    this.notify();
    return entry;
  }

  public clearLogs(): void {
    this.logs = [];
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }
}

export const logsService = new SystemLogsManager();
