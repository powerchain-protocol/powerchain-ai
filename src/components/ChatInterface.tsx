import React, { useState, useRef, useEffect } from 'react';
import { Coin } from './coin';
import {
  Paperclip,
  Globe,
  BookOpen,
  Mic,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Check,
  Zap,
  TrendingUp,
  Sparkles,
  Sliders,
  Database,
  ShieldCheck,
  Layers,
  Cpu,
  X,
  FileText,
  Download,
  Share2,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ChatSession, ChatMessage, ChatSettings, AIAgent, UserProfile } from '../types';
import { WelcomeScreen } from './WelcomeScreen';

interface ChatInterfaceProps {
  session: ChatSession;
  settings: ChatSettings;
  onUpdateSettings: (updated: Partial<ChatSettings>) => void;
  onSendMessage: (text: string, attachments?: File[]) => void;
  activeAgent: AIAgent;
  isLoading: boolean;
  onOpenPromptLibrary: () => void;
  currentUser?: UserProfile;
  pwrcBalance?: number;
  onOpenSettings?: (tab?: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  session,
  settings,
  onUpdateSettings,
  onSendMessage,
  activeAgent,
  isLoading,
  onOpenPromptLibrary,
  currentUser,
  pwrcBalance = 2500,
  onOpenSettings,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [activeDropdownAction, setActiveDropdownAction] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages, isLoading]);

  const handleSend = () => {
    if ((!inputText.trim() && attachedFiles.length === 0) || isLoading) return;
    onSendMessage(inputText, attachedFiles);
    setInputText('');
    setAttachedFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles(Array.from(e.target.files));
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-zinc-950 overflow-hidden transition-colors">
      {/* Workspace Header */}
      <div className="h-14 px-6 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
            {settings.model}
          </div>
          <span className="text-gray-300 dark:text-zinc-700 text-sm">/</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100 truncate max-w-xs sm:max-w-md">
            {session.title || 'PowerChain Tokenized Workspace'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Clear Chat Button */}
          <button
            onClick={() => {
              if (window.confirm('Clear all messages in this conversation?')) {
                // Clear chat logic
              }
            }}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-emerald-900/60 bg-white dark:bg-emerald-950/40 text-gray-500 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-emerald-900/60 transition-colors"
            title="Clear Chat Messages"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Thin Framed Link Icon */}
          <a
            href="https://powerchain.network"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-gray-200 dark:border-emerald-900/60 bg-white dark:bg-emerald-950/40 text-gray-500 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-emerald-900/60 transition-colors"
            title="PowerChain Network Explorer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* PWRC Token Balance Badge */}
          <button
            onClick={() => onOpenSettings && onOpenSettings('billing')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/10 dark:bg-emerald-950/80 border border-emerald-800/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-950/30 transition-all text-xs font-bold shadow-xs"
            title="PWRC Token Balance - Click to top up"
          >
            <Coin size="sm" />
            <span>{pwrcBalance.toLocaleString()} PWRC</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-medium">Active Agent:</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>{activeAgent.name}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Messages Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
        {session.messages.length === 0 ? (
          <WelcomeScreen
            userName={currentUser?.name || 'John Doe'}
            onSelectPrompt={(text) => onSendMessage(text)}
          />
        ) : (
          session.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                id={`chat-msg-${msg.id}`}
                className={`flex space-x-4 max-w-4xl mx-auto ${isUser ? 'justify-end' : ''}`}
              >
                {isUser ? (
                  /* User Message Bubble matching design sample */
                  <div className="flex space-x-4 max-w-xl">
                    <div className="bg-gray-50 dark:bg-zinc-800/80 border border-gray-100 dark:border-zinc-700/80 rounded-2xl rounded-tr-none p-4 shadow-2xs">
                      <p className="text-sm leading-relaxed text-gray-800 dark:text-zinc-200 font-medium whitespace-pre-wrap">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400 dark:text-zinc-500 font-mono mt-2">
                        <span>{msg.timestamp}</span>
                        <Check className="w-3 h-3 text-black dark:text-white" />
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-xs">
                      {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'JD'}
                    </div>
                  </div>
                ) : (
                  /* AI Assistant Response Container matching design sample */
                  <div className="flex space-x-4 w-full">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex-shrink-0 flex items-center justify-center text-white dark:text-black font-bold text-xs shadow-xs border border-gray-200 dark:border-zinc-800">
                      <Zap className="w-4 h-4 fill-current" />
                    </div>
                    <div className="rounded-2xl p-1 max-w-3xl flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm leading-relaxed text-gray-900 dark:text-zinc-100 font-semibold">
                          PowerAI Astra
                        </p>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-medium border border-emerald-500/20">
                          Operations Intelligence
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-zinc-300 mb-4 whitespace-pre-wrap">
                        {msg.text}
                      </p>

                      {/* Embedded Analytics Card */}
                      {(msg.kpis || msg.chartData) && (
                        <div className="p-4 border border-gray-100 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-900/60 shadow-2xs space-y-4 my-3">
                          <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-zinc-800 pb-2">
                            <h4 className="font-bold text-xs text-gray-900 dark:text-zinc-100">
                              Telemetry & Output Overview
                            </h4>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-semibold">
                              Real-Time Grid Telemetry
                            </span>
                          </div>

                          {/* KPI Grid */}
                          {msg.kpis && (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                              {msg.kpis.map((kpi, index) => (
                                <div
                                  key={index}
                                  className="p-3 border border-gray-100 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-800/80"
                                >
                                  <div className="text-[10px] font-bold uppercase text-gray-400 dark:text-zinc-500 mb-1">
                                    {kpi.label}
                                  </div>
                                  <div className="text-sm font-bold text-gray-900 dark:text-zinc-100">
                                    {kpi.value}
                                  </div>
                                  {kpi.change && (
                                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                                      <TrendingUp className="w-3 h-3" />
                                      <span>{kpi.change}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Interactive Chart */}
                          {msg.chartData && (
                            <div className="pt-2">
                              <div className="h-56 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={msg.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                                    <XAxis
                                      dataKey="date"
                                      stroke="#9ca3af"
                                      fontSize={11}
                                      tickLine={false}
                                    />
                                    <YAxis
                                      stroke="#9ca3af"
                                      fontSize={11}
                                      tickLine={false}
                                      unit=" GWh"
                                    />
                                    <Tooltip
                                      contentStyle={{
                                        backgroundColor: '#18181b',
                                        borderColor: '#27272a',
                                        borderRadius: '0.75rem',
                                        color: '#fff',
                                        fontSize: '12px',
                                      }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                    <Line
                                      type="monotone"
                                      dataKey="This Month"
                                      stroke="#18181b"
                                      strokeWidth={2}
                                      dot={{ r: 4, fill: '#18181b' }}
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="Last Month"
                                      stroke="#9ca3af"
                                      strokeWidth={1.5}
                                      strokeDasharray="4 4"
                                      dot={{ r: 3, fill: '#9ca3af' }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Highlight Callout Box matching design sample black card */}
                      {msg.calloutText && (
                        <div className="p-4 bg-black dark:bg-zinc-800 rounded-xl text-white shadow-xs my-3">
                          <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-white" />
                            <span>Telemetry Insight</span>
                          </div>
                          <p className="text-xs opacity-90 leading-relaxed font-normal">
                            {msg.calloutText}
                          </p>
                        </div>
                      )}

                      {/* Action Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <div className="relative">
                          <button
                            id={`action-breakdown-${msg.id}`}
                            onClick={() =>
                              setActiveDropdownAction(
                                activeDropdownAction === `location-${msg.id}` ? null : `location-${msg.id}`
                              )
                            }
                            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-1.5 transition-colors"
                          >
                            <span>Breakdown by location</span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                          </button>

                          {activeDropdownAction === `location-${msg.id}` && (
                            <div className="absolute left-0 top-full mt-1.5 w-56 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 p-2 text-xs">
                              <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider px-2 py-1">Solar Regions</p>
                              <div className="space-y-1">
                                <div className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded flex justify-between"><span>Nevada Array</span><span className="font-mono text-gray-900 dark:text-zinc-100 font-bold">8.4 GWh</span></div>
                                <div className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded flex justify-between"><span>Arizona SunPark</span><span className="font-mono text-gray-900 dark:text-zinc-100 font-bold">6.2 GWh</span></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="relative">
                          <button
                            id={`action-assets-${msg.id}`}
                            onClick={() =>
                              setActiveDropdownAction(
                                activeDropdownAction === `assets-${msg.id}` ? null : `assets-${msg.id}`
                              )
                            }
                            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-1.5 transition-colors"
                          >
                            <span>Top performing assets</span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                          </button>

                          {activeDropdownAction === `assets-${msg.id}` && (
                            <div className="absolute left-0 top-full mt-1.5 w-60 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 p-2 text-xs">
                              <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider px-2 py-1">Top Panel Inverters</p>
                              <div className="space-y-1">
                                <div className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded flex justify-between"><span>PV Inverter #402</span><span className="font-bold">98.2% Eff</span></div>
                                <div className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded flex justify-between"><span>Tracker Bank B</span><span className="font-bold">97.8% Eff</span></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Copy & Feedback controls */}
                        <div className="flex items-center gap-1 ml-auto">
                          <button
                            id={`copy-msg-btn-${msg.id}`}
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Copy response"
                          >
                            {copiedMsgId === msg.id ? <Check className="w-3.5 h-3.5 text-black dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            id={`like-msg-btn-${msg.id}`}
                            onClick={() => setFeedbackState((prev) => ({ ...prev, [msg.id]: 'up' }))}
                            className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${
                              feedbackState[msg.id] === 'up' ? 'text-black dark:text-white' : 'text-gray-400 hover:text-gray-700'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex space-x-4 max-w-4xl mx-auto items-center">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex-shrink-0 flex items-center justify-center text-white dark:text-black font-bold text-xs">
              <div className="w-3 h-3 border border-current rounded-full animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 dark:text-zinc-300">PowerChain AI is computing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Area matching design sample */}
      <div className="p-6 bg-white dark:bg-zinc-950 shrink-0 max-w-4xl w-full mx-auto">
        {/* Attached files preview */}
        {attachedFiles.length > 0 && (
          <div className="flex items-center gap-2 mb-2 overflow-x-auto py-1">
            {attachedFiles.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-xs text-gray-800 dark:text-zinc-200">
                <Paperclip className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{f.name}</span>
                <button
                  onClick={() => setAttachedFiles(attachedFiles.filter((_, idx) => idx !== i))}
                  className="hover:text-rose-500 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          <textarea
            id="chat-input-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message PowerAI (Astra)..."
            rows={2}
            className="w-full border border-gray-200 dark:border-zinc-800 rounded-2xl py-4 pl-5 pr-16 text-sm text-gray-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-400 focus:border-transparent transition-all shadow-xs resize-none"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {/* Character counter indicator */}
            <span className="text-[10px] font-mono font-medium text-gray-400 dark:text-zinc-500 mr-1 select-none">
              {inputText.length}/2000
            </span>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              className="hidden"
            />
            <button
              id="input-attach-file-btn"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              id="send-message-btn"
              onClick={handleSend}
              disabled={(!inputText.trim() && attachedFiles.length === 0) || isLoading}
              className="bg-emerald-950 hover:bg-emerald-900 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-emerald-300 dark:text-white p-2.5 rounded-xl border border-emerald-800/80 transition-all cursor-pointer disabled:opacity-40 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-2 text-center">
          <p className="text-[10px] text-gray-400 dark:text-zinc-500">
            PowerChain AI can make mistakes. Consider verifying critical energy telemetry and PPA data.
          </p>
        </div>
      </div>
    </div>
  );
};
