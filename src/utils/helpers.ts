export function formatPowerMW(mw: number): string {
  if (mw >= 1000) {
    return `${(mw / 1000).toFixed(2)} GW`;
  }
  return `${mw.toFixed(1)} MW`;
}

export function formatEnergyMWh(mwh: number): string {
  if (mwh >= 1000) {
    return `${(mwh / 1000).toFixed(2)} GWh`;
  }
  return `${mwh.toFixed(1)} MWh`;
}

export function formatLatencyMs(ms: number): string {
  return `${ms.toFixed(1)} ms`;
}

export function formatCurrencyUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPWRC(amount: number): string {
  return `${amount.toLocaleString('en-US')} PWRC`;
}

export function truncateAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
