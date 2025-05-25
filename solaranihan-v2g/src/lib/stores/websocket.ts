import { io, type Socket } from 'socket.io-client';
import { tricycles } from './tricycles';
import { energyData } from '$lib/stores/energy';
import { simulation } from './simulation';
import type { TricycleState, TerminalStats } from '$lib/types';

let socket: Socket | null = null;

export function connectWebSocket() {
  socket = io('http://localhost:8000', {
    transports: ['websocket']
  });

  socket.on('simulation_update', (data: {
    tricycles: TricycleState[],
    terminal: TerminalStats,
    time: string
  }) => {
    tricycles.setAll(data.tricycles);
    // Convert TerminalStats to EnergyData
    energyData.update(current => ({
      ...current,
      ...data.terminal,
      timestamp: data.time
    }));
    simulation.updateTime(new Date(data.time));
  });

  socket.on('connect', () => {
    console.log('Connected to simulation server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from simulation server');
  });
}

export function disconnectWebSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}