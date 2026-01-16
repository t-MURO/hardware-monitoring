import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Cpu } from 'lucide-react';
import * as types from '../types.ts';

interface CpuCardProps {
  stats: types.HardwareStats;
  history: types.HardwareStats[];
}

export default function CpuCard({ stats, history }: CpuCardProps) {
  const data = history.map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString(),
    load: h.cpu.load
  }));

  const coreData = stats.cpu.cores.map((load, index) => ({ core: `C${index + 1}`, load }));

  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 text-green-400 shadow-lg shadow-green-500/20">
      <div className="flex items-center mb-4">
        <Cpu className="w-6 h-6 mr-2 text-green-300" />
        <h2 className="text-lg font-semibold text-green-300">CPU</h2>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data}>
          <CartesianGrid stroke="#00ff00" strokeOpacity={0.2} />
          <XAxis dataKey="time" hide />
          <YAxis domain={[0, 100]} stroke="#00ff00" axisLine={false} tick={false} />
          <Tooltip contentStyle={{ backgroundColor: '#111', color: '#00ff00', border: '2px solid #00ff00', padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value) => `${value}%`} />
          <Area type="monotone" dataKey="load" stroke="#00ff00" fill="#00ff00" fillOpacity={0.3} isAnimationActive />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={80}>
        <BarChart data={coreData}>
          <CartesianGrid stroke="#00ff00" strokeOpacity={0.2} />
          <XAxis dataKey="core" stroke="#00ff00" axisLine={false} />
          <YAxis domain={[0, 100]} hide />
          <Tooltip contentStyle={{ backgroundColor: '#111', color: '#00ff00', border: '2px solid #00ff00', padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value) => `${value}%`} />
          <Bar dataKey="load" fill="#00ff00" isAnimationActive radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-1">
        <div>Load: {stats.cpu.load.toFixed(1)}%</div>
        <div>Temp: {stats.cpu.temp ? `${stats.cpu.temp}°C` : 'N/A (may require admin privileges)'}</div>
      </div>
    </div>
  );
}