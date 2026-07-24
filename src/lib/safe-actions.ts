/**
 * Safe action wrappers for API routes and server actions
 * Ensures errors are caught and correctly propagated to the ErrorBoundary or UI
 */

export type ActionState<T> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: string };

export async function safeAction<T>(
  action: () => Promise<T>,
  errorMessage = 'An unexpected error occurred'
): Promise<ActionState<T>> {
  try {
    const data = await action();
    return { isSuccess: true, data };
  } catch (error: any) {
    console.error(`[SafeAction Error]:`, error);
    return {
      isSuccess: false,
      error: error?.message || errorMessage,
    };
  }
}
