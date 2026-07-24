import React, { useState } from 'react';
import { Bookmark, Trash2, ExternalLink, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface SavedMessagesProps {
  savedMessages: ChatMessage[];
  onRemoveSaved: (messageId: string) => void;
  onOpenMessageInChat?: (message: ChatMessage) => void;
}

export const SavedMessages: React.FC<SavedMessagesProps> = ({
  savedMessages,
  onRemoveSaved,
  onOpenMessageInChat,
}) => {
  if (savedMessages.length === 0) {
    return (
      <div className="p-6 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/40">
        <Bookmark className="w-6 h-6 text-emerald-700 dark:text-emerald-400 mx-auto mb-2 opacity-80" />
        <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200">
          No Saved Telemetry Insights
        </h4>
        <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1">
          Bookmark important AI response outputs or executive summaries during chat sessions to pin them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>Saved Insights ({savedMessages.length})</span>
        </h4>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
        {savedMessages.map((msg) => (
          <div
            key={msg.id}
            className="p-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xs hover:border-emerald-800/40 transition-colors"
          >
            <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-zinc-500 font-mono mb-1.5">
              <span>{msg.timestamp || 'Today'}</span>
              <div className="flex items-center gap-1">
                {onOpenMessageInChat && (
                  <button
                    onClick={() => onOpenMessageInChat(msg)}
                    className="p-1 text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400"
                    title="View in Chat"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() => onRemoveSaved(msg.id)}
                  className="p-1 text-gray-400 hover:text-rose-500"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-800 dark:text-zinc-200 line-clamp-3 leading-relaxed">
              {msg.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
