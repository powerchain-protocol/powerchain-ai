export interface IntegrationConfig {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'configuring';
  protocol: string;
  lastPingMs: number;
}

export const INTEGRATIONS: IntegrationConfig[] = [
  { id: 'solana-rpc', name: 'Solana Mainnet Beta RPC', status: 'connected', protocol: 'HTTPS/WSS', lastPingMs: 14.2 },
  { id: 'pyth-network', name: 'Pyth Oracle Price Feeds', status: 'connected', protocol: 'Hermes REST', lastPingMs: 12.8 },
  { id: 'gmail-workspace', name: 'Google Workspace Gmail API', status: 'connected', protocol: 'OAuth2 REST', lastPingMs: 85.0 },
  { id: 'caiso-grid', name: 'CAISO Regional Grid Telemetry', status: 'connected', protocol: 'DNP3/Modbus', lastPingMs: 32.1 },
];
