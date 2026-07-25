export const AI_CONFIG = {
  primaryModel: 'gemini-2.5-flash',
  proModel: 'gemini-2.5-pro',
  fallbackModel: 'gemini-1.5-flash',
  maxOutputTokens: 2048,
  temperature: 0.2,
  loraAdapters: {
    gridOperations: 'powerchain-lora-grid-v2',
    carbonAccounting: 'powerchain-lora-esg-v1',
    treasuryArbitrage: 'powerchain-lora-treasury-v3',
  },
  systemInstructions: `You are PowerChain AI (internal codename Astra), the sovereign intelligence agent for renewable energy grids, Solana dePIN networks, Pyth oracles, and automated energy credit clearing. Provide concise, accurate grid telemetry and tokenized energy insights.`,
};
