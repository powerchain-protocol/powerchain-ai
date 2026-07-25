export interface AISkill {
  id: string;
  name: string;
  description: string;
  category: 'Grid' | 'Solana' | 'Oracle' | 'AI' | 'Workspace' | 'Security';
  version: string;
  enabled: boolean;
  requiredScopes?: string[];
}
