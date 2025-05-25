import { writable, derived } from 'svelte/store';

// Types for energy data
export interface EnergyData {
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

// Types for tricycle data
export interface TricycleData {
  id: string;
  name: string;
  batteryLevel: number;
  batteryCapacity: number;
  status: 'charging' | 'discharging' | 'idle' | 'away' | 'driving';
  location: 'terminal' | 'route' | 'home' | 'driving';
  earnings: number;
  isConnected: boolean;
  driverName: string;
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

// Initial energy data
const initialEnergyData: EnergyData = {
  solarGeneration: 0,
  gridConsumption: 0,
  batteryLevel: 0,
  batteryCapacity: 100,
  availableBatteryCapacity: 50,
  totalBatteryCapacity: 100,
  gridPrice: 0,
  communityTokens: 0,
  communityEarnings: 0,
  tokensMinted: 0,
  tokensBurned: 0,
  timestamp: new Date().toISOString()
};

// Initial tricycles data
const initialTricycles: TricycleData[] = [];

// Create stores
export const energyData = writable<EnergyData>(initialEnergyData);
export const tricycles = writable<TricycleData[]>(initialTricycles);

// Export the terminal stats for use in components
export const terminalStats = derived(energyData, ($energyData) => {
  return {
    solarGeneration: $energyData.solarGeneration,
    gridConsumption: $energyData.gridConsumption,
    batteryLevel: $energyData.batteryLevel,
    batteryCapacity: $energyData.batteryCapacity,
    availableBatteryCapacity: $energyData.availableBatteryCapacity,
    totalBatteryCapacity: $energyData.totalBatteryCapacity,
    gridPrice: $energyData.gridPrice,
    communityTokens: $energyData.communityTokens,
    communityEarnings: $energyData.communityEarnings,
    tokensMinted: $energyData.tokensMinted,
    tokensBurned: $energyData.tokensBurned,
    timestamp: $energyData.timestamp
  };
});

// Historical data for charts
export const solarGenerationHistory = writable<{time: string, value: number}[]>([]);
export const gridPriceHistory = writable<{time: string, value: number}[]>([]);
export const tokenFlowHistory = writable<{time: string, value: number}[]>([]);

// Update energy data
export function updateEnergyData(data: Partial<EnergyData>): void {
  energyData.update(current => ({
    ...current,
    ...data,
    timestamp: new Date().toISOString()
  }));
  
  // Update historical data
  if (data.solarGeneration !== undefined) {
    solarGenerationHistory.update(history => {
      const newHistory = [...history, { time: new Date().toISOString(), value: data.solarGeneration as number }];
      // Keep only the last 24 data points
      return newHistory.slice(-24);
    });
  }
  
  if (data.gridPrice !== undefined) {
    gridPriceHistory.update(history => {
      const newHistory = [...history, { time: new Date().toISOString(), value: data.gridPrice as number }];
      return newHistory.slice(-24);
    });
  }
  
  if (data.communityTokens !== undefined) {
    tokenFlowHistory.update(history => {
      const newHistory = [...history, { time: new Date().toISOString(), value: data.communityTokens as number }];
      return newHistory.slice(-24);
    });
  }
}

// Update tricycle data
export function updateTricycle(id: string, data: Partial<TricycleData>): void {
  tricycles.update(current => {
    const index = current.findIndex(t => t.id === id);
    if (index >= 0) {
      // Update existing tricycle
      const updatedTricycles = [...current];
      updatedTricycles[index] = { ...updatedTricycles[index], ...data };
      return updatedTricycles;
    } else if (data.id) {
      // Add new tricycle
      const newTricycle: TricycleData = {
        id,
        name: data.name || `Tricycle ${id}`,
        batteryLevel: data.batteryLevel || 0,
        batteryCapacity: data.batteryCapacity || 100,
        status: data.status || 'idle',
        location: data.location || 'terminal',
        earnings: data.earnings || 0,
        isConnected: data.isConnected || false,
        driverName: data.driverName || `Driver ${id}`,
        walletBalance: { peso: 0, araw: 0 },
        dailyEarnings: { transport: 0, v2g: 0, total: 0 }
      };
      
      return [...current, newTricycle];
    }
    return current;
  });
}
