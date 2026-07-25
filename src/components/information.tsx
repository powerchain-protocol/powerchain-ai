import React, { useState } from 'react';
import {
  Info,
  ExternalLink,
  Zap,
  CheckCircle2,
  Cpu,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  ArrowUpRight,
  Server,
  Key
} from 'lucide-react';
import {
  GeminiLogo,
  OpenAILogo,
  AnthropicLogo,
  DeepSeekLogo,
  MetaLlamaLogo,
  XAiGrokLogo,
  PowerChainAILogo,
  AIProviderIcon
} from './ai-provider-logos';
import { Badge } from './Badge';

export interface AIProviderInfo {
  id: string;
  providerName: string;
  providerKey: 'google' | 'openai' | 'anthropic' | 'deepseek' | 'meta' | 'xai' | 'powerchain';
  primaryModel: string;
  badge: string;
  contextWindow: string;
  latencyMs: number;
  status: 'Online' | 'Sub-10ms' | 'Enterprise';
  description: string;
  capabilities: string[];
  isDefault?: boolean;
}

export const AI_PROVIDERS_LIST: AIProviderInfo[] = [
  {
    id: 'google-gemini',
    providerName: 'Google Cloud AI',
    providerKey: 'google',
    primaryModel: 'Gemini 3.5 Flash',
    badge: 'Ultra Fast',
    contextWindow: '2,000,000 Tokens',
    latencyMs: 12.4,
    status: 'Online',
    description: 'Google DeepMind multimodal intelligence with real-time Pyth oracle grounding.',
    capabilities: ['2M Context', 'Multimodal Vision', 'Function Calling', 'Live Streaming'],
    isDefault: true,
  },
  {
    id: 'google-gemini-pro',
    providerName: 'Google Cloud AI',
    providerKey: 'google',
    primaryModel: 'Gemini 3.1 Pro Thinking',
    badge: 'Reasoning',
    contextWindow: '1,000,000 Tokens',
    latencyMs: 18.2,
    status: 'Online',
    description: 'High-reasoning model optimized for complex grid dispatch mathematics.',
    capabilities: ['Complex Logic', 'Deep Code Synthesis', 'System Architecture'],
  },
  {
    id: 'openai-gpt4o',
    providerName: 'OpenAI',
    providerKey: 'openai',
    primaryModel: 'GPT-4o Omnimodal',
    badge: 'Omni',
    contextWindow: '128,000 Tokens',
    latencyMs: 16.8,
    status: 'Online',
    description: 'Versatile multimodal engine for real-time natural language query execution.',
    capabilities: ['JSON Mode', 'Structured Data', 'Multilingual'],
  },
  {
    id: 'anthropic-claude',
    providerName: 'Anthropic',
    providerKey: 'anthropic',
    primaryModel: 'Claude 3.5 Sonnet',
    badge: 'Code Craftsman',
    contextWindow: '200,000 Tokens',
    latencyMs: 21.5,
    status: 'Online',
    description: 'Precision engineering model with high compliance for smart contract auditing.',
    capabilities: ['Anchor Rust Audit', 'Precise Reasoning', 'Refined UX Logic'],
  },
  {
    id: 'deepseek-r1',
    providerName: 'DeepSeek AI',
    providerKey: 'deepseek',
    primaryModel: 'DeepSeek-R1 Chain-of-Thought',
    badge: 'Open Math',
    contextWindow: '64,000 Tokens',
    latencyMs: 14.1,
    status: 'Online',
    description: 'Verifiable step-by-step reasoning for energy credit arbitrage calculations.',
    capabilities: ['CoT Proofs', 'Quantitative Analysis', 'Arbitrage Solvers'],
  },
  {
    id: 'meta-llama',
    providerName: 'Meta AI',
    providerKey: 'meta',
    primaryModel: 'Llama 3.3 70B Instruct',
    badge: 'Sovereign Open',
    contextWindow: '128,000 Tokens',
    latencyMs: 13.8,
    status: 'Online',
    description: 'Privacy-focused open-weight foundation model for air-gapped grid control.',
    capabilities: ['MPC Private', 'Local Execution', 'Self-Hosted'],
  },
  {
    id: 'xai-grok',
    providerName: 'xAI',
    providerKey: 'xai',
    primaryModel: 'Grok 3 Grid Reasoning',
    badge: 'Realtime Web',
    contextWindow: '128,000 Tokens',
    latencyMs: 19.4,
    status: 'Online',
    description: 'Real-time telemetry and macroeconomic energy trend synthesis.',
    capabilities: ['Live Web Search', 'Market Trends', 'Macro Analysis'],
  },
  {
    id: 'powerchain-domain',
    providerName: 'PowerChain Core',
    providerKey: 'powerchain',
    primaryModel: 'PowerChain Sovereign Domain-v2',
    badge: 'MPC Sovereign',
    contextWindow: '256,000 Tokens',
    latencyMs: 8.2,
    status: 'Sub-10ms',
    description: 'Fine-tuned dePIN model directly connected to Solana Anchor programs and Pyth oracles.',
    capabilities: ['Pyth Direct', 'Solana Pay Native', 'Sub-10ms MPC'],
  },
];

