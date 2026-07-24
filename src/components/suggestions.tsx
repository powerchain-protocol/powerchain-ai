import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AIIcons } from './ai-icons';

export interface SuggestionItem {
  id: string;
  label: string;
  prompt: string;
  iconName: string;
  category?: string;
}

interface SuggestionsProps {
  onSelectSuggestion: (prompt: string) => void;
  items?: SuggestionItem[];
}

export const defaultSuggestions: SuggestionItem[] = [
  {
    id: 's-1',
    label: 'Executive Monthly Summary',
    prompt: 'Generate an executive summary report on all renewable asset performance, power outputs, and treasury revenues this month.',
    iconName: 'chart',
    category: 'Analytics',
  },
  {
    id: 's-2',
    label: 'Predict Tomorrow Generation',
    prompt: 'Run a predictive generation forecast for solar and wind power output across grid sub-stations tomorrow.',
    iconName: 'zap',
    category: 'Forecast',
  },
  {
    id: 's-3',
    label: 'Optimize Battery BESS-04',
    prompt: 'Analyze Battery System BESS-04 discharge schedules and recommend optimal peak shaving timing.',
    iconName: 'battery',
    category: 'Storage',
  },
  {
    id: 's-4',
    label: 'Carbon Settlement Audit',
    prompt: 'Audit recent Scope 1/2 carbon offsets and verified tokenized carbon certificate issuances on-chain.',
    iconName: 'carbon',
    category: 'Carbon',
  },
  {
    id: 's-5',
    label: 'Treasury Yield & Reserve',
    prompt: 'Review on-chain treasury liquidity reserve status and yield distribution for renewable energy infrastructure assets.',
    iconName: 'security',
    category: 'Treasury',
  },
];

export const Suggestions: React.FC<SuggestionsProps> = ({
  onSelectSuggestion,
  items = defaultSuggestions,
}) => {
  return (
    <div className="w-full">
      <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200 uppercase tracking-wider mb-3">
        Suggested Operations Workflows
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectSuggestion(item.prompt)}
            className="p-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-emerald-700/60 dark:hover:border-emerald-500/60 rounded-xl text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-800/30">
                  <AIIcons name={item.iconName} size={14} />
                </div>
                {item.category && (
                  <span className="text-[10px] font-mono uppercase text-gray-500 dark:text-zinc-400">
                    {item.category}
                  </span>
                )}
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <span className="text-xs font-semibold text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
