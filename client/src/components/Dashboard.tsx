import { useHardwareStats } from '../hooks/useHardwareStats';
import CpuCard from './CpuCard';
import GpuCard from './GpuCard';
import MemoryCard from './MemoryCard';
import StorageCard from './StorageCard';
import NetworkCard from './NetworkCard';
import SystemCard from './SystemCard';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export default function Dashboard() {
  const { stats, history } = useHardwareStats();
  const { theme } = useTheme();

  if (!stats) return <div className="flex items-center justify-center h-screen bg-black text-white font-mono">Loading...</div>;

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black' : 'bg-white';
  const textClass = isDark ? 'text-white' : 'text-black';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-4 font-mono`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hardware Monitor</h1>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CpuCard stats={stats} history={history} />
        <GpuCard stats={stats} />
        <MemoryCard stats={stats} />
        <StorageCard stats={stats} />
        <NetworkCard stats={stats} history={history} />
        <SystemCard stats={stats} />
      </div>
    </div>
  );
}