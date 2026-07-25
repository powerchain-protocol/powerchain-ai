export interface MemoryCacheEntry {
  key: string;
  value: any;
  timestamp: number;
}

export class AIMemoryStore {
  private static store = new Map<string, any>();

  static get<T>(key: string): T | null {
    return this.store.get(key) || null;
  }

  static set(key: string, value: any): void {
    this.store.set(key, value);
  }

  static clear(): void {
    this.store.clear();
  }
}
