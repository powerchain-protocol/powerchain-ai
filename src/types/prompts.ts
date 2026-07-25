export interface SavedPrompt {
  id: string;
  title: string;
  category: 'grid' | 'carbon' | 'market' | 'oracle' | 'bess';
  promptText: string;
  tags: string[];
  usageCount: number;
  isFavorite: boolean;
}
