import { Monitor } from 'lucide-react';
import * as types from '../types.ts';

interface GpuCardProps {
  stats: types.HardwareStats;
}

export default function GpuCard({ stats }: GpuCardProps) {
  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 text-green-400 shadow-lg shadow-green-500/20">
      <div className="flex items-center mb-4">
        <Monitor className="w-6 h-6 mr-2 text-green-300" />
        <h2 className="text-lg font-semibold text-green-300">GPU</h2>
      </div>
      <div className="space-y-2">
        <div>Model: {stats.gpu.model}</div>
        <div>Vendor: {stats.gpu.vendor}</div>
        <div>VRAM: {stats.gpu.vram} MB</div>
        <div>Temperature: {stats.gpu.temp ? `${stats.gpu.temp}°C` : 'N/A'}</div>
      </div>
    </div>
  );
}