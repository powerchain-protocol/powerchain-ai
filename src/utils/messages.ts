import { ChatMessage } from '../types';

export function filterSavedMessages(messages: ChatMessage[]) {
  return messages.filter((m) => m.isSaved);
}
