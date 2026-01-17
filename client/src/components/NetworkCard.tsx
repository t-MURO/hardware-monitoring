import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wifi } from 'lucide-react';
import * as types from '../types.ts';
import { memo, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface NetworkCardProps {
  stats: types.HardwareStats;
  history: types.HardwareStats[];
}

const formatSpeed = (bytes: number) => ((bytes * 8) / 1000000).toFixed(2) + ' Mbits/s';

const NetworkCard = memo(function NetworkCard({ stats, history }: NetworkCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = useMemo(() => history.map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString(),
    upload: h.network.upload,
    download: h.network.download
  })), [history]);

  const uploadData = useMemo(() => data.map(d => ({ time: d.time, upload: d.upload })), [data]);
  const downloadData = useMemo(() => data.map(d => ({ time: d.time, download: d.download })), [data]);

  const cardClasses = isDark 
    ? "bg-black border border-white rounded-lg p-4 text-white shadow-lg shadow-white/20"
    : "bg-white border border-black rounded-lg p-4 text-black shadow-lg shadow-black/20";

  return (
    <div className={cardClasses}>
      <div className="flex items-center mb-4">
        <Wifi className={`w-6 h-6 mr-2 ${isDark ? 'text-white' : 'text-black'}`} />
        <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Network</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Upload</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={uploadData} animationDuration={0}>
               <CartesianGrid stroke={isDark ? "#ffffff" : "#000000"} strokeOpacity={0.2} />
               <XAxis dataKey="time" hide />
               <YAxis stroke={isDark ? "#ffffff" : "#000000"} axisLine={false} tick={{ fill: isDark ? '#ffffff' : '#000000', fontSize: 10 }} />
               <Tooltip contentStyle={{ backgroundColor: isDark ? '#111' : '#fff', color: isDark ? '#ffffff' : '#000000', border: `2px solid ${isDark ? '#ffffff' : '#000000'}`, padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value) => `${((Number(value) * 8) / 1000000).toFixed(2)} Mbits/s`} />
               <Line type="monotone" dataKey="upload" stroke={isDark ? "#ffffff" : "#000000"} strokeWidth={3} dot={false} animationDuration={0} />

            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Download</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={downloadData} animationDuration={0}>
               <CartesianGrid stroke={isDark ? "#ffffff" : "#000000"} strokeOpacity={0.2} />
               <XAxis dataKey="time" hide />
               <YAxis stroke={isDark ? "#ffffff" : "#000000"} axisLine={false} tick={{ fill: isDark ? '#ffffff' : '#000000', fontSize: 10 }} />
               <Tooltip contentStyle={{ backgroundColor: isDark ? '#111' : '#fff', color: isDark ? '#ffffff' : '#000000', border: `2px solid ${isDark ? '#ffffff' : '#000000'}`, padding: '10px', fontSize: '14px', fontFamily: 'monospace' }} formatter={(value) => `${((Number(value) * 8) / 1000000).toFixed(2)} Mbits/s`} />
               <Line type="monotone" dataKey="download" stroke={isDark ? "#cccccc" : "#666666"} strokeWidth={3} dot={false} animationDuration={0} />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={`mt-4 space-y-1 ${isDark ? 'text-white' : 'text-black'}`}>
        <div>Upload: {formatSpeed(stats.network.upload)}</div>
        <div>Download: {formatSpeed(stats.network.download)}</div>
      </div>
    </div>
  );
});

export default NetworkCard;