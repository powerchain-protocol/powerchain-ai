export interface ConnectedWallet {
  address: string;
  type: 'solana' | 'sui' | 'mpc';
  label: string;
  isPrimary: boolean;
  balanceSol: number;
  balancePwrc: number;
}

export const USER_WALLETS: ConnectedWallet[] = [
  {
    address: 'PWRC_sol_vault_8f9a2b3c4d5e6f7a',
    type: 'solana',
    label: 'Primary Solana Grid Wallet',
    isPrimary: true,
    balanceSol: 18.42,
    balancePwrc: 42500,
  },
  {
    address: 'mpc_shard_01_node_alpha_key_vault',
    type: 'mpc',
    label: 'MPC Multi-Sig Treasury Shard',
    isPrimary: false,
    balanceSol: 50.0,
    balancePwrc: 150000,
  },
];
