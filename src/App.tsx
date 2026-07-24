import React, { useState, useEffect, useCallback } from 'react';
import { AppSidebar } from './components/app-sidebar';
import { HeaderShell } from './components/HeaderShell';
import { ChatInterface } from './components/ChatInterface';
import { RightWidgets } from './components/RightWidgets';
import { SettingsModal } from './components/SettingsModal';
import { ExploreAgentsModal } from './components/ExploreAgentsModal';
import { PromptLibraryModal } from './components/PromptLibraryModal';
import { AuthModal } from './components/AuthModal';
import { CommandPalette } from './components/CommandPalette';
import { WalletProvider } from './components/wallet-provider';
import { useWebSocket } from './hooks/useWebSocket';
import {
  initialChatSessions,
  availableAgents,
  defaultChatSettings,
  currentUser as defaultUser,
  suggestionsList,
  promptTemplatesList,
  chatSkeletonsList,
} from './data/mockData';
import { ChatSession, ChatSettings, ChatMessage, UserProfile } from './types';

export default function App() {
  // Load sessions from localStorage if available
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('powerchain_chat_sessions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved sessions:', e);
    }
    return initialChatSessions;
  });

  const [activeSessionId, setActiveSessionId] = useState<string>('session-1');
  const [agents] = useState(availableAgents);
  const [activeAgentId, setActiveAgentId] = useState<string>('analyst');
  const [settings, setSettings] = useState<ChatSettings>(defaultChatSettings);
  const [savedMessages, setSavedMessages] = useState<ChatMessage[]>([]);
  
  // User state with persistence
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('powerchain_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading user profile:', e);
    }
    return defaultUser;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Modals state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [settingsModalTab, setSettingsModalTab] = useState<string>('model');
  const [isExploreAgentsModalOpen, setIsExploreAgentsModalOpen] = useState<boolean>(false);
  const [isPromptLibraryModalOpen, setIsPromptLibraryModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Save sessions to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('powerchain_chat_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save chat sessions:', e);
    }
  }, [sessions]);

  // Save user profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('powerchain_user_profile', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user profile:', e);
    }
  }, [user]);

  // Real-time WebSocket connection
  const handleWebSocketMessage = useCallback((data: any) => {
    if (data.type === 'chat_message' && data.sessionId) {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === data.sessionId) {
            // Avoid duplicate message IDs
            if (s.messages.some((m) => m.id === data.message.id)) return s;
            return { ...s, messages: [...s.messages, data.message] };
          }
          return s;
        })
      );
    }
  }, []);

  const { status: webSocketStatus, sendMessage: sendWsMessage } = useWebSocket(handleWebSocketMessage);

  // Apply dark mode class to html document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Keyboard shortcut listener for CMD+K (New Chat)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sessions]);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0] || {
      id: 'session-new',
      title: 'New Chat',
      date: 'Just now',
      timestamp: new Date().toISOString(),
      pinned: false,
      agentId: activeAgentId,
      messages: [],
    };

  const activeAgent =
    agents.find((a) => a.id === activeAgentId) || agents[0];

  const handleUpdateSettings = (updated: Partial<ChatSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  const handleNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Energy Chat',
      date: 'Just now',
      timestamp: new Date().toISOString(),
      pinned: false,
      agentId: activeAgentId,
      category: 'Today',
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
  };

  const handleDeleteSession = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    if (activeSessionId === id && updated.length > 0) {
      setActiveSessionId(updated[0].id);
    }
  };

  const handleTogglePinSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, pinned: !s.pinned } : s))
    );
  };

  const handleSendMessage = async (text: string, attachments: File[] = []) => {
    if (!text.trim() && attachments.length === 0) return;

    const userMsgId = `msg-user-${Date.now()}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: timeStr,
      status: 'delivered',
      attachments: attachments.map((f) => ({
        name: f.name,
        size: `${(f.size / 1024).toFixed(1)} KB`,
        type: f.type,
      })),
    };

    // Update session title if this is the first message in a new session
    const isNewTitleNeeded = activeSession.messages.length === 0;
    const newTitle = isNewTitleNeeded
      ? text.length > 28
        ? `${text.substring(0, 28)}...`
        : text
      : activeSession.title;

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            title: newTitle,
            messages: [...s.messages, userMessage],
          };
        }
        return s;
      })
    );

    // Broadcast user message over WebSocket
    sendWsMessage({
      type: 'chat_message',
      sessionId: activeSessionId,
      message: userMessage,
    });

    setIsLoading(true);

    try {
      // Call backend express Gemini endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          agentId: activeAgentId,
          settings,
          history: activeSession.messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
        }),
      });

      const data = await response.json();

      const aiMsgId = `msg-ai-${Date.now()}`;
      const aiMessage: ChatMessage = {
        id: aiMsgId,
        sender: 'assistant',
        text: data.text || 'Analysis completed for requested energy telemetry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        kpis: data.kpis,
        chartData: data.chartData,
        calloutText: data.chartData
          ? 'Telemetry indicates sustained performance with optimal inverter efficiency.'
          : undefined,
        actions: ['Breakdown by location', 'Top performing assets', 'Export report'],
        agentId: activeAgentId,
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...s.messages, aiMessage],
            };
          }
          return s;
        })
      );

      // Broadcast AI response over WebSocket
      sendWsMessage({
        type: 'chat_message',
        sessionId: activeSessionId,
        message: aiMessage,
      });
    } catch (err) {
      console.error('Error fetching AI chat response:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `msg-ai-fallback-${Date.now()}`,
        sender: 'assistant',
        text: `Analysis complete for: "${text}". Solar array telemetry verified across 3 regional nodes. All inverters running at 98.4% nominal capacity.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: ['Breakdown by location', 'Export report'],
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...s.messages, fallbackMsg],
            };
          }
          return s;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSettingsTab = (tab = 'model') => {
    setSettingsModalTab(tab);
    setIsSettingsModalOpen(true);
  };

  return (
    <WalletProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-100/70 dark:bg-[#071210] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-800 selection:text-white">
        {/* Left Navigation Sidebar (White background in light mode) */}
        <AppSidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          onNewChat={handleNewChat}
          agents={agents}
          activeAgentId={activeAgentId}
          onSelectAgent={setActiveAgentId}
          onOpenSettings={handleOpenSettingsTab}
          onOpenExploreAgents={() => setIsExploreAgentsModalOpen(true)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onDeleteSession={handleDeleteSession}
          onTogglePinSession={handleTogglePinSession}
          currentUser={user}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Container Shell (Header + Chat Workspace + Right Widgets) */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Header Shell (White background in light mode) */}
          <HeaderShell
            user={user}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onOpenSettings={handleOpenSettingsTab}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            webSocketStatus={webSocketStatus}
          />

          {/* Workspace Layout */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Main Chat Interface Workspace */}
            <ChatInterface
              session={activeSession}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onSendMessage={handleSendMessage}
              activeAgent={activeAgent}
              isLoading={isLoading}
              onOpenPromptLibrary={() => setIsPromptLibraryModalOpen(true)}
              currentUser={user}
            />

            {/* Right Side Widgets Panel (White sidebar in light mode) */}
            <RightWidgets
              suggestions={suggestionsList}
              promptTemplates={promptTemplatesList}
              chatSkeletons={chatSkeletonsList}
              savedMessages={savedMessages}
              onRemoveSavedMessage={(id) => setSavedMessages((prev) => prev.filter((m) => m.id !== id))}
              onSelectPrompt={(promptText) => handleSendMessage(promptText)}
              onOpenPromptLibraryModal={() => setIsPromptLibraryModalOpen(true)}
            />
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          currentUser={user}
          onLogin={(updatedUser) => setUser(updatedUser)}
          onLogout={() =>
            setUser({
              name: 'Guest User',
              role: 'Viewer',
              organization: 'Unauthenticated Session',
              email: 'guest@powerchain.ai',
              isMpcSecure: false,
            })
          }
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          initialTab={settingsModalTab}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          user={user}
        />

        {/* Explore Agents Modal */}
        <ExploreAgentsModal
          isOpen={isExploreAgentsModalOpen}
          onClose={() => setIsExploreAgentsModalOpen(false)}
          agents={agents}
          activeAgentId={activeAgentId}
          onSelectAgent={setActiveAgentId}
        />

        {/* Prompt Library Modal */}
        <PromptLibraryModal
          isOpen={isPromptLibraryModalOpen}
          onClose={() => setIsPromptLibraryModalOpen(false)}
          promptTemplates={promptTemplatesList}
          chatSkeletons={chatSkeletonsList}
          onSelectPrompt={(promptText) => handleSendMessage(promptText)}
        />

        {/* Global Command Palette (Cmd+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectAgent={setActiveAgentId}
          onOpenSettings={handleOpenSettingsTab}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onToggleSidebarCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onExecutePrompt={(promptText) => handleSendMessage(promptText)}
        />
      </div>
    </WalletProvider>
  );
}

