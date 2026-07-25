import { CREDIT_PACKAGES, PowerCreditPackage } from '../data/credits';

export const CreditsService = {
  getPackages: (): PowerCreditPackage[] => CREDIT_PACKAGES,

  processSettlement: async (packageId: string, walletAddress: string) => {
    const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId);
    if (!pkg) throw new Error(`Credit package '${packageId}' not found`);

    const signature = `sol_sig_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return {
      status: 'confirmed',
      signature,
      package: pkg,
      totalCreditsIssued: pkg.credits + pkg.bonusCredits,
      mwhEquivalent: pkg.mwhEquivalent,
      recipient: walletAddress,
      settledAt: new Date().toISOString(),
    };
  },
};
