import { SKILLS_LIST, AgentSkill } from './skills';

export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;
  status: 'idle' | 'analyzing' | 'executing';
  skills: string[];
}

export const AGENTS_LIST: AgentDefinition[] = [
  {
    id: 'analyst',
    name: 'Grid Telemetry Analyst',
    role: 'Analyzes energy load profiles, inverter efficiency, and solar yields.',
    systemPrompt: 'You are the PowerChain Grid Analyst.',
    status: 'idle',
    skills: ['skill-telemetry-read', 'skill-bess-dispatch'],
  },
  {
    id: 'treasury-manager',
    name: 'PWRC Treasury & Settlement Agent',
    role: 'Manages PWRC token credits, fee wallet routing, and MPC vault signatures.',
    systemPrompt: 'You are the PowerChain Treasury Agent.',
    status: 'idle',
    skills: ['skill-solana-settle', 'skill-gmail-digest'],
  },
];
