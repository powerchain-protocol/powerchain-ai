import { formatEnergyMWh, formatPowerMW, formatCurrencyUSD, formatPWRC } from './helpers';

export const Formats = {
  power: formatPowerMW,
  energy: formatEnergyMWh,
  currency: formatCurrencyUSD,
  credits: formatPWRC,
  percentage: (val: number) => `${val.toFixed(2)}%`,
  timestamp: (date: Date = new Date()) => date.toISOString(),
};
