export interface MetricPoint {
  date: string;
  value: number;
  label?: string;
}

export interface EnergyProductionData {
  date: string;
  'This Month': number;
  'Last Month': number;
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

export interface ChartSeries {
  name: string;
  dataKey: string;
  color: string;
}
