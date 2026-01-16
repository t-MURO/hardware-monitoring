import { useHardwareStats } from '../hooks/useHardwareStats';
import CpuCard from './CpuCard';
import GpuCard from './GpuCard';
import MemoryCard from './MemoryCard';
import StorageCard from './StorageCard';
import NetworkCard from './NetworkCard';
import SystemCard from './SystemCard';

export default function Dashboard() {
  const { stats, history } = useHardwareStats();

  if (!stats) return <div className="flex items-center justify-center h-screen bg-black text-green-400 font-mono">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Hardware Monitor</h1>
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