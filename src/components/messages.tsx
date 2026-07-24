import React, { useState } from 'react';
import {
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  Cpu,
  Sparkles,
  Zap,
  Globe,
  Share2,
  Terminal,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { Avatar } from './avatar';

interface MessagesProps {
  message: ChatMessage;
  isSaved?: boolean;
  onToggleSave?: (message: ChatMessage) => void;
}

export const MessageItem: React.FC<MessagesProps> = ({ message, isSaved = false, onToggleSave }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group flex flex-col sm:flex-row items-start gap-3 my-4 p-4 rounded-2xl transition-all ${
        isUser
          ? 'bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 ml-auto max-w-[95%] sm:max-w-[85%] text-slate-900 dark:text-zinc-100 shadow-sm hover:shadow-md'
          : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800/90 shadow-md hover:shadow-lg max-w-[100%] sm:max-w-[95%] md:max-w-[92%]'
      }`}
    >
      {/* Avatar */}
      <div className="shrink-0 sm:mt-0.5 self-end sm:self-auto order-2 sm:order-1 mt-2">
        {isUser ? (
          <Avatar name="User" size="sm" variant="dark-green" />
        ) : (
          <div className="w-8 h-8 rounded-xl bg-emerald-900 dark:bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shadow-md border border-emerald-700/50">
            <Zap className="w-4 h-4 text-emerald-300 fill-current" />
          </div>
        )}
      </div>

      {/* Message Body & Metadata */}
      <div className="flex-1 min-w-0 space-y-2 order-1 sm:order-2 w-full">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-gray-900 dark:text-zinc-100">
              {isUser ? 'You' : 'PowerChain AI'}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-zinc-500">{message.timestamp}</span>

            {!isUser && (
              <>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/10 dark:bg-emerald-950/60 border border-emerald-800/40 text-emerald-800 dark:text-emerald-400 font-semibold text-[10px]">
                  <Sparkles className="w-3 h-3" />
                  Gemini 1.5 Pro
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-medium text-[10px]">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  MPC Verified
                </span>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors"
              title="Copy message text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            {onToggleSave && !isUser && (
              <button
                onClick={() => onToggleSave(message)}
                className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${
                  isSaved
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200'
                }`}
                title={isSaved ? 'Remove bookmark' : 'Bookmark message'}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="text-sm text-gray-800 dark:text-zinc-200 leading-relaxed font-normal whitespace-pre-wrap">
          {message.text}
        </div>
      </div>
    </div>
  );
};
