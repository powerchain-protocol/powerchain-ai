export const SYSTEM_CONFIG = {
  appName: 'PowerChain AI',
  tagline: 'Tokenized Grid Intelligence & Sovereign AI Infrastructure',
  tokenSymbol: 'PWRC',
  tokenDecimals: 9,
  solanaRpcEndpoint: process.env.VITE_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  heliusApiKey: process.env.VITE_HELIUS_API_KEY || 'pwrc-helius-demo-key',
  pythNetworkCluster: 'mainnet-beta',
  treasuryAddress: 'PWRC111111111111111111111111111111111111111',
  feeWalletAddress: 'FEE111111111111111111111111111111111111111',
  telemetryRefreshMs: 3000,
  webSocketUrl: 'wss://powerchain-ai-ws.internal/telemetry',
};
