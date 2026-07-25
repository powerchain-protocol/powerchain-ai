import React, { useState, useRef, useEffect } from 'react';
import { X, Settings, Sliders, Database, ShieldCheck, Layers, CreditCard, MessageSquare, HelpCircle, Key, RefreshCw, Sparkles, Check, Zap, User, FileText, Upload, Mail, Search, Trash2, Activity } from 'lucide-react';
import { ChatSettings, UserProfile } from '../types';
import { Coin } from './coin';
import { Avatar } from './avatar';
import { auditLogger, AuditEvent } from '../utils/audit-logger';
import { initAuth, googleSignIn, logoutGmail, fetchEnergyEmails, createGmailDraft } from '../services/gmail';
import { AIProviderIcon } from './ai-provider-logos';
import { RpcService, RpcEndpointConfig } from '../services/rpc';
import { logsService, SystemLogEntry } from '../services/logs';
import { DEMO_USERS, PowerChainUserProfile } from '../data/users';
import { UserRolesService } from '../services/roles';

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
  const [deepseekKey, setDeepseekKey] = useState('');
  const [xaiKey, setXaiKey] = useState('');
  const [ollamaHost, setOllamaHost] = useState('http://localhost:11434');
  const [searchIconVisible, setSearchIconVisible] = useState(true);
  const [searchShortcutEnabled, setSearchShortcutEnabled] = useState(true);
  const [searchDefaultScope, setSearchDefaultScope] = useState<'all' | 'nodes' | 'prompts' | 'models'>('all');
  const [refilledSuccess, setRefilledSuccess] = useState(false);
  
  const [rpcEndpoints, setRpcEndpoints] = useState<RpcEndpointConfig[]>(RpcService.getEndpoints());
  const [systemLogs, setSystemLogs] = useState<SystemLogEntry[]>(logsService.getLogs());
  const [activeDemoUser, setActiveDemoUser] = useState<PowerChainUserProfile>(UserRolesService.getCurrentUser());

  const [localAvatar, setLocalAvatar] = useState<string | null>(user.avatarUrl || null);
  const [logs, setLogs] = useState<AuditEvent[]>([]);
  const [gmailUser, setGmailUser] = useState<any>(null);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailLoading, setGmailLoading] = useState(false);
  const [fetchedEmails, setFetchedEmails] = useState<any[]>([]);
  const [gmailStatusMsg, setGmailStatusMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initAuth(
      (u) => {
        setGmailUser(u);
        setGmailConnected(true);
      },
      () => {
        setGmailConnected(false);
      }
    );
  }, []);

  useEffect(() => {
    if (activeTab === 'audit') {
      setLogs(auditLogger.getLogs());
      setSystemLogs(logsService.getLogs());
    }
  }, [activeTab]);

  useEffect(() => {
    const unsubLogs = logsService.subscribe(() => {
      setSystemLogs([...logsService.getLogs()]);
    });
    const unsubRoles = UserRolesService.subscribe(() => {
      setActiveDemoUser({ ...UserRolesService.getCurrentUser() });
    });
    return () => {
      unsubLogs();
      unsubRoles();
    };
  }, []);

  const handleGmailSignIn = async () => {
    setGmailLoading(true);
    setGmailStatusMsg('');
    try {
      const res = await googleSignIn();
      if (res) {
        setGmailUser(res.user);
        setGmailConnected(true);
        setGmailStatusMsg('Successfully connected to Gmail via OAuth2.');
        auditLogger.log({
          action: 'Gmail OAuth2 Connected',
          category: 'security',
          details: `Connected Gmail account ${res.user.email}`,
          status: 'success',
        });
      }
    } catch (err: any) {
      setGmailStatusMsg(`Gmail Connection Error: ${err.message || err}`);
    } finally {
      setGmailLoading(false);
    }
  };

  const handleGmailLogout = async () => {
    await logoutGmail();
    setGmailConnected(false);
    setGmailUser(null);
    setFetchedEmails([]);
    setGmailStatusMsg('Signed out of Gmail.');
  };

  const handleFetchEnergyEmails = async () => {
    setGmailLoading(true);
    try {
      const emails = await fetchEnergyEmails('energy OR grid OR telemetry OR settlement OR power');
      setFetchedEmails(emails);
      setGmailStatusMsg(`Fetched ${emails.length} energy-related emails.`);
    } catch (err: any) {
      setGmailStatusMsg(`Error fetching emails: ${err.message || err}`);
    } finally {
      setGmailLoading(false);
    }
  };

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
    { id: 'search', name: 'Search & Shortcuts', icon: Search },
    { id: 'billing', name: 'PWRC Token Credits', icon: Zap },
    { id: 'preferences', name: 'Preferences', icon: Sliders },
    { id: 'security', name: 'Security & MPC', icon: ShieldCheck },
    { id: 'integrations', name: 'Grid & Solana/Sui RPCs', icon: Layers },
    { id: 'gmail', name: 'Gmail Workspace', icon: Mail },
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
                      { id: 'gemini-flash', name: 'Gemini 3.5 Flash', desc: 'Google 2M Context • Sub-15ms Latency (Default)', provider: 'google' as const },
                      { id: 'gemini-pro', name: 'Gemini 3.1 Pro Thinking', desc: 'Google High Reasoning & Deep Synthesis', provider: 'google' as const },
                      { id: 'gpt4o', name: 'GPT-4o Omnimodal', desc: 'OpenAI Omnimodal Intelligence', provider: 'openai' as const },
                      { id: 'claude-sonnet', name: 'Claude 3.5 Sonnet', desc: 'Anthropic Precision Code & Contract Logic', provider: 'anthropic' as const },
                      { id: 'deepseek-r1', name: 'DeepSeek-R1 CoT', desc: 'DeepSeek Step-by-Step Mathematical Solver', provider: 'deepseek' as const },
                      { id: 'llama33', name: 'Llama 3.3 70B', desc: 'Meta Open-Weight MPC Private Model', provider: 'meta' as const },
                      { id: 'grok3', name: 'Grok 3 Reasoning', desc: 'xAI Real-Time Telemetry & Macro Trends', provider: 'xai' as const },
                      { id: 'domain-v2', name: 'PowerChain Domain-v2', desc: 'PowerChain DePIN Native Grid Engine', provider: 'powerchain' as const },
                    ].map(m => (
                      <div 
                        key={m.id}
                        onClick={() => onUpdateSettings({ model: m.name })}
                        className={`p-3 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${settings.model === m.name ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-zinc-800'}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center p-1.5 shrink-0 overflow-hidden border border-gray-200 dark:border-zinc-800">
                          <AIProviderIcon provider={m.provider} className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-xs text-gray-900 dark:text-zinc-100">{m.name}</p>
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
                      <label className="flex items-center gap-2 font-semibold mb-1 text-gray-900 dark:text-zinc-100">
                        <AIProviderIcon provider="google" className="w-4 h-4" />
                        <span>Google Gemini API Key</span>
                      </label>
                      <input
                        type="password"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-semibold mb-1 text-gray-900 dark:text-zinc-100">
                        <AIProviderIcon provider="openai" className="w-4 h-4 text-emerald-500" />
                        <span>OpenAI API Key</span>
                      </label>
                      <input
                        type="password"
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                        placeholder="sk-proj-..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-semibold mb-1 text-gray-900 dark:text-zinc-100">
                        <AIProviderIcon provider="anthropic" className="w-4 h-4 text-amber-500" />
                        <span>Anthropic Claude API Key</span>
                      </label>
                      <input
                        type="password"
                        value={anthropicKey}
                        onChange={(e) => setAnthropicKey(e.target.value)}
                        placeholder="sk-ant-..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-semibold mb-1 text-gray-900 dark:text-zinc-100">
                        <AIProviderIcon provider="deepseek" className="w-4 h-4" />
                        <span>DeepSeek API Key</span>
                      </label>
                      <input
                        type="password"
                        value={deepseekKey}
                        onChange={(e) => setDeepseekKey(e.target.value)}
                        placeholder="sk-ds-..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-semibold mb-1 text-gray-900 dark:text-zinc-100">
                        <AIProviderIcon provider="xai" className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                        <span>xAI Grok API Key</span>
                      </label>
                      <input
                        type="password"
                        value={xaiKey}
                        onChange={(e) => setXaiKey(e.target.value)}
                        placeholder="xai-..."
                        className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-semibold mb-1 text-gray-900 dark:text-zinc-100">
                        <AIProviderIcon provider="meta" className="w-4 h-4 text-blue-500" />
                        <span>Ollama Local Instance Host</span>
                      </label>
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

            {activeTab === 'search' && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-xl space-y-1">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-500" />
                    <span>Global Search Bar & Shortcut Settings</span>
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Configure search icon visibility, default search filters, and keyboard shortcut settings for instant dePIN telemetry queries.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-gray-900 dark:text-white">Show Global Search Input in Header</p>
                      <p className="text-[10px] text-gray-500 dark:text-zinc-400">Displays real-time search icon and input bar on top header</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={searchIconVisible}
                      onChange={(e) => setSearchIconVisible(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-gray-900 dark:text-white">Enable ⌘K / Ctrl+K Keyboard Shortcut</p>
                      <p className="text-[10px] text-gray-500 dark:text-zinc-400">Focus search bar immediately from anywhere in the OS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={searchShortcutEnabled}
                      onChange={(e) => setSearchShortcutEnabled(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xl space-y-2">
                    <p className="font-bold text-xs text-gray-900 dark:text-white">Default Search Query Filter Scope</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'all', name: 'All Resources (Nodes + Prompts + Models)' },
                        { id: 'nodes', name: 'DePIN Telemetry Nodes Only' },
                        { id: 'prompts', name: 'AI Prompts & Workflows Only' },
                        { id: 'models', name: 'LLM & Provider Models Only' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSearchDefaultScope(s.id as any)}
                          className={`p-2 rounded-lg border text-left font-medium text-[11px] transition-all ${
                            searchDefaultScope === s.id
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                              : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400'
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
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
                <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-xl space-y-1">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <span>Grid Telemetry & Solana / Sui RPC Clusters</span>
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Manage high-speed DAS endpoints, Pyth Hermes price feed oracles, and Sui carbon credit subnets.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-xs text-gray-900 dark:text-zinc-100">Configured DePIN RPC Endpoints</p>
                  <div className="space-y-2">
                    {rpcEndpoints.map((ep) => (
                      <div
                        key={ep.id}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                          ep.isPrimary
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/50'
                            : 'bg-gray-50 dark:bg-zinc-800/80 border-gray-200 dark:border-zinc-700'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-gray-900 dark:text-white">{ep.cluster}</span>
                            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                              {ep.network}
                            </span>
                            {ep.isPrimary && (
                              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                PRIMARY
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] font-mono text-gray-500 dark:text-zinc-400 truncate max-w-xs">{ep.url}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                            {ep.latencyMs}ms
                          </span>
                          <button
                            onClick={async () => {
                              const lat = await RpcService.pingEndpoint(ep.id);
                              setRpcEndpoints([...RpcService.getEndpoints()]);
                            }}
                            className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 hover:border-emerald-500 text-gray-600 dark:text-zinc-300 transition-colors"
                            title="Ping RPC"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          {!ep.isPrimary && (
                            <button
                              onClick={() => {
                                RpcService.setPrimaryEndpoint(ep.id);
                                setRpcEndpoints([...RpcService.getEndpoints()]);
                              }}
                              className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-colors"
                            >
                              Set Primary
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-zinc-800">
                  <p className="font-bold text-xs text-gray-900 dark:text-zinc-100">Add Custom RPC Endpoint</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="RPC Name / Cluster"
                      className="p-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs text-gray-900 dark:text-zinc-100 outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      placeholder="https://rpc.example.com"
                      className="p-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs text-gray-900 dark:text-zinc-100 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm">
                    Add RPC Endpoint
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'gmail' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center font-bold">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Google Workspace Gmail Integration</h4>
                        <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                          Automated settlement receipts, thread summaries, and draft responses.
                        </p>
                      </div>
                    </div>
                    {gmailConnected ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Connected OAuth2
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        Disconnected
                      </span>
                    )}
                  </div>

                  {!gmailConnected ? (
                    <button
                      onClick={handleGmailSignIn}
                      disabled={gmailLoading}
                      className="w-full py-2.5 px-4 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-gray-800 dark:text-zinc-100 shadow-2xs transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
                        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                        <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"/>
                        <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                      </svg>
                      <span>{gmailLoading ? 'Connecting OAuth2...' : 'Sign in with Google (Gmail Scopes)'}</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-gray-500">Connected Account:</span>
                        <span className="text-xs font-mono font-bold text-gray-900 dark:text-zinc-100">
                          {gmailUser?.email || 'powerchain.network@gmail.com'}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-zinc-900">
                        <button
                          onClick={handleFetchEnergyEmails}
                          disabled={gmailLoading}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors"
                        >
                          Fetch Energy Emails
                        </button>
                        <button
                          onClick={handleGmailLogout}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-[11px] transition-colors"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}

                  {gmailStatusMsg && (
                    <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 p-2 bg-emerald-500/10 rounded-lg">
                      {gmailStatusMsg}
                    </p>
                  )}
                </div>

                {fetchedEmails.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-bold text-gray-900 dark:text-zinc-100 text-xs">Recent Energy Grid Emails</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {fetchedEmails.map((email) => (
                        <div key={email.id} className="p-2.5 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-bold text-gray-900 dark:text-zinc-100 truncate">{email.subject}</span>
                            <span className="text-gray-400 shrink-0 text-[9px]">{email.date}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 dark:text-zinc-400 line-clamp-2">{email.snippet}</p>
                          <p className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 truncate">From: {email.from}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar name={activeDemoUser.name || user.name} imageUrl={activeDemoUser.avatarUrl || localAvatar} size="xl" className="shadow-lg border-2 border-emerald-500/20" />
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-zinc-100">{activeDemoUser.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 font-mono">{activeDemoUser.email}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider">
                          {activeDemoUser.role}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {activeDemoUser.pwrcBalance.toLocaleString()} PWRC
                        </span>
                      </div>
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
                  <p className="font-bold text-xs text-gray-900 dark:text-zinc-100 uppercase tracking-wider text-gray-400">Switch Demo Persona Account</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {DEMO_USERS.map((demo) => (
                      <button
                        key={demo.id}
                        onClick={() => {
                          const u = UserRolesService.switchUser(demo.id);
                          setActiveDemoUser({ ...u });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeDemoUser.id === demo.id
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : 'bg-gray-50 dark:bg-zinc-800/80 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400'
                        }`}
                      >
                        <p className="font-bold text-xs truncate">{demo.name}</p>
                        <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5">{demo.role}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-xs text-gray-900 dark:text-zinc-100">Assigned Role Permissions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDemoUser.permissions.map((p) => (
                      <span key={p} className="px-2 py-0.5 text-[10px] font-mono bg-zinc-200 dark:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 rounded border border-zinc-300 dark:border-zinc-600">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 dark:text-zinc-100">System & Operational Audit Logs</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Real-time event stream from RPC gateways, telemetry, and vault operations.</p>
                  </div>
                  <button
                    onClick={() => {
                      auditLogger.clearLogs();
                      logsService.clearLogs();
                      setLogs([]);
                      setSystemLogs([]);
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-400 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Logs</span>
                  </button>
                </div>

                {systemLogs.length === 0 && logs.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 dark:text-zinc-500 border border-dashed border-gray-200 dark:border-zinc-700 rounded-xl">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">No System Logs Found</p>
                    <p className="text-xs mt-1">Audit events and RPC telemetry activity will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {systemLogs.map((slog) => (
                      <div key={slog.id} className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xl flex items-start justify-between text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              {slog.level}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white">{slog.source}</span>
                          </div>
                          <p className="text-gray-600 dark:text-zinc-300 text-[11px]">{slog.message}</p>
                        </div>
                        <span className="text-[9px] font-mono text-gray-400 shrink-0">{new Date(slog.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))}

                    {logs.map((log) => (
                      <div key={log.id} className="p-3 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xl flex flex-col gap-1 text-xs">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-[9px] font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300">
                              {log.category}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-zinc-100">{log.action}</span>
                          </div>
                          <span className="text-[9px] text-gray-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-gray-600 dark:text-zinc-400 text-[11px]">{log.details}</p>
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

