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
  Sparkles
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

      {/* 5. GRID HEALTH VISUALIZATION */}
      <GridHealthChart />
    </aside>
    </>
  );
};
