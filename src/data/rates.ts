export interface PowerGridRates {
  peakRateUsdPerKWh: number;
  offPeakRateUsdPerKWh: number;
  pwrcPerMWh: number;
  pythSolUsdRate: number;
  pythPwrcUsdRate: number;
}

export const CURRENT_GRID_RATES: PowerGridRates = {
  peakRateUsdPerKWh: 0.35,
  offPeakRateUsdPerKWh: 0.12,
  pwrcPerMWh: 1000,
  pythSolUsdRate: 180.5,
  pythPwrcUsdRate: 0.25,
};
