export async function createStripeEnergyCreditSession(amountUsd: number) {
  return {
    sessionId: `cs_test_${Date.now()}`,
    url: `https://checkout.stripe.com/pay/cs_test_${Date.now()}`,
  };
}
