export interface PowerChainUserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Grid Operator' | 'Vault Admin' | 'DePIN Node Owner' | 'Developer';
  permissions: string[];
  avatarUrl: string;
  walletAddress: string;
  pwrcBalance: number;
  nodeSubscriptions: string[];
  isDemoAccount?: boolean;
}

export const DEMO_USERS: PowerChainUserProfile[] = [
  {
    id: 'user-op-01',
    name: 'Sovereign Operator',
    email: 'powerchain.network@gmail.com',
    role: 'Grid Operator',
    permissions: [
      'telemetry.read',
      'telemetry.control',
      'bess.dispatch',
      'pwrc.mint',
      'workspace.gmail.digest',
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    walletAddress: 'PWRC111111111111111111111111111111111111111',
    pwrcBalance: 42500,
    nodeSubscriptions: ['node-mojave-pv-01', 'node-bess-silicon-04'],
    isDemoAccount: true,
  },
  {
    id: 'user-admin-02',
    name: 'Solana Treasury Vault Admin',
    email: 'treasury@powerchain.network',
    role: 'Vault Admin',
    permissions: [
      'treasury.manage',
      'pwrc.mint',
      'pwrc.burn',
      'roles.manage',
      'logs.clear',
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    walletAddress: 'VAULT99999999999999999999999999999999999999',
    pwrcBalance: 1250000,
    nodeSubscriptions: ['node-tehachapi-wind-02'],
    isDemoAccount: true,
  },
  {
    id: 'user-dev-03',
    name: 'DePIN Protocol Architect',
    email: 'dev@powerchain.network',
    role: 'Developer',
    permissions: [
      'telemetry.read',
      'api.keys.manage',
      'logs.read',
      'rpc.manage',
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    walletAddress: 'DEV333333333333333333333333333333333333333',
    pwrcBalance: 18200,
    nodeSubscriptions: [],
    isDemoAccount: true,
  },
];
