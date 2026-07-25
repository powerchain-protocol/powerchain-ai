import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell
} from 'recharts';
import { Activity, Zap, Cpu, ShieldCheck, Gauge, Clock, Wifi } from 'lucide-react';

export interface GridNodeTelemetry {
  time: string;
  health: number;
  load: number;
  node: string;
  region?: string;
  uptime: string;
  latency: string;
  power: string;
  capacityMW?: number;
  frequency?: string;
  batteryLevel?: string;
  oracleStatus?: string;
}

const defaultNodeData: GridNodeTelemetry[] = [
  { time: '00:00', health: 98, load: 45, node: 'Node Alpha', region: 'Pacific Northwest Hub', uptime: '99.99%', latency: '12ms', power: '45.2 MW', capacityMW: 50, frequency: '60.01 Hz', batteryLevel: '94%', oracleStatus: 'Verified (Pyth Solana)' },
  { time: '04:00', health: 95, load: 55, node: 'Node Beta', region: 'Silicon Valley Substation', uptime: '99.95%', latency: '15ms', power: '55.8 MW', capacityMW: 60, frequency: '59.98 Hz', batteryLevel: '88%', oracleStatus: 'Verified (Pyth Solana)' },
  { time: '08:00', health: 92, load: 78, node: 'Node Gamma', region: 'Texas ERCOT Grid Node', uptime: '99.98%', latency: '18ms', power: '78.4 MW', capacityMW: 85, frequency: '60.02 Hz', batteryLevel: '82%', oracleStatus: 'Verified (Pyth Solana)' },
  { time: '12:00', health: 88, load: 85, node: 'Node Delta', region: 'Midwest Wind Farm Grid', uptime: '99.91%', latency: '22ms', power: '85.1 MW', capacityMW: 90, frequency: '59.95 Hz', batteryLevel: '75%', oracleStatus: 'Pending Finality' },
  { time: '16:00', health: 94, load: 60, node: 'Node Epsilon', region: 'Appalachian Hydro Node', uptime: '99.97%', latency: '14ms', power: '60.3 MW', capacityMW: 65, frequency: '60.00 Hz', batteryLevel: '91%', oracleStatus: 'Verified (Pyth Solana)' },
  { time: '20:00', health: 97, load: 50, node: 'Node Zeta', region: 'Mojave Solar Storage', uptime: '99.99%', latency: '11ms', power: '50.0 MW', capacityMW: 55, frequency: '60.01 Hz', batteryLevel: '96%', oracleStatus: 'Verified (Pyth Solana)' },
];

const CustomTelemetryTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data: GridNodeTelemetry = payload[0].payload;
    const loadPercent = data.capacityMW ? Math.round((data.load / data.capacityMW) * 100) : data.load;

    return (
      <div className="bg-zinc-950/95 backdrop-blur-md border border-zinc-800 p-3.5 rounded-2xl shadow-2xl w-64 space-y-2.5 text-zinc-100 z-50">
        {/* Node Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-xs text-white">{data.node}</span>
            </div>
            <p className="text-[9.5px] text-zinc-400 truncate max-w-[150px]">{data.region || 'Regional Grid Substation'}</p>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
            data.health >= 95 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : data.health >= 90 
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {data.health}% Health
          </span>
        </div>

        {/* Granular Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 text-[10.5px]">
          <div className="p-2 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-0.5">
            <span className="text-zinc-400 text-[9px] flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-amber-400" /> Power Output
            </span>
            <p className="font-bold text-xs text-amber-400">{data.power}</p>
            <p className="text-[8.5px] text-zinc-500">{loadPercent}% Max Capacity</p>
          </div>

          <div className="p-2 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-0.5">
            <span className="text-zinc-400 text-[9px] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-emerald-400" /> Node Uptime
            </span>
            <p className="font-bold text-xs text-emerald-400">{data.uptime}</p>
            <p className="text-[8.5px] text-zinc-500">SLA 99.90% Target</p>
          </div>

          <div className="p-2 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-0.5">
            <span className="text-zinc-400 text-[9px] flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5 text-sky-400" /> Pyth Latency
            </span>
            <p className="font-bold text-xs text-sky-400">{data.latency}</p>
            <p className="text-[8.5px] text-zinc-500">Sub-20ms Target</p>
          </div>

          <div className="p-2 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-0.5">
            <span className="text-zinc-400 text-[9px] flex items-center gap-1">
              <Gauge className="w-2.5 h-2.5 text-purple-400" /> Frequency
            </span>
            <p className="font-bold text-xs text-purple-400">{data.frequency || '60.00 Hz'}</p>
            <p className="text-[8.5px] text-zinc-500">BESS Storage: {data.batteryLevel || '90%'}</p>
          </div>
        </div>

        {/* Oracle Verification Footer */}
        <div className="pt-1 flex items-center justify-between text-[9px] text-zinc-400 border-t border-zinc-800/60 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {data.oracleStatus || 'Verified (Pyth)'}
          </span>
          <span>Time: {label}</span>
        </div>
      </div>
    );
  }
  return null;
};

