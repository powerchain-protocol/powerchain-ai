// PowerChain Tokenized Chat & AI Credit Engine (PWRC)
export const PWRC_COSTS = {
  STANDARD_QUERY: 10, // 10 PWRC per standard chat query
  EXECUTIVE_REPORT: 25, // 25 PWRC per complex report generation
  LIVE_FORECAST: 15, // 15 PWRC per 24h predictive forecast
  BYO_API_KEY_COST: 0, // 0 PWRC if user supplies their own API Key
};

export interface CreditDeductionResult {
  success: boolean;
  deductedAmount: number;
  remainingBalance: number;
  reason?: string;
}

export function deductPwrcCredits(
  currentBalance: number,
  useOwnApiKey: boolean,
  cost: number = PWRC_COSTS.STANDARD_QUERY
): CreditDeductionResult {
  if (useOwnApiKey) {
    return {
      success: true,
      deductedAmount: 0,
      remainingBalance: currentBalance,
      reason: 'BYO API Key Active (Free PWRC Usage)',
    };
  }

  if (currentBalance < cost) {
    return {
      success: false,
      deductedAmount: 0,
      remainingBalance: currentBalance,
      reason: `Insufficient PWRC Credits. Requires ${cost} PWRC, but balance is ${currentBalance} PWRC.`,
    };
  }

  const remaining = currentBalance - cost;
  return {
    success: true,
    deductedAmount: cost,
    remainingBalance: remaining,
  };
}
