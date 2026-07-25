import { SavedPrompt } from '../types/prompts';

export const SYSTEM_PROMPT_LIBRARY: SavedPrompt[] = [
  {
    id: 'p-01',
    title: 'BESS Battery Discharge Strategy',
    category: 'bess',
    promptText: 'Analyze Silicon Valley BESS-04 state-of-charge curves and recommend an optimal 4-hour peak arbitrage dispatch schedule for CAISO.',
    tags: ['BESS', 'Arbitrage', 'CAISO'],
    usageCount: 142,
    isFavorite: true,
  },
  {
    id: 'p-02',
    title: 'Scope 1-3 Carbon Offset Audit',
    category: 'carbon',
    promptText: 'Generate a verified GHG Protocol corporate carbon audit report based on today\'s 420.5 MWh renewable energy output.',
    tags: ['ESG', 'GHG Protocol', 'Carbon'],
    usageCount: 98,
    isFavorite: true,
  },
  {
    id: 'p-03',
    title: 'Pyth Oracle Price Arbitrage Check',
    category: 'oracle',
    promptText: 'Cross-reference Pyth SOL/USD and PWRC/USD oracle prices against grid power clearing rates to identify treasury arbitrage margins.',
    tags: ['Pyth', 'Oracle', 'Solana'],
    usageCount: 210,
    isFavorite: false,
  },
  {
    id: 'p-04',
    title: 'Substation Frequency Regulation Report',
    category: 'grid',
    promptText: 'Evaluate Tehachapi Pass Wind Farm grid frequency variance at 60.00 Hz and check for sub-20ms telemetry latency spikes.',
    tags: ['Frequency', 'Grid', 'Telemetry'],
    usageCount: 76,
    isFavorite: false,
  },
];
