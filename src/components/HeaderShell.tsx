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
  Search,
  Link as LinkIcon
} from 'lucide-react';
import { UserProfile, ChatSettings } from '../types';
import { WalletButton } from './wallet-button';
import { Avatar } from './avatar';
import { AIIcons } from './ai-icons';
import { AIProviderIcon } from './ai-provider-logos';
import { Logo } from './logo';
import { GlobalSearchService } from '../services/search';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifications = [
    { id: 'n1', title: 'Solar Farm B Peak Alert', time: '10m ago', unread: true },
    { id: 'n2', title: 'Carbon Offset Audit Completed', time: '1h ago', unread: true },
    { id: 'n3', title: 'MPC Wallet Key Rotated', time: '3h ago', unread: true },
  ];

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 px-4 md:px-6 flex items-center justify-between shrink-0 transition-colors z-30">
      {/* Left controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Mobile menu trigger */}
        <button
          id="mobile-sidebar-toggle-btn"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
          aria-label="Open Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center">
          <Logo size="sm" showSubtitle={false} />
        </div>

        <div className="hidden sm:flex relative shrink-0 ml-1">
          <div className="flex items-center">
            {/* Removed Model Selector from main header */}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search dePIN nodes, prompts, models..."
              className="pl-8 pr-8 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-800 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-48 lg:w-64 transition-all"
            />
            <span className="absolute right-2.5 px-1.5 py-0.5 text-[9px] font-mono text-gray-400 bg-gray-200 dark:bg-zinc-700 rounded">
              ⌘K
            </span>
          </div>

          {/* Search Dropdown Results */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-2xl z-50 p-2 space-y-1">
              <div className="px-2 py-1 flex items-center justify-between border-b border-gray-100 dark:border-zinc-700 pb-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Search Results</span>
                <span className="text-[10px] font-mono text-emerald-500">Live Query</span>
              </div>
              {GlobalSearchService.queryAll(searchQuery).length === 0 ? (
                <div className="p-3 text-center text-xs text-gray-400">No matching telemetry or prompts found</div>
              ) : (
                GlobalSearchService.queryAll(searchQuery).map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700/60 transition-colors cursor-pointer text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 dark:text-white truncate">{item.title}</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-400 truncate">{item.subtitle}</p>
                  </div>
                ))
              )}
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
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
        {/* MPC Security Badge */}
        <button
          id="header-mpc-secure-btn"
          onClick={() => onOpenSettings('security')}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors shrink-0"
        >
          <ShieldCheck className="w-4 h-4 text-gray-700 dark:text-zinc-300" />
          <span>MPC Secure</span>
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleDarkMode}
          className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        <button
          onClick={onToggleRightSidebar}
          className="xl:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Insights & Telemetry"
        >
          <PanelRight className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors relative"
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
        <div className="block">
          <WalletButton size="md" />
        </div>

        {/* Share Button (matching clean minimalism header button) */}
        <button
          id="header-share-btn"
          onClick={() => alert('Solana Action Blink Generated:\n\ndial.to/?action=solana-action:https://powerchain.network/api/actions/share-workspace\n\nLink copied to clipboard!')}
          className="hidden md:flex text-xs font-semibold bg-black text-white dark:bg-white dark:text-black px-3 lg:px-4 py-2 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-2xs items-center gap-1.5 shrink-0"
        >
          <LinkIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden lg:inline">Share Blink</span>
        </button>

        {/* User Profile */}
        <div className="relative border-l border-gray-200 dark:border-zinc-800 pl-1.5 sm:pl-2 ml-0.5 sm:ml-1 shrink-0">
          <button
            id="header-user-profile-btn"
            onClick={() => {
              if (onOpenAuthModal) {
                onOpenAuthModal();
              } else {
                setIsUserDropdownOpen(!isUserDropdownOpen);
              }
            }}
            className="flex items-center gap-1 sm:gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
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
