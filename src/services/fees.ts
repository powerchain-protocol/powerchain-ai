export const calculateServiceFee = (amount: number): { baseAmount: number; fee: number; total: number } => {
  const feeRate = 0.03; // 3% fee
  const fee = amount * feeRate;
  return {
    baseAmount: amount,
    fee: fee,
    total: amount + fee
  };
};

export const collectServiceFees = async (amount: number, userAddress: string) => {
  const { total, fee } = calculateServiceFee(amount);
  console.log(`Processing payment for ${userAddress}. Base: ${amount} PWRC. Fee (3%): ${fee} PWRC. Total: ${total} PWRC`);
  // Integrate with Solana/Sui to process the payment
  return { success: true, totalProcessed: total, feeCollected: fee };
};
