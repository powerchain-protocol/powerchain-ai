export function isValidSolanaAddress(address: string): boolean {
  if (!address) return false;
  // Base58 regex format for Solana address (32-44 chars)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return base58Regex.test(address);
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateCreditAmount(amount: number): { valid: boolean; error?: string } {
  if (isNaN(amount) || amount <= 0) {
    return { valid: false, error: 'Amount must be greater than zero' };
  }
  if (amount > 1_000_000) {
    return { valid: false, error: 'Maximum single transaction limit is 1,000,000 PWRC' };
  }
  return { valid: true };
}
