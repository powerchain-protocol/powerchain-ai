export interface TreasuryInfo {
  treasuryAddress: string;
  feeWalletAddress: string;
  solBalance: number;
  pwrcBalance: number;
  totalFeesCollected24h: number;
  mpcThreshold: string;
  signersCount: number;
}

export function getTreasuryInfo(): TreasuryInfo {
  return {
    treasuryAddress: 'PWRC111111111111111111111111111111111111111',
    feeWalletAddress: 'FEE111111111111111111111111111111111111111',
    solBalance: 12450.8,
    pwrcBalance: 8500000,
    totalFeesCollected24h: 342.15,
    mpcThreshold: '3-of-5 MPC Vault',
    signersCount: 5,
  };
}
