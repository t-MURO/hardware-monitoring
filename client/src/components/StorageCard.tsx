import { Database } from 'lucide-react';
import * as types from '../types.ts';
import { useTheme } from '../contexts/ThemeContext';

interface StorageCardProps {
  stats: types.HardwareStats;
}

const formatBytes = (bytes: number) => (bytes / 1024 ** 3).toFixed(1) + ' GB';

export default function StorageCard({ stats }: StorageCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={`${isDark ? "bg-black border-white text-white shadow-white/20" : "bg-white border-black text-black shadow-black/20"} border rounded-lg p-4 shadow-lg`}>
      <div className="flex items-center mb-4">
        <Database className={`w-6 h-6 mr-2 ${isDark ? "text-white" : "text-black"}`} />
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>Storage</h2>
      </div>
      <div className="space-y-4">
        {stats.storage.map((drive, index) => (
          <div key={index}>
            <div className="text-sm font-medium">{drive.drive}</div>
            <div className={`w-full ${isDark ? "bg-gray-600" : "bg-gray-300"} rounded-full h-2.5 mt-1`}>
              <div
                className={`${isDark ? "bg-white" : "bg-black"} h-2.5 rounded-full`}
                style={{ width: `${drive.percent}%` }}
              ></div>
            </div>
            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
              {formatBytes(drive.used)} / {formatBytes(drive.total)} ({drive.percent.toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}