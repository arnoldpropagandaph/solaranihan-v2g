import { writable, derived, type Readable } from 'svelte/store';
import type { SimulationState } from '$lib/types';

function createSimulationStore() {
  const { subscribe, update } = writable<SimulationState>({
    currentTime: new Date(2025, 4, 25, 5, 0),
    speed: 60,
    isPlaying: false,
    weather: 'sunny',
    scenario: null
  });

  return {
    subscribe,
    play: () => update(state => ({ ...state, isPlaying: true })),
    pause: () => update(state => ({ ...state, isPlaying: false })),
    setSpeed: (speed: number) => update(state => ({ ...state, speed })),
    setScenario: (scenario: string) => update(state => ({ ...state, scenario })),
    updateTime: (time: Date) => update(state => ({ ...state, currentTime: time }))
  };
}

export const simulation = createSimulationStore();

// Derived store for formatted time
export const formattedTime: Readable<string> = derived(
  simulation,
  $simulation => {
    const hours = $simulation.currentTime.getHours().toString().padStart(2, '0');
    const minutes = $simulation.currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
);