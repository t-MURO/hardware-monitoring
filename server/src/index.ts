import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as si from 'systeminformation';
import path from 'path';
// @ts-ignore
import { HardwareStats } from '../../shared/types';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

const clientDistPath = path.resolve(__dirname, '../../client/dist');
const clientIndexPath = path.join(clientDistPath, 'index.html');

app.use(express.static(clientDistPath));

app.get('*', (_req, res) => {
  res.sendFile(clientIndexPath);
});

async function getStats(): Promise<HardwareStats> {
  const [cpu, mem, disk, net, os, time, graphics, cpuTemp, cpuInfo] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.osInfo(),
    si.time(),
    si.graphics(),
    si.cpuTemperature(),
    si.cpu()
  ]);

  return {
    cpu: {
      load: cpu.currentLoad,
      temp: cpuTemp.main || null,
      coreTemps: cpuTemp.cores.map((temp) => (temp ? temp : null)),
      cores: cpu.cpus.map(c => c.load)
    },
    gpu: graphics.controllers.map(controller => ({
      temp: controller.temperatureGpu || null,
      model: controller.model || 'Unknown',
      vendor: controller.vendor || 'Unknown',
      vram: controller.vram || 0,
      clockCore: controller.clockCore ?? null,
      clockMemory: controller.clockMemory ?? null,
      bus: controller.bus ?? null
    })),
    memory: {
      total: mem.total,
      used: mem.used,
      free: mem.free,
      swapTotal: mem.swaptotal,
      swapUsed: mem.swapused
    },
    storage: disk.map(d => ({
      drive: d.mount,
      used: d.used,
      total: d.size,
      percent: d.use
    })),
    network: {
      upload: net[0]?.tx_sec || 0,
      download: net[0]?.rx_sec || 0
    },
    system: {
      platform: os.platform,
      release: os.release,
      uptime: time.uptime,
      model: `${os.distro} ${os.codename}`,
      hostname: os.hostname,
      arch: os.arch,
      cpu: cpuInfo.brand,
      memory: mem.total,
      bootTime: null
    },
    timestamp: Date.now()
  };
}

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

setInterval(async () => {
  const stats = await getStats();
  io.emit('stats', stats);
}, 2000);

server.listen(3001, () => {
  console.log('Server running on port 3001');
});