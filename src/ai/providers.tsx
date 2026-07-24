import React from 'react';

export interface ModelProvider {
  id: string;
  name: string;
  vendor: 'Google' | 'Anthropic' | 'OpenAI' | 'Meta' | 'DeepSeek' | 'Ollama Local' | 'LoRA Fine-Tune';
  type: 'cloud' | 'local' | 'finetuned' | 'mpc-confidential';
  badge: string;
  description: string;
  latency: string;
  contextWindow: string;
  isPopular?: boolean;
}

export const AI_PROVIDERS: ModelProvider[] = [
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro (Google)',
    vendor: 'Google',
    type: 'cloud',
    badge: 'Enterprise 1M Context',
    description: 'Multimodal operations model fine-tuned for smart grid telemetry and PPA analysis.',
    latency: '320ms',
    contextWindow: '1,000,000 tokens',
    isPopular: true,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash (Google)',
    vendor: 'Google',
    type: 'cloud',
    badge: 'Ultra Fast',
    description: 'High-speed sub-100ms reasoning for real-time SCADA battery frequency regulation.',
    latency: '85ms',
    contextWindow: '1,000,000 tokens',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet (Anthropic)',
    vendor: 'Anthropic',
    type: 'cloud',
    badge: 'Precision Logic',
    description: 'Superior code and complex legal compliance parser for energy contracts.',
    latency: '410ms',
    contextWindow: '200,000 tokens',
    isPopular: true,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Omnimodal (OpenAI)',
    vendor: 'OpenAI',
    type: 'cloud',
    badge: 'Omni Reasoning',
    description: 'Advanced vision and structured JSON outputs for carbon credit auditing.',
    latency: '290ms',
    contextWindow: '128,000 tokens',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 (Open Reasoning)',
    vendor: 'DeepSeek',
    type: 'cloud',
    badge: 'Deep Math',
    description: 'Specialized chain-of-thought mathematical proofing for financial settlement.',
    latency: '520ms',
    contextWindow: '64,000 tokens',
  },
  {
    id: 'ollama-llama3',
    name: 'Ollama Local Llama-3.3 70B',
    vendor: 'Ollama Local',
    type: 'local',
    badge: '100% Air-Gapped Local',
    description: 'Zero data leakage offline model running directly on local grid sub-station edge node.',
    latency: '110ms (Local GPU)',
    contextWindow: '128,000 tokens',
  },
  {
    id: 'lora-powerchain-v1',
    name: 'PowerChain LoRA Fine-Tune v1.4',
    vendor: 'LoRA Fine-Tune',
    type: 'finetuned',
    badge: 'MPC Private LoRA',
    description: 'Custom Low-Rank Adaptation trained on 2M renewable power plant telemetry logs.',
    latency: '150ms',
    contextWindow: '32,000 tokens',
    isPopular: true,
  },
];

export function getProviderLogoUrl(vendor: ModelProvider['vendor']): string {
  switch (vendor) {
    case 'Google':
      return 'https://www.google.com/favicon.ico';
    case 'Anthropic':
      return 'https://anthropic.com/favicon.ico';
    case 'OpenAI':
      return 'https://openai.com/favicon.ico';
    case 'Meta':
      return 'https://about.meta.com/favicon.ico';
    case 'Ollama Local':
      return 'https://ollama.com/public/ollama.png';
    default:
      return 'https://google.com/favicon.ico';
  }
}
