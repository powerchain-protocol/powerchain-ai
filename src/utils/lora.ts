export interface LoRAConfig {
  adapterName: string;
  rank: number;
  alpha: number;
  targetModules: string[];
  description: string;
}

export const POWERCHAIN_LORA_ADAPTERS: Record<string, LoRAConfig> = {
  'powerchain-lora-grid-v2': {
    adapterName: 'PowerChain Grid Operations V2',
    rank: 16,
    alpha: 32,
    targetModules: ['q_proj', 'v_proj', 'k_proj', 'o_proj'],
    description: 'Fine-tuned on 45,000 CAISO & ERCOT grid telemetry events and frequency regulation curves.',
  },
  'powerchain-lora-esg-v1': {
    adapterName: 'PowerChain Carbon & ESG Auditor V1',
    rank: 16,
    alpha: 32,
    targetModules: ['q_proj', 'v_proj'],
    description: 'Trained on GHG protocol specifications and tokenized carbon certificate clearing.',
  },
  'powerchain-lora-treasury-v3': {
    adapterName: 'PowerChain Treasury & Oracle Arbitrage V3',
    rank: 32,
    alpha: 64,
    targetModules: ['q_proj', 'v_proj', 'gate_proj', 'up_proj'],
    description: 'Optimized for Pyth oracle price routing, Solana Pay settlements, and automated treasury yield.',
  },
};