interface InformationPanelProps {
  selectedModel?: string;
  onSelectModel?: (modelName: string) => void;
}

export const InformationPanel: React.FC<InformationPanelProps> = ({
  selectedModel = 'Gemini 3.5 Flash',
  onSelectModel,
}) => {
  const [activeTab, setActiveTab] = useState<'providers' | 'specs' | 'workspace'>('providers');

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-lg space-y-5">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                PowerChain Sovereign AI & LLM Providers
              </h3>
              <Badge variant="beta">v1.2.0 Multi-Model</Badge>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-zinc-400">
              Enterprise AI routing engine paired with Pyth Oracle & Solana Web3
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-gray-100 dark:bg-zinc-950 p-1 rounded-xl border border-gray-200 dark:border-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'providers'
                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            AI Providers ({AI_PROVIDERS_LIST.length})
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'specs'
                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            System Specs
          </button>
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'workspace'
                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Gmail Workspace
          </button>
        </div>
      </div>

      {/* Tab 1: AI Providers & Language Models */}
      {activeTab === 'providers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-700 dark:text-zinc-300">Supported Language Models & Brand Integrations</span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" /> Sub-20ms Telemetry Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AI_PROVIDERS_LIST.map((provider) => {
              const isSelected = selectedModel === provider.primaryModel;
              return (
                <div
                  key={provider.id}
                  onClick={() => onSelectModel && onSelectModel(provider.primaryModel)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-emerald-950/20 dark:bg-emerald-950/40 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-gray-50/50 dark:bg-zinc-950/50 border-gray-200 dark:border-zinc-800/80 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                        <AIProviderIcon provider={provider.providerKey} className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-400 transition-colors">
                            {provider.primaryModel}
                          </h4>
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-zinc-400 font-mono">
                          {provider.providerName} • {provider.contextWindow}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {provider.badge}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-600 dark:text-zinc-300 leading-relaxed mb-3">
                    {provider.description}
                  </p>

                  <div className="flex flex-wrap gap-1 border-t border-gray-100 dark:border-zinc-800/80 pt-2">
                    {provider.capabilities.map((cap, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[9.5px] font-mono bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-gray-400 dark:text-zinc-500">
                    <span>Latency: {provider.latencyMs} ms</span>
                    <span className="text-emerald-500 font-semibold">{provider.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: System Specs */}
      {activeTab === 'specs' && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-3 text-zinc-100 font-mono">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-400" />
                PowerChain Sovereign Infrastructure Specs
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="p-2.5 bg-zinc-900/90 rounded-lg border border-zinc-800 space-y-1">
                <p className="text-[10px] text-zinc-400">Solana Network</p>
                <p className="font-bold text-emerald-400">Mainnet-Beta</p>
              </div>
              <div className="p-2.5 bg-zinc-900/90 rounded-lg border border-zinc-800 space-y-1">
                <p className="text-[10px] text-zinc-400">Pyth Oracle Stream</p>
                <p className="font-bold text-emerald-400">Sub-20ms Hermes</p>
              </div>
              <div className="p-2.5 bg-zinc-900/90 rounded-lg border border-zinc-800 space-y-1">
                <p className="text-[10px] text-zinc-400">MPC Key Shards</p>
                <p className="font-bold text-white">3/3 Threshold</p>
              </div>
              <div className="p-2.5 bg-zinc-900/90 rounded-lg border border-zinc-800 space-y-1">
                <p className="text-[10px] text-zinc-400">REST API v1</p>
                <p className="font-bold text-emerald-400">Operational</p>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11px] leading-relaxed space-y-1 text-zinc-300">
              <p className="font-bold text-white font-sans">Anchor Program ID:</p>
              <p className="font-mono text-[10px] text-emerald-400 break-all bg-black/40 p-1.5 rounded border border-zinc-800">
                PWRC111111111111111111111111111111111111111
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Workspace Integration */}
      {activeTab === 'workspace' && (
        <div className="p-4 bg-gradient-to-r from-emerald-950/60 via-zinc-950 to-zinc-950 border border-emerald-500/30 rounded-xl space-y-3 text-zinc-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Google Workspace Gmail OAuth Workflow</h4>
                <p className="text-[10px] text-emerald-300/70 font-mono">Automated Grid Settlement Receipts & PDF Digests</p>
              </div>
            </div>
            <Badge variant="emerald">OAuth Connected</Badge>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            PowerChain AI monitors incoming grid telemetry emails, parses energy generation receipts using Gemini LLM, and creates draft responses or PDF digests.
          </p>

          <a
            href="https://workspace.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
          >
            <span>Learn about Google Workspace OAuth Integration</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
