// authStore.ts
import {create} from 'zustand';

// Store for authentication
export type Evaluation = {
  evaluation: number | null;
  setEvaluation: (evaluation: number) => void;
}

export const useEvaluationAmount = create<Evaluation>((set) => ({
    evaluation: 0,
    setEvaluation: (evaluation) => {
    set({ evaluation });
  },
}));