interface GridHealthChartProps {
  nodeData?: GridNodeTelemetry[];
  onSelectNode?: (nodeName: string) => void;
}

export const GridHealthChart: React.FC<GridHealthChartProps> = ({
  nodeData = defaultNodeData,
  onSelectNode,
}) => {
  const [filterMode, setFilterMode] = useState<'All' | 'Low Latency' | 'High Power'>('All');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const displayedData = nodeData.filter((item) => {
    if (filterMode === 'Low Latency') {
      const ms = parseInt(item.latency, 10);
      return !isNaN(ms) && ms <= 15;
    }
    if (filterMode === 'High Power') {
      return item.load >= 60;
    }
    return true;
  });

  const handleBarClick = (entry: GridNodeTelemetry) => {
    setSelectedNode(entry.node);
    if (onSelectNode) onSelectNode(entry.node);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800/60 rounded-xl p-4 shadow-sm space-y-3">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/20 shrink-0 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-zinc-100">Grid Telemetry & Load</h3>
            <p className="text-[10px] text-gray-500 dark:text-zinc-400">Hover nodes for granular telemetry</p>
          </div>
        </div>

        {/* Quick Filter Pill Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 p-0.5 rounded-lg text-[9.5px]">
          {(['All', 'Low Latency', 'High Power'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                filterMode === mode
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {selectedNode && (
        <div className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-md text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-emerald-500" />
            <span>Node {selectedNode} Telemetry Inspector Active</span>
          </div>
          <button 
            onClick={() => setSelectedNode(null)} 
            className="text-[9px] underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Recharts Composed Chart with Granular Tooltip */}
      <div className="h-52 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={displayedData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#10b981" floodOpacity="0.3" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" opacity={0.2} vertical={false} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a' }} 
              dy={8}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a' }} 
              unit=" MW"
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a' }} 
              unit="%"
              domain={[70, 100]}
            />

            {/* Granular Telemetry Hover Tooltip */}
            <Tooltip 
              content={<CustomTelemetryTooltip />}
              cursor={{ fill: '#10b981', opacity: 0.08 }}
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '6px' }} />
            
            <Bar 
              yAxisId="left" 
              dataKey="load" 
              name="Grid Load (MW)" 
              radius={[4, 4, 0, 0]} 
              barSize={18} 
              cursor="pointer"
            >
              {displayedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedNode === entry.node ? '#059669' : '#34d399'} 
                  opacity={selectedNode && selectedNode !== entry.node ? 0.35 : 1}
                  onClick={() => handleBarClick(entry)}
                />
              ))}
            </Bar>
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="health" 
              name="Health Score (%)" 
              stroke="#10b981" 
              strokeWidth={2.5} 
              dot={{ r: 4, strokeWidth: 2, fill: '#18181b' }} 
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }} 
              filter="url(#emeraldGlow)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="pt-3 border-t border-gray-100 dark:border-zinc-800/60 grid grid-cols-2 gap-2">
        <div className="bg-gray-50 dark:bg-zinc-800/40 p-2 rounded-lg">
          <p className="text-[9.5px] text-gray-500 dark:text-zinc-400">System Uptime Accuracy</p>
          <p className="text-xs font-bold text-gray-900 dark:text-zinc-100">99.98% (Pyth Synced)</p>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-800/40 p-2 rounded-lg">
          <p className="text-[9.5px] text-gray-500 dark:text-zinc-400">Total Output</p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              420.5 MWh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

