import { EnergyProductionData, EmissionsData, BatteryTelemetryData } from '../types/charts';

export const monthlyEnergyProduction: EnergyProductionData[] = [
  { date: 'May 01', 'This Month': 12, 'Last Month': 10 },
  { date: 'May 05', 'This Month': 15, 'Last Month': 12 },
  { date: 'May 09', 'This Month': 18, 'Last Month': 14 },
  { date: 'May 13', 'This Month': 14, 'Last Month': 11 },
  { date: 'May 17', 'This Month': 20, 'Last Month': 15 },
  { date: 'May 21', 'This Month': 24, 'Last Month': 18 },
  { date: 'May 25', 'This Month': 22, 'Last Month': 17 },
  { date: 'May 29', 'This Month': 21, 'Last Month': 16 },
];

export const carbonEmissionsAvoided: EmissionsData[] = [
  { date: 'Jan', 'Emissions Avoided': 1120, 'Net Footprint': 110 },
  { date: 'Feb', 'Emissions Avoided': 1340, 'Net Footprint': 95 },
  { date: 'Mar', 'Emissions Avoided': 1480, 'Net Footprint': 90 },
  { date: 'Apr', 'Emissions Avoided': 1680, 'Net Footprint': 85 },
  { date: 'May', 'Emissions Avoided': 1920, 'Net Footprint': 70 },
];

export const batteryTelemetryRealtime: BatteryTelemetryData[] = [
  { timestamp: '12:00', 'BESS-04 State of Charge (%)': 92, 'Grid Frequency (Hz)': 60.01, 'Temperature (C)': 24 },
  { timestamp: '12:15', 'BESS-04 State of Charge (%)': 90, 'Grid Frequency (Hz)': 60.02, 'Temperature (C)': 25 },
  { timestamp: '12:30', 'BESS-04 State of Charge (%)': 88, 'Grid Frequency (Hz)': 60.00, 'Temperature (C)': 25 },
  { timestamp: '12:45', 'BESS-04 State of Charge (%)': 88.4, 'Grid Frequency (Hz)': 60.01, 'Temperature (C)': 24 },
];
