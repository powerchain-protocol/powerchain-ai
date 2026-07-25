export interface APIClientConfig {
  clientId: string;
  name: string;
  endpoint: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastPingMs: number;
}

export const API_CLIENTS_LIST: APIClientConfig[] = [
  {
    clientId: 'client-helius-rpc',
    name: 'Helius High-Throughput RPC',
    endpoint: 'https://mainnet.helius-rpc.com',
    status: 'connected',
    lastPingMs: 12,
  },
  {
    clientId: 'client-pyth-hermes',
    name: 'Pyth Hermes Price Oracle Client',
    endpoint: 'https://hermes.pyth.network',
    status: 'connected',
    lastPingMs: 18,
  },
  {
    clientId: 'client-birdeye-v2',
    name: 'Birdeye Market Data Client',
    endpoint: 'https://public-api.birdeye.so',
    status: 'connected',
    lastPingMs: 24,
  },
  {
    clientId: 'client-gmail-workspace',
    name: 'Google Workspace Gmail API Client',
    endpoint: 'https://gmail.googleapis.com',
    status: 'connected',
    lastPingMs: 35,
  },
];
