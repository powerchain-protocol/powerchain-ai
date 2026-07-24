export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Enterprise Admin' | 'Grid Engineer' | 'Risk Auditor' | 'Viewer';
  organization: string;
  pwrcBalance: number; // PowerChain Token Balance
  useOwnApiKey: boolean;
  openaiKey?: string;
  anthropicKey?: string;
  geminiKey?: string;
  ollamaHost?: string;
  mpcWalletAddress: string;
}

const DEFAULT_USER: UserAccount = {
  id: 'usr-001',
  name: 'John Doe',
  email: 'john.doe@powerchain.ai',
  role: 'Enterprise Admin',
  organization: 'PowerChain Gridnet Corp',
  pwrcBalance: 2500, // Initial 2,500 PWRC credits
  useOwnApiKey: false,
  mpcWalletAddress: '0x71C94f82aB12093418e21950',
};

export function useUsers() {
  const getStoredUser = (): UserAccount => {
    try {
      const saved = localStorage.getItem('powerchain_user_account');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user account:', e);
    }
    return DEFAULT_USER;
  };

  const saveUser = (user: UserAccount) => {
    try {
      localStorage.setItem('powerchain_user_account', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user account:', e);
    }
  };

  return {
    getStoredUser,
    saveUser,
    defaultUser: DEFAULT_USER,
  };
}
