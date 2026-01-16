import { Monitor } from 'lucide-react';
import * as types from '../types.ts';
import { useTheme } from '../contexts/ThemeContext';

interface SystemCardProps {
  stats: types.HardwareStats;
}

export default function SystemCard({ stats }: SystemCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes: number) => `${(bytes / 1024 ** 3).toFixed(1)} GB`;

  const formatBootTime = (bootTime: number) => {
    if (!bootTime) return 'N/A';
    return new Date(bootTime * 1000).toLocaleString();
  };

  return (
    <div className={`${isDark ? "bg-black border-white text-white shadow-white/20" : "bg-white border-black text-black shadow-black/20"} border rounded-lg p-4 shadow-lg`}>
      <div className="flex items-center mb-4">
        <Monitor className={`w-6 h-6 mr-2 ${isDark ? "text-white" : "text-black"}`} />
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>System</h2>
      </div>
      <div className="space-y-2">
        <div>Hostname: {stats.system.hostname}</div>
        <div>Platform: {stats.system.platform}</div>
        <div>Release: {stats.system.release}</div>
        <div>Arch: {stats.system.arch}</div>
        <div>CPU: {stats.system.cpu}</div>
        <div>Memory: {formatBytes(stats.system.memory)}</div>
        <div>Uptime: {formatUptime(stats.system.uptime)}</div>
        <div>Boot Time: {formatBootTime(stats.system.bootTime)}</div>
        <div>Model: {stats.system.model}</div>
      </div>
    </div>
  );
}