export const initializeSolanaPay = async (amount: number, reference: string) => {
  console.log(`Initializing Solana Pay for ${amount} PWRC with ref ${reference}`);
  return {
    status: 'initialized',
    url: `solana:https://powerchain.network/api/pay?amount=${amount}&ref=${reference}`
  };
};
