import { useState, useCallback } from 'react';
import { SavedPrompt } from '../types/prompts';
import { USER_SAVED_PROMPTS } from '../data/saved-prompts';

export function usePrompts() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>(USER_SAVED_PROMPTS);

  const toggleFavorite = useCallback((id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  }, []);

  const addPrompt = useCallback((newPrompt: Omit<SavedPrompt, 'id' | 'usageCount'>) => {
    const prompt: SavedPrompt = {
      ...newPrompt,
      id: `p_${Date.now()}`,
      usageCount: 0,
    };
    setPrompts((prev) => [prompt, ...prev]);
  }, []);

  return {
    prompts,
    toggleFavorite,
    addPrompt,
  };
}
