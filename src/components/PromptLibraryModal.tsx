import React, { useState } from 'react';
import { X, Search, Zap, Cloud, DollarSign, PieChart, Sparkles } from 'lucide-react';
import { PromptTemplate, ChatSkeleton } from '../types';

interface PromptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptTemplates: PromptTemplate[];
  chatSkeletons: ChatSkeleton[];
  onSelectPrompt: (promptText: string) => void;
}

export const PromptLibraryModal: React.FC<PromptLibraryModalProps> = ({
  isOpen,
  onClose,
  promptTemplates,
  chatSkeletons,
  onSelectPrompt,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'prompts' | 'skeletons'>('prompts');

  if (!isOpen) return null;

  const filteredTemplates = promptTemplates.filter(
    (pt) =>
      pt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSkeletons = chatSkeletons.filter(
    (sk) =>
      sk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sk.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col h-[580px] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">
              Prompt Library & Workspace Skeletons
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Execute pre-configured energy domain templates or setup custom analysis skeletons.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-gray-200/70 dark:bg-zinc-800 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('prompts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'prompts'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
              }`}
            >
              Prompt Templates ({promptTemplates.length})
            </button>
            <button
              onClick={() => setActiveTab('skeletons')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'skeletons'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
              }`}
            >
              Chat Skeletons ({chatSkeletons.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-800 dark:text-zinc-200 placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white"
            />
          </div>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-3">
          {activeTab === 'prompts' ? (
            filteredTemplates.map((pt) => (
              <div
                key={pt.id}
                onClick={() => {
                  onSelectPrompt(pt.prompt);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/80 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer group flex items-start justify-between gap-4"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {pt.title}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 font-mono text-[10px]">
                      {pt.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 leading-snug">
                    {pt.description}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-zinc-500 italic line-clamp-1 pt-1">
                    "{pt.prompt}"
                  </p>
                </div>

                <button className="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-semibold group-hover:opacity-90 transition-all shrink-0">
                  Use Prompt
                </button>
              </div>
            ))
          ) : (
            filteredSkeletons.map((sk) => (
              <div
                key={sk.id}
                onClick={() => {
                  onSelectPrompt(sk.defaultPrompt);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/80 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer group flex items-start justify-between gap-4"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="font-bold text-sm text-gray-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {sk.title}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 leading-snug">
                    {sk.description}
                  </p>
                </div>

                <button className="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-semibold group-hover:opacity-90 transition-all shrink-0">
                  Load Skeleton
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
