export const SYSTEM_CONSTANTS = {
  APP_NAME: 'PowerChain Grid AI',
  VERSION: '1.2.0-powerchain',
  SUPPORTED_MODELS: [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-1.5-flash',
    'powerchain-lora-grid-v2',
    'powerchain-lora-esg-v1',
  ],
  DEFAULT_RPC_URLS: {
    SOLANA: 'https://api.mainnet-beta.solana.com',
    SUI: 'https://fullnode.mainnet.sui.io:443',
  },
  PYTH_FEEDS: {
    SOL_USD: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    PWRC_USD: '0xe62ddf552b72b320d7d28701a89c440a340c30985c8e31a19f20e4b50a25f778',
  },
  MINT_ADDRESSES: {
    PWRC: 'PWRC111111111111111111111111111111111111111',
  },
  FEE_RATE: 0.03,
};
