export const SOLANA_EXPLORERS = {
  solscan: (signature: string, cluster = 'mainnet-beta') =>
    `https://solscan.io/tx/${signature}?cluster=${cluster}`,
  solanaFM: (signature: string, cluster = 'mainnet-beta') =>
    `https://solana.fm/tx/${signature}?cluster=${cluster}`,
  official: (signature: string, cluster = 'mainnet-beta') =>
    `https://explorer.solana.com/tx/${signature}?cluster=${cluster}`,
};

export function getSolanaExplorerUrl(
  signature: string,
  explorer: 'solscan' | 'solanaFM' | 'official' = 'solscan',
  cluster = 'mainnet-beta'
): string {
  return SOLANA_EXPLORERS[explorer](signature, cluster);
}
