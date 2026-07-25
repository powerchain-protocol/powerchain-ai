import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketStatus } from '../types';

export function useWebSocket(onMessageReceived?: (data: any) => void) {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    setStatus('connecting');

    const worker = new Worker(new URL('../workers/ws.worker.ts', import.meta.url), {
      type: 'module',
    });
    
    workerRef.current = worker;

    worker.onmessage = (event) => {
      const { type, status: newStatus, data } = event.data;
      if (type === 'status') {
        setStatus(newStatus);
        if (newStatus === 'connected') {
          console.log('Real-Time WebSocket Gateway connected via Worker');
        } else if (newStatus === 'disconnected') {
          console.warn('WebSocket disconnected in Worker');
        }
      } else if (type === 'message') {
        if (onMessageReceived) {
          onMessageReceived(data);
        }
      }
    };

    worker.postMessage({
      type: 'connect',
      payload: { url: wsUrl },
    });

    return () => {
      worker.postMessage({ type: 'disconnect' });
      worker.terminate();
    };
  }, [onMessageReceived]);

  const sendMessage = useCallback((data: any) => {
    if (workerRef.current && status === 'connected') {
      workerRef.current.postMessage({
        type: 'send',
        payload: { data },
      });
      return true;
    }
    return false;
  }, [status]);

  return { status, sendMessage };
}
