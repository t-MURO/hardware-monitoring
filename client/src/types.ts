export interface HardwareStats {
  cpu: {
    load: number;
    temp: number | null;
    coreTemps: Array<number | null>;
    cores: number[];
  };
  gpu: Array<{
    temp: number | null;
    model: string;
    vendor: string;
    vram: number;
    clockCore: number | null;
    clockMemory: number | null;
    bus: string | null;
  }>;
  memory: {
    total: number;
    used: number;
    free: number;
    swapTotal: number;
    swapUsed: number;
  };
  storage: Array<{
    drive: string;
    used: number;
    total: number;
    percent: number;
  }>;
  network: {
    upload: number;
    download: number;
  };
  system: {
    platform: string;
    release: string;
    uptime: number;
    model: string;
    hostname: string;
    arch: string;
    cpu: string;
    memory: number;
    bootTime: number | null;
  };
  timestamp: number;
}