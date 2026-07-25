import { BlinkActionResponse } from '../types/actions';

const savedActionsStore: BlinkActionResponse[] = [];

export function saveActionResponse(action: BlinkActionResponse): void {
  savedActionsStore.push(action);
}

export function getSavedActions(): BlinkActionResponse[] {
  return savedActionsStore;
}
