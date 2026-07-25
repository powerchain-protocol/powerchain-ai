import { useState } from 'react';
import { AISkill } from '../types/skills';

const initialSkills: AISkill[] = [
  {
    id: 'grid-telemetry',
    name: 'Grid Telemetry & Load Balancing',
    description: 'Real-time monitoring and autonomous load balancing across solar and wind nodes.',
    category: 'Grid',
    version: '2.1.0',
    enabled: true,
  },
  {
    id: 'solana-actions',
    name: 'Solana Actions & Blinks Generator',
    description: 'Generate on-chain Solana action links for energy credit transactions.',
    category: 'Solana',
    version: '1.4.2',
    enabled: true,
  },
  {
    id: 'pyth-oracles',
    name: 'Pyth Energy Price Feed Parser',
    description: 'Parse live Pyth Network price feeds for SOL, PWRC, and kWh energy credits.',
    category: 'Oracle',
    version: '3.0.1',
    enabled: true,
  },
  {
    id: 'gmail-notifications',
    name: 'Gmail Workspace Integration',
    description: 'Send automated energy settlement receipts and critical telemetry alerts via Gmail.',
    category: 'Workspace',
    version: '1.0.0',
    enabled: true,
    requiredScopes: ['https://mail.google.com/'],
  },
];

export function useSkills() {
  const [skills, setSkills] = useState<AISkill[]>(initialSkills);

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return { skills, toggleSkill };
}
