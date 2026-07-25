export interface MetricPoint {
  date: string;
  value: number;
  label?: string;
}

export interface EnergyProductionData {
  date: string;
  'This Month': number;
  'Last Month': number;
  powerOutput?: string;
  uptime?: string;
  latency?: string;
}

export interface EmissionsData {
  date: string;
  'Emissions Avoided': number;
  'Net Footprint': number;
}

export interface BatteryTelemetryData {
  timestamp: string;
  'BESS-04 State of Charge (%)': number;
  'Grid Frequency (Hz)': number;
  'Temperature (C)': number;
}

export interface GranularNodeTelemetryChartPoint {
  time: string;
  health: number;
  load: number;
  node: string;
  region?: string;
  uptime: string;
  latency: string;
  power: string;
  capacityMW?: number;
  frequency?: string;
  batteryLevel?: string;
  oracleStatus?: string;
}

export interface ChartSeries {
  name: string;
  dataKey: string;
  color: string;
}
