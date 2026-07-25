import { CURRENT_GRID_RATES } from './rates';

export interface PowerCalculationResult {
  mwhOutput: number;
  pwrcCreditsEarned: number;
  estimatedUsdValue: number;
  carbonOffsetTonsCo2: number;
}

export function calculatePowerCredits(
  mwhOutput: number,
  isPeakHours = true
): PowerCalculationResult {
  const pwrcCreditsEarned = mwhOutput * CURRENT_GRID_RATES.pwrcPerMWh;
  const estimatedUsdValue = pwrcCreditsEarned * CURRENT_GRID_RATES.pythPwrcUsdRate;
  // 1 MWh of clean renewable energy offsets ~0.709 metric tons of CO2
  const carbonOffsetTonsCo2 = parseFloat((mwhOutput * 0.709).toFixed(2));

  return {
    mwhOutput,
    pwrcCreditsEarned,
    estimatedUsdValue,
    carbonOffsetTonsCo2,
  };
}
