export const TOKEN_CONFIG = {
  pwrc: {
    symbol: 'PWRC',
    name: 'PowerChain Grid Credit Token',
    decimals: 9,
    mintAddress: 'PWRC111111111111111111111111111111111111111',
    coingeckoId: 'powerchain-ai',
  },
  pythFeeds: {
    'SOL/USD': '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    'PWRC/USD': '0xe62ddf552b72b320d7d28701a89c440a340c30985c8e31a19f20e4b50a25f778',
    'ENERGY_MWH/USD': '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  creditRates: {
    mwhToPwrcRatio: 100, // 1 MWh clean generation = 100 PWRC credits
    pwrcToUsdBase: 0.25, // $0.25 per PWRC credit
  },
};
