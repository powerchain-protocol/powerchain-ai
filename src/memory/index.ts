export interface VectorMemoryEntry {
  id: string;
  topic: string;
  summary: string;
  importance: 'low' | 'medium' | 'high';
  timestamp: string;
}

const memoryStore: VectorMemoryEntry[] = [
  {
    id: 'mem-01',
    topic: 'Grid Discharge Threshold',
    summary: 'Configured BESS-04 battery discharge floor at 20% state of charge for emergency frequency reserves.',
    importance: 'high',
    timestamp: new Date().toISOString(),
  },
];

export const MemoryManager = {
  getEntries: () => memoryStore,
  addEntry: (entry: Omit<VectorMemoryEntry, 'id' | 'timestamp'>) => {
    const item: VectorMemoryEntry = { ...entry, id: `mem_${Date.now()}`, timestamp: new Date().toISOString() };
    memoryStore.unshift(item);
    return item;
  },
};
