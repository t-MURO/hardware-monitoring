export interface HardwareStats {
  cpu: {
    load: number;
    temp: number | null;
    cores: number[];
  };
  gpu: {
    temp: number | null;
    model: string;
    vendor: string;
    vram: number;
  };
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
  };
  timestamp: number;
}