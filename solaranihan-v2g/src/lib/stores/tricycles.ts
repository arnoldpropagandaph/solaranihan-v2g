import { writable } from 'svelte/store';
import type { TricycleState } from '$lib/types';

function createTricyclesStore() {
  const { subscribe, set, update } = writable<TricycleState[]>([]);

  return {
    subscribe,
    updateTricycle: (id: string, updates: Partial<TricycleState>) => 
      update(tricycles => 
        tricycles.map(t => t.id === id ? { ...t, ...updates } : t)
      ),
    setAll: (tricycles: TricycleState[]) => set(tricycles)
  };
}

export const tricycles = createTricyclesStore();