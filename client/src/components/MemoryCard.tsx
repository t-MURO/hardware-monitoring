import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { HardDrive } from 'lucide-react';
import * as types from '../types.ts';
import { memo, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface MemoryCardProps {
  stats: types.HardwareStats;
}

const MemoryCard = memo(function MemoryCard({ stats }: MemoryCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const COLORS = isDark ? ['#ffffff', '#666666'] : ['#000000', '#999999'];
  
  const data = useMemo(() => [
    { name: 'Used', value: stats.memory.used, percentage: ((stats.memory.used / stats.memory.total) * 100).toFixed(0) },
    { name: 'Free', value: stats.memory.free, percentage: ((stats.memory.free / stats.memory.total) * 100).toFixed(0) }
  ], [stats.memory.used, stats.memory.free, stats.memory.total]);

  const formatBytes = (bytes: number) => (bytes / 1024 ** 3).toFixed(1) + ' GB';

  return (
    <div className={`${isDark ? "bg-black border-white text-white shadow-white/20" : "bg-white border-black text-black shadow-black/20"} border rounded-lg p-4 shadow-lg`}>
      <div className="flex items-center mb-4">
        <HardDrive className={`w-6 h-6 mr-2 ${isDark ? "text-white" : "text-black"}`} />
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>Memory</h2>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            legendType="none"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            stroke={isDark ? "#ffffff" : "#000000"}
            strokeWidth={2}
            animationDuration={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string) => {
              const formattedValue = formatBytes(value);
              const percentage = ((value / stats.memory.total) * 100).toFixed(1);
              return [`${formattedValue} (${percentage}%)`, name];
            }}
            contentStyle={{ 
              backgroundColor: isDark ? '#000000' : '#ffffff', 
              border: `1px solid ${isDark ? "#ffffff" : "#000000"}`,
              color: `${isDark ? "#ffffff" : "#000000"} !important`,
              padding: '8px'
            }}
            wrapperStyle={{ color: isDark ? '#ffffff' : '#000000' }}
            itemStyle={{ color: isDark ? '#ffffff' : '#000000' }}
            labelStyle={{ color: isDark ? '#ffffff' : '#000000' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          <span className={isDark ? 'text-white' : 'text-black'}>Used {data[0].percentage}%</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isDark ? 'bg-gray-400' : 'bg-gray-600'}`}></div>
          <span className={isDark ? 'text-white' : 'text-black'}>Free {data[1].percentage}%</span>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <div title="Total installed RAM">Total: {formatBytes(stats.memory.total)}</div>
        <div title="RAM currently in use by system and applications">Used: {formatBytes(stats.memory.used)}</div>
        <div title="Available RAM not in use">Free: {formatBytes(stats.memory.free)}</div>
        <div title="Swap space currently used (virtual memory)">Swap Used: {formatBytes(stats.memory.swapUsed)}</div>
      </div>
    </div>
  );
});

export default MemoryCard;