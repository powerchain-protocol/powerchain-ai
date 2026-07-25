import { SavedPrompt } from '../types/prompts';
import { SYSTEM_PROMPT_LIBRARY } from './prompt-library';

export const USER_SAVED_PROMPTS: SavedPrompt[] = [...SYSTEM_PROMPT_LIBRARY];
