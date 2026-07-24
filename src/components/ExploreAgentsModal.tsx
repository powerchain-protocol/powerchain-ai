import React from 'react';
import { X, Zap, Leaf, Cpu, TrendingUp, Sparkles, Check } from 'lucide-react';
import { AIAgent } from '../types';

interface ExploreAgentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: AIAgent[];
  activeAgentId: string;
  onSelectAgent: (id: string) => void;
}

export const ExploreAgentsModal: React.FC<ExploreAgentsModalProps> = ({
  isOpen,
  onClose,
  agents,
  activeAgentId,
  onSelectAgent,
}) => {
  if (!isOpen) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-gray-900 dark:text-zinc-100" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-gray-900 dark:text-zinc-100" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-gray-900 dark:text-zinc-100" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-gray-900 dark:text-zinc-100" />;
      default:
        return <Sparkles className="w-5 h-5 text-gray-900 dark:text-zinc-100" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">
              Explore PowerChain AI Agents
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Select a specialized persona trained for specific renewable energy domain tasks.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent) => {
            const isActive = agent.id === activeAgentId;
            return (
              <div
                key={agent.id}
                id={`explore-agent-card-${agent.id}`}
                onClick={() => {
                  onSelectAgent(agent.id);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                    : 'bg-gray-50 dark:bg-zinc-800/60 border-gray-200 dark:border-zinc-700/80 text-gray-800 dark:text-zinc-200 hover:border-gray-400 dark:hover:border-zinc-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                      isActive 
                        ? 'bg-zinc-800 border-zinc-700 dark:bg-zinc-100 dark:border-zinc-300' 
                        : 'bg-white dark:bg-zinc-700 border-gray-200 dark:border-zinc-600'
                    }`}>
                      {renderIcon(agent.icon)}
                    </div>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-md bg-white/20 dark:bg-black/20 text-current font-bold text-[10px] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm">{agent.name}</h4>
                  <p className={`text-xs font-semibold mt-0.5 ${isActive ? 'opacity-90' : 'text-gray-500 dark:text-zinc-400'}`}>
                    {agent.role}
                  </p>
                  <p className={`text-xs mt-2 leading-relaxed ${isActive ? 'opacity-80' : 'text-gray-500 dark:text-zinc-400'}`}>
                    {agent.description}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t flex justify-end ${isActive ? 'border-white/20 dark:border-black/20' : 'border-gray-200 dark:border-zinc-700'}`}>
                  <span className="text-xs font-semibold hover:underline">
                    {isActive ? 'Currently Active' : 'Switch to Agent →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
