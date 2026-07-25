export interface SolanaPayUrlParams {
  recipient: string;
  amount: number;
  label?: string;
  message?: string;
  memo?: string;
}

export function generateSolanaPayUrl(params: SolanaPayUrlParams): string {
  const url = new URL(`solana:${params.recipient}`);
  if (params.amount) url.searchParams.append('amount', params.amount.toString());
  if (params.label) url.searchParams.append('label', params.label);
  if (params.message) url.searchParams.append('message', params.message);
  if (params.memo) url.searchParams.append('memo', params.memo);
  return url.toString();
}
