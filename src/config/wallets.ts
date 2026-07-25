export interface SolanaWalletConfig {
  id: string;
  name: string;
  icon: string;
  adapter: string;
  isInstalled: boolean;
  installUrl: string;
  recommended: boolean;
  installMessageBadge?: string;
}

export const SOLANA_WALLETS_CONFIG: SolanaWalletConfig[] = [
  {
    id: 'phantom',
    name: 'Phantom',
    icon: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/phantom.svg',
    adapter: 'PhantomWalletAdapter',
    isInstalled: typeof window !== 'undefined' && 'phantom' in window,
    installUrl: 'https://phantom.app/',
    recommended: true,
    installMessageBadge: 'Install Phantom Extension if needed',
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.svg',
    adapter: 'SolflareWalletAdapter',
    isInstalled: typeof window !== 'undefined' && 'solflare' in window,
    installUrl: 'https://solflare.com/',
    recommended: true,
    installMessageBadge: 'Install Solflare Wallet if needed',
  },
  {
    id: 'backpack',
    name: 'Backpack',
    icon: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/backpack.svg',
    adapter: 'BackpackWalletAdapter',
    isInstalled: typeof window !== 'undefined' && 'backpack' in window,
    installUrl: 'https://backpack.app/',
    recommended: false,
    installMessageBadge: 'Install Backpack Extension if needed',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/coinbase.svg',
    adapter: 'CoinbaseWalletAdapter',
    isInstalled: false,
    installUrl: 'https://www.coinbase.com/wallet',
    recommended: false,
    installMessageBadge: 'Install Coinbase Wallet if needed',
  },
  {
    id: 'ledger',
    name: 'Ledger Hardware',
    icon: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/ledger.svg',
    adapter: 'LedgerWalletAdapter',
    isInstalled: true,
    installUrl: 'https://www.ledger.com/',
    recommended: false,
  },
];
