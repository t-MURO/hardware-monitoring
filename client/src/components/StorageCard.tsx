import { Database } from 'lucide-react';
import * as types from '../types.ts';

interface StorageCardProps {
  stats: types.HardwareStats;
}

const formatBytes = (bytes: number) => (bytes / 1024 ** 3).toFixed(1) + ' GB';

export default function StorageCard({ stats }: StorageCardProps) {
  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 text-green-400 shadow-lg shadow-green-500/20">
      <div className="flex items-center mb-4">
        <Database className="w-6 h-6 mr-2 text-green-300" />
        <h2 className="text-lg font-semibold text-green-300">Storage</h2>
      </div>
      <div className="space-y-4">
        {stats.storage.map((drive, index) => (
          <div key={index}>
            <div className="text-sm font-medium">{drive.drive}</div>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${drive.percent}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {formatBytes(drive.used)} / {formatBytes(drive.total)} ({drive.percent.toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}