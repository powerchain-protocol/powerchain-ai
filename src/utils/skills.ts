export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  category: 'telemetry' | 'on-chain' | 'workspace' | 'governance';
}

export const SKILLS_LIST: AgentSkill[] = [
  {
    id: 'skill-telemetry-read',
    name: 'Grid Telemetry Integration',
    description: 'Fetch real-time MW output and latency from dePIN nodes.',
    category: 'telemetry',
  },
  {
    id: 'skill-bess-dispatch',
    name: 'BESS Arbitration',
    description: 'Dispatch battery systems during CAISO peak demand.',
    category: 'telemetry',
  },
  {
    id: 'skill-solana-settle',
    name: 'Solana Credit Settlement',
    description: 'Mint and clear tokenized power credits via Solana Pay and Pyth.',
    category: 'on-chain',
  },
  {
    id: 'skill-gmail-digest',
    name: 'Gmail Workspace Integration',
    description: 'Parse incoming emails and auto-generate PDF telemetry digests.',
    category: 'workspace',
  },
];
