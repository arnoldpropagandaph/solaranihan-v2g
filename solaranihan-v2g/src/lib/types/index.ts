export interface TricycleState {
    id: string;
    driverName: string;
    avatar: string;
    batteryLevel: number; // 0-100%
    batteryCapacity: number; // kWh
    location: 'terminal' | 'driving' | 'home';
    status: 'idle' | 'charging' | 'discharging' | 'driving';
    chargeRate: number; // kW
    dischargeRate: number; // kW
    walletBalance: {
      peso: number;
      araw: number;
      tala: number;
    };
    dailyEarnings: {
      transport: number;
      v2g: number;
      total: number;
    };
    behaviorPattern: 'early_bird' | 'regular' | 'night_shift';
  }
  
  export interface TerminalStats {
    solarGeneration: number; // kW
    gridPrice: number; // ₱/kWh
    totalBatteryCapacity: number; // kWh
    availableBatteryCapacity: number; // kWh
    gridExported: number; // kWh
    gridImported: number; // kWh
    communityEarnings: number; // ₱
    tokensMinted: number;
    tokensBurned: number;
    carbonAvoided: number; // kg CO2
  }
  
  export interface SimulationState {
    currentTime: Date;
    speed: number; // simulation speed multiplier
    isPlaying: boolean;
    weather: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'storm';
    scenario: string | null;
  }