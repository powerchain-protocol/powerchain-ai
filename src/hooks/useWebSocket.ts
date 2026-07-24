import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketStatus } from '../types';

export function useWebSocket(onMessageReceived?: (data: any) => void) {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    setStatus('connecting');
    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    socket.onopen = () => {
      setStatus('connected');
      console.log('Real-Time WebSocket Gateway connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (onMessageReceived) {
          onMessageReceived(data);
        }
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    };

    socket.onerror = (err) => {
      console.warn('WebSocket error, retrying gracefully...', err);
      setStatus('disconnected');
    };

    socket.onclose = () => {
      setStatus('disconnected');
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, [onMessageReceived]);

  const sendMessage = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
      return true;
    }
    return false;
  }, []);

  return { status, sendMessage };
}
