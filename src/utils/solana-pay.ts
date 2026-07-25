export function generateSolanaPayUrl(recipient: string, amountPwrc: number, label: string, memo: string): string {
  const params = new URLSearchParams({
    amount: amountPwrc.toString(),
    label,
    memo,
  });
  return `solana:${recipient}?${params.toString()}`;
}
