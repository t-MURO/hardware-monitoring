import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wifi } from 'lucide-react';
import * as types from '../types.ts';

interface NetworkCardProps {
  stats: types.HardwareStats;
  history: types.HardwareStats[];
}

const formatSpeed = (bytes: number) => ((bytes * 8) / 1000000).toFixed(2) + ' Mbits/s';

export default function NetworkCard({ stats, history }: NetworkCardProps) {
  const data = history.map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString(),
    upload: h.network.upload,
    download: h.network.download
  }));

  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 text-green-400 shadow-lg shadow-green-500/20">
      <div className="flex items-center mb-4">
        <Wifi className="w-6 h-6 mr-2 text-green-300" />
        <h2 className="text-lg font-semibold text-green-300">Network</h2>
      </div>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <CartesianGrid stroke="#00ff00" strokeOpacity={0.2} />
          <XAxis dataKey="time" hide />
          <YAxis stroke="#00ff00" axisLine={false} tick={false} />
          <Tooltip contentStyle={{ backgroundColor: '#111', color: '#00ff00', border: '2px solid #00ff00', padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value) => `${((value * 8) / 1000000).toFixed(2)} Mbits/s`} />
          <Line type="monotone" dataKey="upload" stroke="#00ff00" strokeWidth={3} isAnimationActive dot={false} />
          <Line type="monotone" dataKey="download" stroke="#ffff00" strokeWidth={3} isAnimationActive dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-1">
        <div>Upload: {formatSpeed(stats.network.upload)}</div>
        <div>Download: {formatSpeed(stats.network.download)}</div>
      </div>
    </div>
  );
}