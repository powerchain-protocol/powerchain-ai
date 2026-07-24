import React, { useState } from 'react';
import { X, Settings, Sliders, Database, ShieldCheck, Layers, CreditCard, MessageSquare, HelpCircle, Key, RefreshCw, Sparkles, Check, Zap } from 'lucide-react';
import { ChatSettings, UserProfile } from '../types';
import { Coin } from './coin';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
  settings: ChatSettings;
  onUpdateSettings: (updated: Partial<ChatSettings>) => void;
  user: UserProfile;
  pwrcBalance?: number;
  onRefillPwrc?: (amount: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'model',
  settings,
  onUpdateSettings,
  user,
  pwrcBalance = 2500,
  onRefillPwrc = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [useOwnKeys, setUseOwnKeys] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [ollamaHost, setOllamaHost] = useState('http://localhost:11434');
  const [refilledSuccess, setRefilledSuccess] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'model', name: 'Model & LLM', icon: Settings },
    { id: 'api_keys', name: 'Bring Your Own AI Keys', icon: Key },
    { id: 'billing', name: 'PWRC Token Credits', icon: CreditCard },
    { id: 'preferences', name: 'Preferences', icon: Sliders },
    { id: 'security', name: 'Security & MPC', icon: ShieldCheck },
    { id: 'integrations', name: 'Grid & Solana/Sui RPCs', icon: Layers },
    { id: 'data', name: 'Data & Memory', icon: Database },
    { id: 'help', name: 'Help & Docs', icon: HelpCircle },
  ];

  const handleRefill = (amount: number) => {
    onRefillPwrc(amount);
    setRefilledSuccess(true);
    setTimeout(() => setRefilledSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[580px] max-h-[90vh]">
        {/* Modal Sidebar Tabs */}
        <div className="w-full md:w-56 bg-gray-50 dark:bg-zinc-950/60 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
          <div className="px-2 py-1 text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest hidden md:block">
            Settings Menu
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`modal-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-900 text-white dark:bg-emerald-800 dark:text-white shadow-xs'
                    : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-200/60 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-900">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between shrink-0">
            <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">
              {tabs.find((t) => t.id === activeTab)?.name || 'Settings'}
            </h3>
            <button
              id="close-settings-modal-btn"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar text-xs text-gray-700 dark:text-zinc-300 space-y-6">
            {activeTab === 'model' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-gray-900 dark:text-zinc-100 mb-1">
                    Primary Engine Model
                  </label>
                  <p className="text-[11px] text-gray-400 dark:text-zinc-400 mb-2">
                    Select the default model for generating energy forecasts and code logic.
                  </p>
                  <select
                    value={settings.model}
                    onChange={(e) => onUpdateSettings({ model: e.target.value })}
                    className="w-full max-w-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-2 font-medium text-gray-900 dark:text-zinc-100"
                  >
                    <option value="Gemini 1.5 Pro">Gemini 1.5 Pro (Google 1M Context)</option>
                    <option value="Gemini 1.5 Flash">Gemini 1.5 Flash (Ultra Speed)</option>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Anthropic Logic)</option>
                    <option value="GPT-4o Omnimodal">GPT-4o Omnimodal (OpenAI)</option>
                    <option value="Ollama Local Llama-3.3 70B">Ollama Local Llama-3.3 70B (Offline Edge)</option>
                    <option value="PowerChain LoRA Fine-Tune v1.4">PowerChain LoRA Fine-Tune v1.4 (MPC Private)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <label className="block font-bold text-gray-900 dark:text-zinc-100 mb-1">
                    Model Temperature ({settings.temperature})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.temperature}
                    onChange={(e) => onUpdateSettings({ temperature: parseFloat(e.target.value) })}
                    className="w-full max-w-sm accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'api_keys' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-950/10 dark:bg-emerald-950/30 border border-emerald-800/30 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-emerald-800 dark:text-emerald-400">Bring Your Own API Keys (BYOAI)</p>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400">Bypass PWRC token deduction by providing your direct provider API credentials.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={useOwnKeys}
                    onChange={(e) => setUseOwnKeys(e.target.checked)}
                    className="w-4 h-4 accent-emerald-600 cursor-pointer"
                  />
                </div>

                {useOwnKeys && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block font-semibold mb-1 text-gray-900 dark:text-zinc-100">Google Gemini API Key</label>
                      <input
                        type="password"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-gray-900 dark:text-zinc-100">OpenAI API Key</label>
                      <input
                        type="password"
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                        placeholder="sk-proj-..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-gray-900 dark:text-zinc-100">Anthropic Claude API Key</label>
                      <input
                        type="password"
                        value={anthropicKey}
                        onChange={(e) => setAnthropicKey(e.target.value)}
                        placeholder="sk-ant-..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-gray-900 dark:text-zinc-100">Ollama Local Instance Host</label>
                      <input
                        type="text"
                        value={ollamaHost}
                        onChange={(e) => setOllamaHost(e.target.value)}
                        placeholder="http://localhost:11434"
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/20 via-zinc-900 to-zinc-950 border border-emerald-800/40 text-zinc-100 flex items-center justify-between shadow-xs">
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">PowerChain Token Balance</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Coin size="lg" />
                      <span className="text-2xl font-black text-white">{pwrcBalance.toLocaleString()}</span>
                      <span className="text-xs font-bold text-emerald-400">PWRC</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRefill(1000)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    {refilledSuccess ? <Check className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    <span>{refilledSuccess ? 'Added +1,000 PWRC' : 'Top-Up +1,000 PWRC'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-gray-900 dark:text-zinc-100">PWRC Token Consumption Rates</p>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>Standard AI Chat Query</span>
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">10 PWRC</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>24h Solar & Wind Predictive Forecast</span>
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">15 PWRC</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>Executive Summary Telemetry Report</span>
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">25 PWRC</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-zinc-100 text-sm mb-1">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Multi-Party Computation (MPC) Active</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-zinc-400 leading-relaxed">
                    Private keys for smart contract settlements and carbon credit issuance are distributed across MPC nodes. No single entity holds complete signing authority.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-gray-900 dark:text-zinc-100">Key Quorum Status</p>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>Node 1 (EU-West Grid)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">ONLINE ✓</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>Node 2 (US-East Solar)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">ONLINE ✓</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>Node 3 (Enterprise Vault)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">ONLINE ✓</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-3">
                <p className="font-bold text-gray-900 dark:text-zinc-100">Connected Solana & Sui Grid Network RPCs</p>
                <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                  <span>Solana High-Speed DAS (Helius RPC)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">18ms Latency</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                  <span>Pyth Energy Price Feed Oracle</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">Active (KWH/MWH)</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                  <span>Sui Network Cetus Carbon Subnet</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">Connected</span>
                </div>
              </div>
            )}

            {(activeTab === 'preferences' || activeTab === 'data' || activeTab === 'help') && (
              <div className="p-4 text-center text-gray-400 dark:text-zinc-500">
                <p className="font-semibold text-gray-700 dark:text-zinc-300">PowerChain Enterprise Settings</p>
                <p className="text-xs mt-1">Configured for user {user.email}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-2 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-emerald-900 text-white dark:bg-emerald-800 dark:text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

