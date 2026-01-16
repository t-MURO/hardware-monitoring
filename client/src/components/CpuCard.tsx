import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Cpu } from 'lucide-react';
import * as types from '../types.ts';
import { memo, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CpuCardProps {
  stats: types.HardwareStats;
  history: types.HardwareStats[];
}

const CpuCard = memo(function CpuCard({ stats, history }: CpuCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = useMemo(() => history.map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString(),
    load: h.cpu.load
  })), [history]);

  const coreData = useMemo(() => stats.cpu.cores.map((load, index) => ({ core: `C${index + 1}`, load })), [stats.cpu.cores]);

  const cardClasses = isDark 
    ? "bg-black border border-white rounded-lg p-4 text-white shadow-lg shadow-white/20"
    : "bg-white border border-black rounded-lg p-4 text-black shadow-lg shadow-black/20";

  return (
    <div className={cardClasses}>
      <div className="flex items-center mb-4">
        <Cpu className={`w-6 h-6 mr-2 ${isDark ? 'text-white' : 'text-black'}`} />
        <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>CPU</h2>
      </div>
<ResponsiveContainer width="100%" height={150}>
        <AreaChart data={data} animationDuration={0}>
          <CartesianGrid stroke={isDark ? "#ffffff" : "#000000"} strokeOpacity={0.2} />
          <XAxis dataKey="time" hide />
          <YAxis domain={[0, 100]} stroke={isDark ? "#ffffff" : "#000000"} axisLine={false} ticks={[0, 50, 100]} tick={{ fill: isDark ? '#ffffff' : '#000000', fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: isDark ? '#111' : '#fff', color: isDark ? '#ffffff' : '#000000', border: `2px solid ${isDark ? '#ffffff' : '#000000'}`, padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value) => `${value.toFixed(1)}%`} />
          <Area type="monotone" dataKey="load" stroke={isDark ? "#ffffff" : "#000000"} fill={isDark ? "#ffffff" : "#000000"} fillOpacity={0.3} animationDuration={0} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={coreData} animationDuration={0}>
            <CartesianGrid stroke={isDark ? "#ffffff" : "#000000"} strokeOpacity={0.2} />
            <XAxis dataKey="core" stroke={isDark ? "#ffffff" : "#000000"} axisLine={false} tick={{ fill: isDark ? '#ffffff' : '#000000' }} />
            <YAxis domain={[0, 100]} hide />
            <Tooltip contentStyle={{ backgroundColor: isDark ? '#111' : '#fff', color: isDark ? '#ffffff' : '#000000', border: `2px solid ${isDark ? '#ffffff' : '#000000'}`, padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value) => `${value.toFixed(1)}%`} />
            <Bar dataKey="load" fill={isDark ? "#ffffff" : "#000000"} radius={[2, 2, 0, 0]} animationDuration={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-1">
        <div>Load: {stats.cpu.load.toFixed(1)}%</div>
        <div>Temp: {stats.cpu.temp ? `${stats.cpu.temp}°C` : 'N/A (may require admin privileges)'}</div>
        {stats.cpu.coreTemps.length > 0 ? (
          <div className="text-sm">
            Core Temps: {stats.cpu.coreTemps.map((temp, index) => (
              temp ? `C${index + 1} ${temp}°C` : `C${index + 1} N/A`
            )).join(', ')}
          </div>
        ) : (
          <div className="text-sm">Core Temps: N/A</div>
        )}
      </div>

    </div>
  );
});

export default CpuCard;