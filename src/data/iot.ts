export interface IoTNodeReading {
  sensorId: string;
  voltageV: number;
  currentA: number;
  frequencyHz: number;
  powerFactor: number;
  timestamp: string;
}

export const IOT_LIVE_READINGS: IoTNodeReading[] = [
  {
    sensorId: 'iot-mojave-pv-01',
    voltageV: 480.2,
    currentA: 225.8,
    frequencyHz: 60.00,
    powerFactor: 0.99,
    timestamp: new Date().toISOString(),
  },
  {
    sensorId: 'iot-bess-04-cell-01',
    voltageV: 800.5,
    currentA: 52.6,
    frequencyHz: 60.01,
    powerFactor: 0.98,
    timestamp: new Date().toISOString(),
  },
];
