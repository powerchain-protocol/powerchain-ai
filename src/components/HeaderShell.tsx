import React, { useState } from 'react';
import {
  Menu,
  PanelRight,
  ChevronDown,
  Shield,
  ShieldCheck,
  Sun,
  Moon,
  Bell,
  User,
  Check,
  Settings,
  Brain,
  Sparkles,
  Zap,
  Cpu,
  Link as LinkIcon
} from 'lucide-react';
import { UserProfile, ChatSettings } from '../types';
import { WalletButton } from './wallet-button';
import { Avatar } from './avatar';
import { AIIcons } from './ai-icons';

interface HeaderShellProps {
  user: UserProfile;
  settings: ChatSettings;
  onUpdateSettings: (updated: Partial<ChatSettings>) => void;
  onToggleMobileSidebar: () => void;
  onToggleRightSidebar?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: (tab?: string) => void;
  onOpenAuthModal?: () => void;
  webSocketStatus?: 'connected' | 'connecting' | 'disconnected';
}

export const HeaderShell: React.FC<HeaderShellProps> = ({
  user,
  settings,
  onUpdateSettings,
  onToggleMobileSidebar,
  onToggleRightSidebar,
  isDarkMode,
  onToggleDarkMode,
  onOpenSettings,
  onOpenAuthModal,
  webSocketStatus = 'connected',
}) => {
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const availableModels = [
    { name: 'PowerChain GPT-4o', badge: 'Default', desc: 'High intelligence multi-modal model', icon: Brain },
    { name: 'Gemini 3.5 Flash', badge: 'Fast', desc: 'Google low-latency intelligence', icon: Zap },
    { name: 'Gemini 3.1 Pro', badge: 'High Thinking', desc: 'Complex reasoning & code synthesis', icon: Sparkles },
    { name: 'PowerChain Domain-v2', badge: 'Specialized', desc: 'Trained on grid & renewable datasets', icon: Cpu },
  ];

  const notifications = [
    { id: 'n1', title: 'Solar Farm B Peak Alert', time: '10m ago', unread: true },
    { id: 'n2', title: 'Carbon Offset Audit Completed', time: '1h ago', unread: true },
    { id: 'n3', title: 'MPC Wallet Key Rotated', time: '3h ago', unread: true },
  ];

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 px-6 flex items-center justify-between shrink-0 transition-colors z-30">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          id="mobile-sidebar-toggle-btn"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
          aria-label="Open Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Model Selector Pill */}
        <div className="relative">
          <button
            id="header-model-selector-btn"
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all shadow-2xs"
          >
            <span className="truncate max-w-[140px] sm:max-w-[180px]">{settings.model}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isModelDropdownOpen && (
            <div
              className="absolute left-0 top-full mt-1.5 w-64 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 p-1.5 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-2 py-1 text-[10px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider">
                Select Active Model
              </div>
              <div className="space-y-1 mt-1">
                {availableModels.map((m) => (
                  <button
                    key={m.name}
                    id={`model-option-${m.name.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => {
                      onUpdateSettings({ model: m.name });
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-start justify-between transition-colors ${
                      settings.model === m.name
                        ? 'bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white font-medium'
                        : 'hover:bg-gray-50 dark:hover:bg-zinc-700/60 text-gray-700 dark:text-zinc-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                        settings.model === m.name ? 'bg-white dark:bg-zinc-800 shadow-xs text-emerald-600 dark:text-emerald-400' : 'bg-gray-200 dark:bg-zinc-800/50 text-gray-500'
                      }`}>
                        <m.icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs">{m.name}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-gray-200 dark:bg-zinc-600 text-gray-700 dark:text-zinc-200 font-mono">
                            {m.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-zinc-400 mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                    {settings.model === m.name && <Check className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <span className="text-gray-300 dark:text-zinc-700 text-sm hidden sm:inline">/</span>

        {/* Real-time WebSocket Gateway Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-[11px] font-medium text-gray-700 dark:text-zinc-300">
          <span
            className={`w-2 h-2 rounded-full ${
              webSocketStatus === 'connected'
                ? 'bg-emerald-500 animate-pulse'
                : webSocketStatus === 'connecting'
                ? 'bg-amber-400 animate-ping'
                : 'bg-rose-500'
            }`}
          />
          <span>{webSocketStatus === 'connected' ? 'WebSocket Realtime' : 'Connecting WS...'}</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* MPC Security Badge */}
        <button
          id="header-mpc-secure-btn"
          onClick={() => onOpenSettings('security')}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-gray-700 dark:text-zinc-300" />
          <span>MPC Secure</span>
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        <button
          onClick={onToggleRightSidebar}
          className="xl:hidden p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Insights & Telemetry"
        >
          <PanelRight className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {isNotificationsOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-2 py-1 flex items-center justify-between border-b border-gray-100 dark:border-zinc-700 pb-2">
                <span className="font-bold text-xs text-gray-800 dark:text-zinc-200">System Alerts</span>
                <span className="text-[10px] text-gray-500 dark:text-zinc-400 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-zinc-700 max-h-60 overflow-y-auto custom-scrollbar">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2 px-2 hover:bg-gray-50 dark:hover:bg-zinc-700/50 rounded-lg text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800 dark:text-zinc-200">{n.title}</p>
                      <span className="text-[9px] text-gray-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wallet Connect Button */}
        <WalletButton size="md" />

        {/* Share Button (matching clean minimalism header button) */}
        <button
          id="header-share-btn"
          onClick={() => alert('Solana Action Blink Generated:\n\ndial.to/?action=solana-action:https://powerchain.network/api/actions/share-workspace\n\nLink copied to clipboard!')}
          className="text-xs font-semibold bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Share Blink</span>
        </button>

        {/* User Profile */}
        <div className="relative border-l border-gray-200 dark:border-zinc-800 pl-2 ml-1">
          <button
            id="header-user-profile-btn"
            onClick={() => {
              if (onOpenAuthModal) {
                onOpenAuthModal();
              } else {
                setIsUserDropdownOpen(!isUserDropdownOpen);
              }
            }}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Avatar name={user.name} size="sm" variant="dark-green" />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-900 dark:text-zinc-100 leading-none">{user.name}</p>
              <p className="text-[10px] text-gray-400 dark:text-zinc-500 leading-tight mt-0.5">{user.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isUserDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 p-1.5 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 border-b border-gray-100 dark:border-zinc-700">
                <p className="font-bold text-gray-800 dark:text-zinc-200">{user.name}</p>
                <p className="text-[10px] text-gray-400">{user.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500 dark:text-zinc-400 font-mono">
                  <Shield className="w-3 h-3" />
                  <span>{user.organization}</span>
                </div>
              </div>
              <div className="pt-1 space-y-0.5">
                <button
                  onClick={() => {
                    if (onOpenAuthModal) onOpenAuthModal();
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg text-gray-700 dark:text-zinc-300 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>Account & Authentication</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSettings('security');
                    setIsUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg text-gray-700 dark:text-zinc-300 flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-white" />
                  <span>Security & MPC Keys</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
