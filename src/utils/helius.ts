export interface HeliusWebhookPayload {
  account: string;
  type: 'ENERGY_CREDIT_MINT' | 'SETTLEMENT_PAYMENT' | 'NODE_HEALTH_PING';
  timestamp: number;
  signature: string;
}

export async function fetchHeliusNodeTelemetry(nodeAddress: string) {
  return {
    nodeAddress,
    eventsCount24h: 14200,
    webhooksActive: true,
    lastSignature: '5K2p...x819',
  };
}
