export interface DePINHardwareDevice {
  deviceId: string;
  name: string;
  macAddress: string;
  firmwareVersion: string;
  gridRole: 'generator' | 'storage' | 'substation' | 'meter';
  status: 'online' | 'degraded' | 'offline';
  temperatureC: number;
}

export const HARDWARE_NODES: DePINHardwareDevice[] = [
  {
    deviceId: 'hw-mojave-04',
    name: 'Mojave Solar Inverter #04',
    macAddress: '00:1B:44:11:3A:B7',
    firmwareVersion: 'v2.4.12-powerchain',
    gridRole: 'generator',
    status: 'online',
    temperatureC: 42.5,
  },
  {
    deviceId: 'hw-bess-silicon-01',
    name: 'Silicon Valley Battery Controller BESS-04',
    macAddress: '00:1B:44:88:9C:F1',
    firmwareVersion: 'v3.1.0-powerchain',
    gridRole: 'storage',
    status: 'online',
    temperatureC: 38.2,
  },
];
