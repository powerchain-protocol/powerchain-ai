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
import { Activity, Zap, Cpu } from 'lucide-react';

const initialData = [
  { time: '00:00', health: 98, load: 45, node: 'Node Alpha', uptime: '99.99%', latency: '12ms', power: '45MW' },
  { time: '04:00', health: 95, load: 55, node: 'Node Beta', uptime: '99.95%', latency: '15ms', power: '55MW' },
  { time: '08:00', health: 92, load: 78, node: 'Node Gamma', uptime: '99.98%', latency: '18ms', power: '78MW' },
  { time: '12:00', health: 88, load: 85, node: 'Node Delta', uptime: '99.91%', latency: '22ms', power: '85MW' },
  { time: '16:00', health: 94, load: 60, node: 'Node Epsilon', uptime: '99.97%', latency: '14ms', power: '60MW' },
  { time: '20:00', health: 97, load: 50, node: 'Node Zeta', uptime: '99.99%', latency: '11ms', power: '50MW' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-3 rounded-xl shadow-lg">
        <p className="font-bold text-xs text-gray-900 dark:text-zinc-100 mb-2">{data.node} <span className="text-gray-400 font-normal">({label})</span></p>
        <div className="space-y-1">
          <div className="flex justify-between gap-4 text-[11px]">
            <span className="text-gray-500 dark:text-zinc-400">Health:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">{data.health}%</span>
          </div>
          <div className="flex justify-between gap-4 text-[11px]">
            <span className="text-gray-500 dark:text-zinc-400">Power Output:</span>
            <span className="font-medium text-gray-900 dark:text-zinc-100">{data.power}</span>
          </div>
          <div className="flex justify-between gap-4 text-[11px]">
            <span className="text-gray-500 dark:text-zinc-400">Uptime:</span>
            <span className="font-medium text-gray-900 dark:text-zinc-100">{data.uptime}</span>
          </div>
          <div className="flex justify-between gap-4 text-[11px]">
            <span className="text-gray-500 dark:text-zinc-400">Latency:</span>
            <span className="font-medium text-gray-900 dark:text-zinc-100">{data.latency}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const GridHealthChart: React.FC = () => {
  const [data] = useState(initialData);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      setSelectedNode(data.activePayload[0].payload.node);
    }
  };

  const handleBarClick = (entry: any, index: number) => {
    setSelectedNode(entry.node);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-zinc-100">Grid Health & Load</h3>
            <p className="text-[10px] text-gray-500 dark:text-zinc-400">Real-time telemetry</p>
          </div>
        </div>
        {selectedNode && (
          <div className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-md text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Cpu className="w-3 h-3" />
            {selectedNode} Active
          </div>
        )}
      </div>
      
      <div className="h-48 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} onClick={handleNodeClick} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#10b981" floodOpacity="0.3" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" opacity={0.2} vertical={false} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a' }} 
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a' }} 
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#71717a' }} 
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: '#27272a', opacity: 0.1 }}
            />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            
            <Bar yAxisId="left" dataKey="load" name="Grid Load (MW)" radius={[4, 4, 0, 0]} barSize={20} onClick={handleBarClick} cursor="pointer">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedNode === entry.node ? '#059669' : '#34d399'} 
                  opacity={selectedNode && selectedNode !== entry.node ? 0.3 : 1}
                />
              ))}
            </Bar>
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="health" 
              name="Health Score (%)" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#18181b' }} 
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }} 
              filter="url(#shadow)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800/60 grid grid-cols-2 gap-2">
        <div className="bg-gray-50 dark:bg-zinc-800/40 p-2 rounded-lg">
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">System Uptime</p>
          <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">99.98%</p>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-800/40 p-2 rounded-lg">
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">Total Output</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
              420.5 
            </p>
            <span className="text-[10px] font-semibold text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">MWh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
