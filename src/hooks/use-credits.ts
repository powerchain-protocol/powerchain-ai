import { useState, useCallback } from 'react';
import { CREDIT_PACKAGES, PowerCreditPackage } from '../data/credits';

export function useCredits() {
  const [balance, setBalance] = useState<number>(42500);
  const [loading, setLoading] = useState<boolean>(false);

  const purchaseCredits = useCallback(async (pkg: PowerCreditPackage) => {
    setLoading(true);
    // Simulate Solana Pay or Pyth oracle credit settlement
    await new Promise((resolve) => setTimeout(resolve, 800));
    setBalance((prev) => prev + pkg.credits + pkg.bonusCredits);
    setLoading(false);
    return { success: true, newBalance: balance + pkg.credits + pkg.bonusCredits };
  }, [balance]);

  const redeemCredits = useCallback(async (amount: number) => {
    if (balance < amount) {
      throw new Error('Insufficient PWRC credits balance');
    }
    setBalance((prev) => prev - amount);
    return { success: true, remaining: balance - amount };
  }, [balance]);

  return {
    balance,
    packages: CREDIT_PACKAGES,
    loading,
    purchaseCredits,
    redeemCredits,
  };
}
