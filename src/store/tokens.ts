// PowerChain PWRC Token Store & Ledger
export interface TokenTransaction {
  id: string;
  type: 'mint' | 'burn' | 'transfer' | 'topup';
  amountPWRC: number;
  reason: string;
  timestamp: string;
  txHash: string;
}

export const INITIAL_TOKEN_TRANSACTIONS: TokenTransaction[] = [
  {
    id: 'tx-001',
    type: 'topup',
    amountPWRC: 2500,
    reason: 'Initial Enterprise Account Allocation',
    timestamp: new Date().toLocaleTimeString(),
    txHash: '0xpwrc_init_2500_genesis',
  },
  {
    id: 'tx-002',
    type: 'burn',
    amountPWRC: 10,
    reason: 'SCADA Telemetry AI Inference Query',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
    txHash: '0xpwrc_burn_001_inference',
  },
];

export function getStoredTokenTransactions(): TokenTransaction[] {
  try {
    const saved = localStorage.getItem('powerchain_token_txs');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load token transactions', e);
  }
  return INITIAL_TOKEN_TRANSACTIONS;
}

export function saveTokenTransaction(tx: TokenTransaction) {
  try {
    const txs = getStoredTokenTransactions();
    txs.unshift(tx);
    localStorage.setItem('powerchain_token_txs', JSON.stringify(txs.slice(0, 50)));
  } catch (e) {
    console.error('Failed to save token transaction', e);
  }
}
