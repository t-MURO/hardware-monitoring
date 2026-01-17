import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as types from '../types.ts';

const socketUrl = import.meta.env.VITE_SOCKET_URL ?? (import.meta.env.DEV ? 'http://localhost:12332' : undefined);
const socket = socketUrl ? io(socketUrl) : io();

export function useHardwareStats() {
  const [stats, setStats] = useState<types.HardwareStats | null>(null);
  const [history, setHistory] = useState<types.HardwareStats[]>([]);

  useEffect(() => {
    socket.on('stats', (data: types.HardwareStats) => {
      setStats(data);
      setHistory(prev => {
        const newHistory = [...prev, data];
        return newHistory.slice(-30);
      });
    });

    return () => {
      socket.off('stats');
    };
  }, []);

  return { stats, history };
}