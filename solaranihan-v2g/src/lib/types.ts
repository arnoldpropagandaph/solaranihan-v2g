// Tricycle state types
export interface TricycleState {
  id: string;
  name: string;
  batteryLevel: number;
  batteryCapacity: number;
  status: 'charging' | 'discharging' | 'idle' | 'away' | 'driving';
  location: 'terminal' | 'route' | 'home' | 'driving';
  earnings: number;
  isConnected: boolean;
  driverName: string;
  avatar?: string;
  chargeRate?: number;
  dischargeRate?: number;
  walletBalance: {
    peso: number;
    araw: number;
  };
  dailyEarnings: {
    transport: number;
    v2g: number;
    total: number;
  };
}

// Terminal statistics
export interface TerminalStats {
  solarGeneration: number;
  gridConsumption: number;
  batteryLevel: number;
  batteryCapacity: number;
  availableBatteryCapacity: number;
  totalBatteryCapacity: number;
  gridPrice: number;
  communityTokens: number;
  communityEarnings: number;
  tokensMinted: number;
  tokensBurned: number;
  timestamp: string;
}

// Simulation time controls
export interface SimulationTime {
  current: Date;
  speed: number;
  paused: boolean;
}

// Simulation state
export interface SimulationState {
  currentTime: Date;
  speed: number;
  isPlaying: boolean;
  weather: 'sunny' | 'cloudy' | 'rainy';
  scenario: string | null;
}

// Chart data point
export interface DataPoint {
  time: string;
  value: number;
}
