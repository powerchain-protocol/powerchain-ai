export interface SyncStatus {
  lastSyncedAt: string;
  isSyncing: boolean;
  pendingTransactionsCount: number;
}

let currentSyncState: SyncStatus = {
  lastSyncedAt: new Date().toISOString(),
  isSyncing: false,
  pendingTransactionsCount: 0,
};

export const SyncManager = {
  getStatus: () => ({ ...currentSyncState }),

  triggerSync: async () => {
    currentSyncState.isSyncing = true;
    await new Promise((res) => setTimeout(res, 800));
    currentSyncState = {
      lastSyncedAt: new Date().toISOString(),
      isSyncing: false,
      pendingTransactionsCount: 0,
    };
    return currentSyncState;
  },
};
