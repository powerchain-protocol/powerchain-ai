export interface LLMRequest {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  model?: string;
  agentId?: string;
}

export function buildPowerAISystemPrompt(agentId = 'analyst'): string {
  let base = `You are PowerChain AI (internal codename Astra), an enterprise grid operations intelligence platform combining capabilities for renewable energy networks, Pyth price oracles, and Solana dePIN tokenized power credit clearing.`;

  if (agentId === 'grid') {
    base += ` Focus strictly on frequency stability, battery storage efficiency (BESS), and power dispatch optimization.`;
  } else if (agentId === 'carbon') {
    base += ` Focus on carbon credit settlements, Scope 1/2/3 ESG verification, and tokenized offset receipts.`;
  } else if (agentId === 'market') {
    base += ` Focus on PPA power purchase agreement arbitrage, Pyth oracle real-time prices, and market clearing strategies.`;
  }

  return base;
}
