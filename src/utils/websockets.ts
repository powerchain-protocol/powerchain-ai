export interface WebSocketTelemetryMessage {
  type: 'TELEMETRY_UPDATE' | 'ORACLE_PRICE_TICK' | 'GRID_ALERT';
  data: any;
  timestamp: string;
}

export function createWebSocketTelemetryFeed(onMessage: (msg: WebSocketTelemetryMessage) => void) {
  const interval = setInterval(() => {
    const mockMessage: WebSocketTelemetryMessage = {
      type: 'TELEMETRY_UPDATE',
      data: {
        nodeId: 'bess-04',
        powerMW: parseFloat((40 + Math.random() * 5).toFixed(1)),
        pythLatencyMs: parseFloat((12 + Math.random() * 4).toFixed(1)),
      },
      timestamp: new Date().toISOString(),
    };
    onMessage(mockMessage);
  }, 5000);

  return () => clearInterval(interval);
}
