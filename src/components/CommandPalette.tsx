import React, { useState, useEffect } from 'react';
import {
  Search,
  Zap,
  Bot,
  Sliders,
  ShieldCheck,
  Moon,
  Sun,
  Database,
  Cpu,
  TrendingUp,
  FileText,
  Activity,
  Layers,
  Sparkles,
  X,
  ChevronRight,
  Terminal,
  Globe,
  Radio,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAgent: (agentId: string) => void;
  onOpenSettings: (tab?: string) => void;
  onToggleDarkMode: () => void;
  onToggleSidebarCollapse: () => void;
  onExecutePrompt: (promptText: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Agents' | 'Workflows & Prompts' | 'Integrations & Grid' | 'System Controls';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAgent,
  onOpenSettings,
  onToggleDarkMode,
  onToggleSidebarCollapse,
  onExecutePrompt,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands: CommandItem[] = [
    // Agents
    {
      id: 'agent-analyst',
      category: 'Agents',
      title: 'Switch to Grid Telemetry Analyst',
      subtitle: 'Analyze real-time sub-station telemetry & generation logs',
      icon: <Cpu className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onSelectAgent('analyst');
        onClose();
      },
      badge: 'Active Agent',
    },
    {
      id: 'agent-risk',
      category: 'Agents',
      title: 'Switch to Energy Risk Auditor',
      subtitle: 'Audit carbon credit verification & PPA contract settlements',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      action: () => {
        onSelectAgent('risk');
        onClose();
      },
    },
    {
      id: 'agent-battery',
      category: 'Agents',
      title: 'Switch to Battery BESS Optimizer',
      subtitle: 'Calculate optimal dispatch timing & frequency regulation',
      icon: <Zap className="w-4 h-4 text-teal-500" />,
      action: () => {
        onSelectAgent('battery');
        onClose();
      },
    },

    // Workflows & Prompts
    {
      id: 'wf-report',
      category: 'Workflows & Prompts',
      title: 'Generate Executive Telemetry Summary',
      subtitle: 'Run prompt: "Generate executive report on renewable asset revenues"',
      icon: <FileText className="w-4 h-4 text-slate-500" />,
      action: () => {
        onExecutePrompt('Generate an executive summary report on all renewable asset performance and revenues this month.');
        onClose();
      },
    },
    {
      id: 'wf-forecast',
      category: 'Workflows & Prompts',
      title: 'Run 24h Solar & Wind Generation Forecast',
      subtitle: 'Run prompt: "Predictive forecast for solar and wind generation tomorrow"',
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onExecutePrompt('Run a predictive forecast for solar and wind generation tomorrow across all grid sub-stations.');
        onClose();
      },
    },
    {
      id: 'wf-bess',
      category: 'Workflows & Prompts',
      title: 'Optimize BESS-04 Discharge Schedule',
      subtitle: 'Run prompt: "Analyze Battery System BESS-04 dispatch timing"',
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onExecutePrompt('Analyze Battery System BESS-04 discharge schedules and recommend optimal peak shaving timing.');
        onClose();
      },
    },

    // Integrations & Grid
    {
      id: 'grid-pyth',
      category: 'Integrations & Grid',
      title: 'Fetch Pyth Energy Price Feeds (KWH & MWH)',
      subtitle: 'Query Pyth Network oracle for real-time power tarification',
      icon: <Radio className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onExecutePrompt('Fetch latest Pyth Network KWH/USD price feeds and verify confidence interval.');
        onClose();
      },
      badge: 'Solana Pyth',
    },
    {
      id: 'grid-helius',
      category: 'Integrations & Grid',
      title: 'Query Helius DAS Sub-station RPC Nodes',
      subtitle: 'Check Solana mainnet ping latency and transaction throughput',
      icon: <Terminal className="w-4 h-4 text-emerald-600" />,
      action: () => {
        onExecutePrompt('Show status of Helius dedicated grid DAS nodes and latency metrics.');
        onClose();
      },
      badge: 'Helius RPC',
    },
    {
      id: 'grid-sui',
      category: 'Integrations & Grid',
      title: 'Inspect Sui Subnet Cetus Liquidity Pools',
      subtitle: 'Verify Cetus CLMM carbon credit pools on Sui Network',
      icon: <Globe className="w-4 h-4 text-teal-400" />,
      action: () => {
        onExecutePrompt('Inspect Cetus CLMM carbon credit liquidity pool stats on Sui Network.');
        onClose();
      },
      badge: 'Sui Network',
    },

    // System Controls
    {
      id: 'ctrl-sidebar',
      category: 'System Controls',
      title: 'Toggle Compact Icon-Only Sidebar Mode',
      subtitle: 'Collapse or expand navigation panel width',
      icon: <Layers className="w-4 h-4 text-gray-500" />,
      action: () => {
        onToggleSidebarCollapse();
        onClose();
      },
    },
    {
      id: 'ctrl-settings',
      category: 'System Controls',
      title: 'Open System & Model Provider Settings',
      subtitle: 'Configure Gemini, Claude, OpenAI, Ollama, and LoRA parameters',
      icon: <Sliders className="w-4 h-4 text-gray-500" />,
      action: () => {
        onOpenSettings('models');
        onClose();
      },
    },
    {
      id: 'ctrl-theme',
      category: 'System Controls',
      title: 'Toggle Dark / Light Mode',
      subtitle: 'Switch application color palette',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      action: () => {
        onToggleDarkMode();
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs transition-all animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-zinc-800">
          <Search className="w-5 h-5 text-gray-400 dark:text-zinc-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, workflow, or search powerchain..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List Body */}
        <div className="overflow-y-auto p-2 custom-scrollbar flex-1 space-y-3">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-10 text-xs text-gray-400 dark:text-zinc-500">
              No commands found for "{query}"
            </div>
          ) : (
            <>
              {['Agents', 'Workflows & Prompts', 'Integrations & Grid', 'System Controls'].map((cat) => {
                const categoryItems = filteredCommands.filter((c) => c.category === cat);
                if (categoryItems.length === 0) return null;

                return (
                  <div key={cat} className="space-y-1">
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                      {cat}
                    </div>
                    {categoryItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200/60 dark:border-zinc-700/60 shrink-0">
                            {item.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-gray-900 dark:text-zinc-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {item.badge && (
                            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-emerald-950/10 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-800/30">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-zinc-600 group-hover:text-gray-600 dark:group-hover:text-zinc-300 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-gray-400 dark:text-zinc-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-mono text-[10px]">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-mono text-[10px]">Enter</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-mono text-[10px]">Esc</kbd> Close</span>
          </div>
          <span className="font-semibold text-emerald-800 dark:text-emerald-400">PowerChain Command OS</span>
        </div>
      </div>
    </div>
  );
};
