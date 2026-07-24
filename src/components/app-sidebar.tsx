import React, { useState } from 'react';
import {
  Plus,
  Search,
  Pin,
  MessageSquare,
  MoreVertical,
  Zap,
  Leaf,
  Cpu,
  TrendingUp,
  Settings,
  SlidersHorizontal,
  Sliders,
  ChevronRight,
  Database,
  ShieldCheck,
  Layers,
  CreditCard,
  Sparkles,
  X,
  Trash2,
} from 'lucide-react';
import { ChatSession, AIAgent, UserProfile } from '../types';
import { Logo } from './logo';
import { Avatar } from './avatar';
import { Button } from './button';

interface AppSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  agents: AIAgent[];
  activeAgentId: string;
  onSelectAgent: (id: string) => void;
  onOpenSettings: (tab?: string) => void;
  onOpenExploreAgents: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onDeleteSession?: (id: string) => void;
  onTogglePinSession?: (id: string) => void;
  currentUser?: UserProfile;
  onOpenAuthModal?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  agents,
  activeAgentId,
  onSelectAgent,
  onOpenSettings,
  onOpenExploreAgents,
  isOpenMobile = false,
  onCloseMobile,
  onDeleteSession,
  onTogglePinSession,
  currentUser,
  onOpenAuthModal,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuSessionId, setActiveMenuSessionId] = useState<string | null>(null);

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4 text-emerald-700 dark:text-emerald-500" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-teal-700 dark:text-teal-500" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-emerald-800 dark:text-emerald-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-green-700 dark:text-green-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-500" />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 ${
          isCollapsed ? 'w-16 lg:w-16' : 'w-64 lg:w-64'
        } bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border-r border-gray-200 dark:border-zinc-800 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Branding */}
        <div className="p-3 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between min-h-[64px]">
          {!isCollapsed ? (
            <div className="shrink-0 overflow-hidden">
              <Logo size="sm" showSubtitle={true} />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-900 dark:bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0 cursor-pointer" onClick={onToggleCollapse} title="Expand sidebar">
                <Zap className="w-5 h-5 text-emerald-300 fill-current" />
              </div>
            </div>
          )}

          {!isCollapsed && (
            <div className="flex items-center gap-1 shrink-0">
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors"
                  title="Collapse sidebar"
                >
                  <Layers className="w-4 h-4" />
                </button>
              )}
              {isOpenMobile && (
                <button
                  id="close-sidebar-mobile-btn"
                  onClick={onCloseMobile}
                  className="lg:hidden text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* New Chat Button */}
        <div className="p-2">
          <button
            id="new-chat-btn"
            onClick={() => {
              onNewChat();
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white font-semibold text-xs ${
              isCollapsed ? 'py-2 px-0 justify-center' : 'py-2.5 px-3 justify-between'
            } rounded-xl flex items-center transition-colors shadow-xs`}
            title="New Chat (⌘K)"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {!isCollapsed && <span>New Chat</span>}
            </div>
            {!isCollapsed && (
              <kbd className="px-1.5 py-0.5 text-[10px] bg-emerald-950 text-emerald-300 rounded font-mono">
                ⌘K
              </kbd>
            )}
          </button>
        </div>

        {/* Search Input */}
        {!isCollapsed && (
          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
              <input
                id="sidebar-chat-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats..."
                className="w-full bg-gray-100 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/80 rounded-lg pl-8 pr-8 py-1.5 text-xs text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-colors"
              />
              <button
                id="search-filter-btn"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200"
                title="Filter"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Main Navigation Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 space-y-5 py-2 custom-scrollbar">
          {/* CHAT HISTORY */}
          <div>
            {!isCollapsed && (
              <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-2 flex items-center justify-between">
                <span>Recent Chats</span>
                <span className="text-[10px] font-normal text-gray-400">{filteredSessions.length}</span>
              </div>
            )}

            <div className="space-y-1">
              {filteredSessions.map((session) => {
                const isActive = session.id === activeSessionId;
                return (
                  <div
                    key={session.id}
                    id={`chat-item-${session.id}`}
                    title={isCollapsed ? session.title : undefined}
                    className={`group relative flex items-center ${
                      isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-2'
                    } rounded-lg text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 font-medium'
                        : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                    }`}
                    onClick={() => {
                      onSelectSession(session.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                  >
                    <div className={`flex items-center gap-2.5 min-w-0 ${isCollapsed ? '' : 'flex-1 pr-1'}`}>
                      {session.pinned ? (
                        <Pin className="w-3.5 h-3.5 text-black dark:text-white fill-current shrink-0" />
                      ) : (
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-zinc-300 shrink-0" />
                      )}
                      {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-[12.5px] leading-snug">
                            {session.title}
                          </p>
                        </div>
                      )}
                    </div>

                    {!isCollapsed && (
                      <div className="relative shrink-0">
                        <button
                          id={`chat-item-menu-${session.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuSessionId(activeMenuSessionId === session.id ? null : session.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition-opacity"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>

                        {activeMenuSessionId === session.id && (
                          <div
                            className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg z-20 py-1 text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {onTogglePinSession && (
                              <button
                                onClick={() => {
                                  onTogglePinSession(session.id);
                                  setActiveMenuSessionId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 flex items-center gap-2"
                              >
                                <Pin className="w-3 h-3 text-black dark:text-white" />
                                <span>{session.pinned ? 'Unpin chat' : 'Pin chat'}</span>
                              </button>
                            )}
                            {onDeleteSession && (
                              <button
                                onClick={() => {
                                  onDeleteSession(session.id);
                                  setActiveMenuSessionId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center gap-2"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete chat</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!isCollapsed && (
              <button
                id="view-all-chats-btn"
                onClick={() => onOpenSettings('chats')}
                className="w-full text-center mt-2 py-1.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                View all chats
              </button>
            )}
          </div>

          {/* AI AGENTS */}
          <div>
            {!isCollapsed && (
              <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-2 flex items-center justify-between">
                <span>AI Agents</span>
                <span className="text-[10px] font-normal text-gray-400">{agents.length}</span>
              </div>
            )}

            <div className="space-y-1">
              {agents.map((agent) => {
                const isAgentActive = agent.id === activeAgentId;
                return (
                  <button
                    key={agent.id}
                    id={`agent-btn-${agent.id}`}
                    title={isCollapsed ? agent.name : undefined}
                    onClick={() => {
                      onSelectAgent(agent.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full text-left ${isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2 justify-between'} rounded-lg text-xs flex items-center transition-all group ${
                      isAgentActive
                        ? 'bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white font-medium'
                        : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className={`flex items-center gap-2.5 min-w-0 ${isCollapsed ? '' : 'pr-1'}`}>
                      <div className="w-6 h-6 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center shrink-0 text-gray-700 dark:text-zinc-200">
                        {renderAgentIcon(agent.icon)}
                      </div>
                      {!isCollapsed && (
                        <div className="min-w-0">
                          <p className="font-semibold text-[12px] text-gray-900 dark:text-zinc-100 truncate">
                            {agent.name}
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-zinc-500 truncate">
                            {agent.description}
                          </p>
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-zinc-200 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {!isCollapsed && (
              <button
                id="explore-all-agents-btn"
                onClick={onOpenExploreAgents}
                className="w-full text-center mt-2 py-1.5 px-3 text-[11px] font-semibold text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Explore all agents
              </button>
            )}
          </div>

          {/* SETTINGS */}
          <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-2">
                Settings
              </div>
            )}

            <div className="space-y-0.5 text-xs text-gray-600 dark:text-zinc-400">
              <button
                id="sidebar-setting-model"
                title={isCollapsed ? 'Model & LLM' : undefined}
                onClick={() => onOpenSettings('model')}
                className={`w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors ${
                  isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5 gap-2.5'
                }`}
              >
                <Settings className="w-3.5 h-3.5 text-gray-400" />
                {!isCollapsed && <span>Model & LLM</span>}
              </button>
              <button
                id="sidebar-setting-preferences"
                title={isCollapsed ? 'Preferences' : undefined}
                onClick={() => onOpenSettings('preferences')}
                className={`w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors ${
                  isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5 gap-2.5'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-gray-400" />
                {!isCollapsed && <span>Preferences</span>}
              </button>
              <button
                id="sidebar-setting-data"
                title={isCollapsed ? 'Data & Memory' : undefined}
                onClick={() => onOpenSettings('data')}
                className={`w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors ${
                  isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5 gap-2.5'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-gray-400" />
                {!isCollapsed && <span>Data & Memory</span>}
              </button>
              <button
                id="sidebar-setting-security"
                title={isCollapsed ? 'Security & MPC' : undefined}
                onClick={() => onOpenSettings('security')}
                className={`w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors ${
                  isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5 gap-2.5'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                {!isCollapsed && <span>Security & MPC</span>}
              </button>
              <button
                id="sidebar-setting-integrations"
                title={isCollapsed ? 'Integrations' : undefined}
                onClick={() => onOpenSettings('integrations')}
                className={`w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors ${
                  isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5 gap-2.5'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                {!isCollapsed && <span>Integrations</span>}
              </button>
              <button
                id="sidebar-setting-billing"
                title={isCollapsed ? 'Billing & Usage' : undefined}
                onClick={() => onOpenSettings('billing')}
                className={`w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors ${
                  isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5 gap-2.5'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                {!isCollapsed && <span>Billing & Usage</span>}
              </button>
            </div>
          </div>
        </div>

        {/* User Account Footer */}
        <div className="p-3 border-t border-gray-100 dark:border-zinc-800 mt-auto">
          <button
            title={isCollapsed ? currentUser?.name || 'John Doe' : undefined}
            onClick={() => onOpenAuthModal && onOpenAuthModal()}
            className={`w-full text-left flex items-center ${isCollapsed ? 'justify-center p-2' : 'space-x-3 px-3 py-2'} rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-700/60 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors`}
          >
            <Avatar name={currentUser?.name || 'John Doe'} size="sm" variant="dark-green" />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-gray-900 dark:text-zinc-100 truncate">
                  {currentUser?.name || 'John Doe'}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-zinc-500 truncate">
                  {currentUser?.role || 'Enterprise Admin'}
                </span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
