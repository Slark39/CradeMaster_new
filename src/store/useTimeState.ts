// authStore.ts
import {create} from 'zustand';

// Store for authentication
export type TimeState = {
  time: string | null;
  setTimeState: (time: string) => void;
}

export const useTimeState = create<TimeState>((set) => ({
    time: null,
    setTimeState: (time) => {
    set({ time });
  },
  
}));
