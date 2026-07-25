const cacheMap = new Map<string, { value: any; expiresAt: number }>();

export const CacheManager = {
  get: <T>(key: string): T | null => {
    const item = cacheMap.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      cacheMap.delete(key);
      return null;
    }
    return item.value as T;
  },

  set: (key: string, value: any, ttlMs = 60000) => {
    cacheMap.set(key, { value, expiresAt: Date.now() + ttlMs });
  },

  clear: () => cacheMap.clear(),
};
