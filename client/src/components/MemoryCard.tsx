import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HardDrive } from 'lucide-react';
import * as types from '../types.ts';

interface MemoryCardProps {
  stats: types.HardwareStats;
}

const COLORS = ['#00ff00', '#333333'];

export default function MemoryCard({ stats }: MemoryCardProps) {
  const data = [
    { name: 'Used', value: stats.memory.used },
    { name: 'Free', value: stats.memory.free }
  ];

  const formatBytes = (bytes: number) => (bytes / 1024 ** 3).toFixed(1) + ' GB';

  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 text-green-400 shadow-lg shadow-green-500/20">
      <div className="flex items-center mb-4">
        <HardDrive className="w-6 h-6 mr-2 text-green-300" />
        <h2 className="text-lg font-semibold text-green-300">Memory</h2>
      </div>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#111', color: '#00ff00', border: '2px solid #00ff00', padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value, name) => [`${formatBytes(value)} (${((value / stats.memory.total) * 100).toFixed(1)}%)`, name]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-1">
        <div title="Total installed RAM">Total: {formatBytes(stats.memory.total)}</div>
        <div title="RAM currently in use by system and applications">Used: {formatBytes(stats.memory.used)}</div>
        <div title="Available RAM not in use">Free: {formatBytes(stats.memory.free)}</div>
        <div title="Swap space currently used (virtual memory)">Swap Used: {formatBytes(stats.memory.swapUsed)}</div>
      </div>
    </div>
  );
}