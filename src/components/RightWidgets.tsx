import React, { useState } from 'react';
import { X, 
  RefreshCw,
  Zap,
  ShieldCheck,
  Activity,
  Cpu,
  FileText,
  TrendingUp,
  Cloud,
  DollarSign,
  PieChart,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PromptTemplate, ChatSkeleton, ChatMessage } from '../types';
import { SavedMessages } from './saved-messages';
import { AIIcons } from './ai-icons';
import { GridHealthChart } from './GridHealthChart';

interface RightWidgetsProps {
  suggestions: { id: string; text: string; icon: string }[];
  promptTemplates: PromptTemplate[];
  chatSkeletons: ChatSkeleton[];
  savedMessages?: ChatMessage[];
  onRemoveSavedMessage?: (id: string) => void;
  onSelectPrompt: (promptText: string) => void;
  onOpenPromptLibraryModal: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const RightWidgets: React.FC<RightWidgetsProps> = ({
  suggestions,
  promptTemplates,
  chatSkeletons,
  savedMessages = [],
  onRemoveSavedMessage = () => {},
  onSelectPrompt,
  onOpenPromptLibraryModal,
  isOpenMobile = false,
  onCloseMobile = () => {},
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Analytics' | 'Reports' | 'Operations'>('All');
  const [suggestionList, setSuggestionList] = useState(suggestions);

  const categories = ['All', 'Analytics', 'Reports', 'Operations'] as const;

  const filteredPrompts = promptTemplates.filter(
    (pt) => activeCategory === 'All' || pt.category === activeCategory
  );

  const handleRefreshSuggestions = () => {
    const shuffled = [...suggestionList].sort(() => Math.random() - 0.5);
    setSuggestionList(shuffled);
  };

  const containerClasses = `
    flex flex-col w-72 md:w-80 bg-white dark:bg-zinc-900 border-l border-gray-200/80 dark:border-zinc-800 p-5 space-y-6 overflow-y-auto custom-scrollbar shrink-0
    ${isOpenMobile ? 'fixed inset-y-0 right-0 z-50 shadow-2xl' : 'hidden xl:flex'}
  `;

  return (
    <>
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        id="right-widgets-panel"
        className={containerClasses}
      >
        {/* Mobile Close Button */}
        {isOpenMobile && (
          <div className="flex justify-end xl:hidden mb-2 -mt-2 -mr-2">
            <button
              onClick={onCloseMobile}
              className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      {/* 1. SAVED MESSAGES & BOOKMARKS */}
      <SavedMessages
        savedMessages={savedMessages}
        onRemoveSaved={onRemoveSavedMessage}
      />

      {/* 2. SUGGESTIONS WIDGET */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
            Suggestions
          </h3>
          <button
            id="refresh-suggestions-btn"
            onClick={handleRefreshSuggestions}
            className="text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            title="Refresh suggestions"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {suggestionList.map((item) => (
            <button
              key={item.id}
              id={`suggestion-btn-${item.id}`}
              onClick={() => onSelectPrompt(item.text)}
              className="w-full text-left p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/80 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-3 group cursor-pointer shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-950/10 dark:bg-emerald-950/40 border border-emerald-800/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-emerald-800 dark:text-emerald-400">
                <AIIcons name={item.icon} size={14} />
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-zinc-200 leading-snug flex-1 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. PROMPT LIBRARY WIDGET */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Prompt Library</h3>
          <button
            id="view-all-prompts-btn"
            onClick={onOpenPromptLibraryModal}
            className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-1 border-b border-gray-200 dark:border-zinc-800 pb-2 mb-3 overflow-x-auto custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`prompt-tab-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-emerald-900 text-white dark:bg-emerald-800 dark:text-white'
                  : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2 max-h-[260px] overflow-y-auto custom-scrollbar pr-0.5">
          {filteredPrompts.slice(0, 5).map((pt) => (
            <div
              key={pt.id}
              id={`prompt-card-${pt.id}`}
              onClick={() => onSelectPrompt(pt.prompt)}
              className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/80 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer group flex items-start gap-3 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-950/10 dark:bg-emerald-950/40 border border-emerald-800/30 flex items-center justify-center shrink-0 text-emerald-800 dark:text-emerald-400 mt-0.5">
                <AIIcons name={pt.icon} size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-xs text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                  {pt.title}
                </p>
                <p className="text-[10.5px] text-gray-500 dark:text-zinc-400 leading-snug line-clamp-2 mt-0.5">
                  {pt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUGGESTED OPERATIONS WORKFLOWS CARD */}
      <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h4 className="font-bold text-xs text-white">Suggested Operations Workflows</h4>
          </div>
          <span className="text-[9.5px] text-zinc-400 font-mono">4 Workflows</span>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onSelectPrompt("Execute CAISO 4-hour BESS battery arbitrage discharge cycle.")}
            className="w-full p-2.5 bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/80 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div>
              <p className="text-[11px] font-bold text-zinc-200 group-hover:text-emerald-400">BESS Arbitrage Cycle</p>
              <p className="text-[9.5px] text-zinc-400">4-hr CAISO peak power dispatch</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onSelectPrompt("Clear 1,000 PWRC tokenized power credits via Solana Pay.")}
            className="w-full p-2.5 bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/80 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div>
              <p className="text-[11px] font-bold text-zinc-200 group-hover:text-emerald-400">Solana Pay Credit Settlement</p>
              <p className="text-[9.5px] text-zinc-400">1,000 PWRC clearing ($250 USD)</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onSelectPrompt("Summarize incoming Gmail grid telemetry notification and send PDF digest.")}
            className="w-full p-2.5 bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/80 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div>
              <p className="text-[11px] font-bold text-zinc-200 group-hover:text-emerald-400">Gmail Workspace Digest</p>
              <p className="text-[9.5px] text-zinc-400">Auto-summarize telemetry receipts</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>

      {/* 4. HIGHLIGHT CARD */}
      <div className="p-4 bg-emerald-950 text-emerald-100 border border-emerald-800/80 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <Zap className="w-4 h-4 text-emerald-400 fill-current" />
          <h4 className="font-bold text-xs">Autonomous Grid Optimization</h4>
        </div>
        <p className="text-xs text-emerald-200/90 leading-relaxed font-normal">
          PowerChain AI automatically recalculates grid settlements and battery dispatch cycles every 15 minutes.
        </p>
      </div>

      {/* TELEMETRY INSIGHT DARK GREEN THIN-FRAMED CARD */}
      <div className="p-4 bg-emerald-950/20 dark:bg-emerald-950/40 border border-emerald-700/30 rounded-xl space-y-3.5 text-emerald-100 shadow-lg relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -mr-10 -mt-10" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-700/30 pb-3 gap-2 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 flex items-center justify-center border border-emerald-500/30 shadow-inner">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wider">Telemetry Insight</h4>
              <p className="text-[10px] text-emerald-300/80 font-mono flex items-center gap-1">
                Pyth Oracle Synced <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Sub-20ms
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse whitespace-nowrap shadow-[0_0_8px_rgba(52,211,153,0.2)]">
            LIVE DEPIN
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] relative z-10">
          <div className="p-3 bg-zinc-950/40 dark:bg-zinc-950/60 rounded-xl border border-emerald-700/20 space-y-1 backdrop-blur-sm shadow-sm hover:border-emerald-500/40 transition-colors">
            <p className="text-emerald-400/80 text-[10px] font-mono uppercase">Total Power Output</p>
            <p className="font-bold text-white text-sm">420.5 <span className="text-xs text-emerald-300">MWh</span></p>
            <p className="text-[9px] text-emerald-400 font-mono font-semibold">+4.2% Peak Efficiency</p>
          </div>
          <div className="p-3 bg-zinc-950/40 dark:bg-zinc-950/60 rounded-xl border border-emerald-700/20 space-y-1 backdrop-blur-sm shadow-sm hover:border-emerald-500/40 transition-colors">
            <p className="text-emerald-400/80 text-[10px] font-mono uppercase">Pyth Latency</p>
            <p className="font-bold text-emerald-400 text-sm">14.2 <span className="text-xs">ms</span></p>
            <p className="text-[9px] text-zinc-400 font-mono">Solana Finality</p>
          </div>
          <div className="p-3 bg-zinc-950/40 dark:bg-zinc-950/60 rounded-xl border border-emerald-700/20 space-y-1 backdrop-blur-sm shadow-sm hover:border-emerald-500/40 transition-colors">
            <p className="text-emerald-400/80 text-[10px] font-mono uppercase">Grid Uptime</p>
            <p className="font-bold text-white text-sm">99.98<span className="text-xs text-emerald-300">%</span></p>
            <p className="text-[9px] text-emerald-400 font-mono font-semibold">12/12 Active Nodes</p>
          </div>
          <div className="p-3 bg-zinc-950/40 dark:bg-zinc-950/60 rounded-xl border border-emerald-700/20 space-y-1 backdrop-blur-sm shadow-sm hover:border-emerald-500/40 transition-colors">
            <p className="text-emerald-400/80 text-[10px] font-mono uppercase">PWRC Mint Vault</p>
            <p className="font-bold text-emerald-300 text-sm">42.5k <span className="text-xs">PWRC</span></p>
            <p className="text-[9px] text-zinc-400 font-mono">$0.25 USD Index</p>
          </div>
        </div>
      </div>

      {/* 5. GRID HEALTH VISUALIZATION */}
      <GridHealthChart />
    </aside>
    </>
  );
};
