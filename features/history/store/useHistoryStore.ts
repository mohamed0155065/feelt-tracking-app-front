// features/history/stores/useHistoryStore.ts
import { create } from 'zustand';

interface HistoryStoreState {
  selectedStopId: string | null;
  setSelectedStopId: (id: string | null) => void;
}

export const useHistoryStore = create<HistoryStoreState>((set) => ({
  selectedStopId: null,
  setSelectedStopId: (id) => set({ selectedStopId: id }),
}));