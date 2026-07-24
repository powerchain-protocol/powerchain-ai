import React, { useState, useRef, useEffect } from 'react';
import { X, Settings, Sliders, Database, ShieldCheck, Layers, CreditCard, MessageSquare, HelpCircle, Key, RefreshCw, Sparkles, Check, Zap, User, FileText, Upload } from 'lucide-react';
import { ChatSettings, UserProfile } from '../types';
import { Coin } from './coin';
import { Avatar } from './avatar';
import { auditLogger, AuditEvent } from '../utils/audit-logger';

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
  onRefillPwrc = (amount: number) => {},
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [useOwnKeys, setUseOwnKeys] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [ollamaHost, setOllamaHost] = useState('http://localhost:11434');
  const [refilledSuccess, setRefilledSuccess] = useState(false);
  
  const [localAvatar, setLocalAvatar] = useState<string | null>(user.avatarUrl || null);
  const [logs, setLogs] = useState<AuditEvent[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'audit') {
      setLogs(auditLogger.getLogs());
    }
  }, [activeTab]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setLocalAvatar(url);
      auditLogger.log({
        action: 'Update Avatar',
        category: 'security',
        details: 'User updated their profile avatar image.',
        status: 'success'
      });
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'model', name: 'Model & LLM', icon: Settings },
    { id: 'api_keys', name: 'Bring Your Own AI Keys', icon: Key },
    { id: 'billing', name: 'PWRC Token Credits', icon: Zap },
    { id: 'preferences', name: 'Preferences', icon: Sliders },
    { id: 'security', name: 'Security & MPC', icon: ShieldCheck },
    { id: 'integrations', name: 'Grid & Solana/Sui RPCs', icon: Layers },
    { id: 'data', name: 'Data & Memory', icon: Database },
    { id: 'profile', name: 'Profile & Account', icon: User },
    { id: 'audit', name: 'Audit Logs', icon: FileText },
    { id: 'help', name: 'Help & Docs', icon: HelpCircle },
  ];

  const handleRefill = (amount: number) => {
    onRefillPwrc(amount);
    setRefilledSuccess(true);
    auditLogger.log({
      action: 'Refill PWRC Tokens',
      category: 'transaction',
      details: `Added ${amount} PWRC tokens to wallet balance`,
      status: 'success'
    });
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
                  <p className="text-[11px] text-gray-400 dark:text-zinc-400 mb-3">
                    Select the default model for generating energy forecasts and code logic.
                  </p>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'gpt4o', name: 'GPT-4o Omnimodal', desc: 'OpenAI (High Intelligence)', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
                      { id: 'gemini-pro', name: 'Gemini 1.5 Pro', desc: 'Google 1M Context (Complex Reasoning)', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
                      { id: 'gemini-flash', name: 'Gemini 1.5 Flash', desc: 'Google (Ultra Speed)', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
                      { id: 'claude-sonnet', name: 'Claude 3.5 Sonnet', desc: 'Anthropic Logic', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg' },
                      { id: 'domain-v2', name: 'PowerChain Domain-v2', desc: 'Specialized (MPC Private)', icon: null },
                    ].map(m => (
                      <div 
                        key={m.id}
                        onClick={() => onUpdateSettings({ model: m.name })}
                        className={`p-3 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${settings.model === m.name ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-zinc-800'}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                          {m.icon ? <img src={m.icon} alt={m.name} className="w-full h-full object-contain" /> : <Zap className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-900 dark:text-zinc-100">{m.name}</p>
                          <p className="text-[10px] text-gray-500 dark:text-zinc-400">{m.desc}</p>
                        </div>
                        {settings.model === m.name && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">2 PWRC</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>24h Solar & Wind Predictive Forecast</span>
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">5 PWRC</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center">
                    <span>Executive Summary Telemetry Report</span>
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">10 PWRC</span>
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
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="font-bold text-gray-900 dark:text-zinc-100">Custom RPCs & APIs</p>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300">Solana RPC URL</label>
                    <input type="text" placeholder="https://api.mainnet-beta.solana.com" className="w-full p-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-emerald-500 transition-colors shadow-2xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300">Sui RPC URL</label>
                    <input type="text" placeholder="https://fullnode.mainnet.sui.io:443" className="w-full p-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-emerald-500 transition-colors shadow-2xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300">Solana Program ID</label>
                    <input type="text" placeholder="PWRC..." className="w-full p-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-emerald-500 font-mono transition-colors shadow-2xs" />
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm">Save Endpoints</button>
                </div>
                <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-zinc-800">
                  <p className="font-bold text-gray-900 dark:text-zinc-100">Connected Solana & Sui Grid Network RPCs</p>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center shadow-2xs">
                    <span className="text-sm">Solana High-Speed DAS (Helius RPC)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">18ms Latency</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center shadow-2xs">
                    <span className="text-sm">Pyth Energy Price Feed Oracle</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">Active (KWH/MWH)</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center shadow-2xs">
                    <span className="text-sm">Sui Network Cetus Carbon Subnet</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">Connected</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar name={user.name} imageUrl={localAvatar} size="xl" className="shadow-lg border-2 border-emerald-500/20" />
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-zinc-100">{user.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-zinc-400">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleAvatarUpload} 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-xs font-semibold text-gray-700 dark:text-zinc-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Update Avatar
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-gray-900 dark:text-zinc-100">Account Security</p>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors flex justify-between items-center">
                    <span>Change Password</span>
                    <span className="text-[10px] text-gray-400">Last changed 3 months ago</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors flex justify-between items-center">
                    <span>Two-Factor Authentication</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Enabled</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 dark:text-zinc-100">System Audit Logs</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Immutable ledger of sensitive operations and transactions.</p>
                  </div>
                  <button onClick={() => { auditLogger.clearLogs(); setLogs([]); }} className="text-xs font-medium text-red-500 hover:text-red-400 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/10 transition-colors">
                    Clear Logs
                  </button>
                </div>
                {logs.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 dark:text-zinc-500 border border-dashed border-gray-200 dark:border-zinc-700 rounded-xl">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">No Audit Logs Found</p>
                    <p className="text-xs mt-1">Actions and transactions will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {logs.map((log) => (
                      <div key={log.id} className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-lg flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-[10px] font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300">
                              {log.category}
                            </span>
                            <span className="font-bold text-sm text-gray-900 dark:text-zinc-100">{log.action}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-zinc-400">{log.details}</p>
                        <div className="flex justify-end">
                          <span className={`text-[10px] font-bold uppercase ${log.status === 'success' ? 'text-emerald-500' : log.status === 'failure' ? 'text-red-500' : 'text-amber-500'}`}>
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <div className="p-4 text-center text-gray-400 dark:text-zinc-500">
                  <p className="font-semibold text-gray-700 dark:text-zinc-300">No additional preferences at this time.</p>
                </div>
              </div>
            )}
            {(activeTab === 'data' || activeTab === 'help') && (
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

