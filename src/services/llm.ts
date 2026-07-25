import { buildPowerAISystemPrompt } from '../utils/llm';

export const LLMService = {
  getSystemPrompt: buildPowerAISystemPrompt,
};
