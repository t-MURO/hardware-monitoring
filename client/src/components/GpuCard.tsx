import { Monitor } from 'lucide-react';
import * as types from '../types.ts';
import { useTheme } from '../contexts/ThemeContext';

interface GpuCardProps {
  stats: types.HardwareStats;
}

export default function GpuCard({ stats }: GpuCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const formatMHz = (value: number | null) => value ? `${value} MHz` : 'N/A';

  return (
    <div className={`${isDark ? "bg-black border-white text-white shadow-white/20" : "bg-white border-black text-black shadow-black/20"} border rounded-lg p-4 shadow-lg`}>
      <div className="flex items-center mb-4">
        <Monitor className={`w-6 h-6 mr-2 ${isDark ? "text-white" : "text-black"}`} />
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>GPU</h2>
      </div>
      <div className="space-y-4">
        {stats.gpu.map((controller, index) => (
          <div key={`${controller.model}-${index}`} className="space-y-2">
            <div className="text-sm font-semibold">GPU {index + 1}</div>
            <div>Model: {controller.model}</div>
            <div>Vendor: {controller.vendor}</div>
            <div>Bus: {controller.bus ?? 'Unknown'}</div>
            <div>VRAM: {controller.vram} MB</div>
            <div>Core Clock: {formatMHz(controller.clockCore)}</div>
            <div>Memory Clock: {formatMHz(controller.clockMemory)}</div>
            <div>Temperature: {controller.temp ? `${controller.temp}°C` : 'N/A'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}