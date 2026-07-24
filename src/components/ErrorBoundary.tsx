import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 text-center m-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Something went wrong</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md">
            The dashboard encountered an unexpected error. This usually happens when an integration fails to load or connection is lost.
          </p>
          <div className="bg-zinc-100 dark:bg-zinc-950 p-4 rounded-lg w-full max-w-md mb-8 overflow-auto text-left border border-zinc-200 dark:border-zinc-800/60">
            <code className="text-xs text-red-500 dark:text-red-400 break-words">
              {this.state.error?.message || 'Unknown application error'}
            </code>
          </div>
          <button
            onClick={() => {
              (this as any).setState({ hasError: false, error: null });
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Interface
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
