export interface BlinkAction {
  icon: string;
  label: string;
  title: string;
  description: string;
  disabled?: boolean;
}

export function createGridBlinkUrl(actionType: string, amount: number): string {
  const baseUrl = 'solana-action:https://powerchain.network/api/blinks';
  return `${baseUrl}/${actionType}?amount=${amount}`;
}

export function parseBlinkPayload(url: string) {
  try {
    const parsed = new URL(url.replace('solana-action:', 'https:'));
    return {
      action: parsed.pathname.split('/').pop(),
      amount: parsed.searchParams.get('amount') || '0',
    };
  } catch (e) {
    return { action: 'unknown', amount: '0' };
  }
}
