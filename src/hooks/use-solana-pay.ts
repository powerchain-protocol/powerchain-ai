import { useState, useCallback } from 'react';

export interface SolanaPayTransaction {
  reference: string;
  recipient: string;
  amountSol: number;
  memo: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export function useSolanaPay() {
  const [activeTx, setActiveTx] = useState<SolanaPayTransaction | null>(null);
  const [loading, setLoading] = useState(false);

  const createPaymentRequest = useCallback(
    (amountSol: number, memo = 'PowerChain Energy Credit Settlement') => {
      setLoading(true);
      const ref = `solpay_ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const tx: SolanaPayTransaction = {
        reference: ref,
        recipient: 'PWRC111111111111111111111111111111111111111',
        amountSol,
        memo,
        status: 'pending',
      };
      setActiveTx(tx);
      setLoading(false);
      return tx;
    },
    []
  );

  const verifyPayment = useCallback(async (reference: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setActiveTx((prev) => (prev ? { ...prev, status: 'confirmed' } : null));
    setLoading(false);
    return true;
  }, []);

  return {
    activeTx,
    loading,
    createPaymentRequest,
    verifyPayment,
  };
}
