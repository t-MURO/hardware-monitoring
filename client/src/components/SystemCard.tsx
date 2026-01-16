import { Monitor } from 'lucide-react';
import * as types from '../types.ts';

interface SystemCardProps {
  stats: types.HardwareStats;
}

export default function SystemCard({ stats }: SystemCardProps) {
  const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 text-green-400 shadow-lg shadow-green-500/20">
      <div className="flex items-center mb-4">
        <Monitor className="w-6 h-6 mr-2 text-green-300" />
        <h2 className="text-lg font-semibold text-green-300">System</h2>
      </div>
      <div className="space-y-2">
        <div>Platform: {stats.system.platform}</div>
        <div>Release: {stats.system.release}</div>
        <div>Uptime: {formatUptime(stats.system.uptime)}</div>
        <div>Model: {stats.system.model}</div>
      </div>
    </div>
  );
}