export const API_BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export interface TelemetryResponse {
  nodes: {
    id: string;
    name: string;
    powerOutputMW: number;
    uptime: string;
    latency: string;
  }[];
  totalOutputMWh: number;
  oracleVerified: boolean;
  timestamp: string;
}

export interface CreditsResponse {
  symbol: string;
  userBalance: number;
  usdEquivalent: number;
  mwhEquivalent: number;
  mintAddress: string;
}

export const ApiClient = {
  getHealth: async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/health`);
    return res.json();
  },

  getTelemetry: async (): Promise<TelemetryResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/telemetry`);
    return res.json();
  },

  getCredits: async (): Promise<CreditsResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/credits`);
    return res.json();
  },

  getPythPrices: async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/pyth`);
    return res.json();
  },

  searchGlobal: async (query: string) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/search?q=${encodeURIComponent(query)}`);
    return res.json();
  },

  getTelemetryNodeDetails: async (nodeId: string) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/telemetry/nodes?id=${encodeURIComponent(nodeId)}`);
    return res.json();
  },

  createSolanaPayRequest: async (amountSol: number, memo?: string) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/solana-pay/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountSol, memo }),
    });
    return res.json();
  },
};
