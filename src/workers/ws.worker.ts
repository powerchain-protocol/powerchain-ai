let socket: WebSocket | null = null;
let keepAliveInterval: any = null;
let reconnectTimeout: any = null;

const connect = (wsUrl: string) => {
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    self.postMessage({ type: 'status', status: 'connected' });
    keepAliveInterval = setInterval(() => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      self.postMessage({ type: 'message', data });
    } catch (e) {
      self.postMessage({ type: 'error', error: 'Failed to parse WebSocket message' });
    }
  };

  socket.onerror = () => {
    self.postMessage({ type: 'status', status: 'disconnected' });
  };

  socket.onclose = () => {
    self.postMessage({ type: 'status', status: 'disconnected' });
    clearInterval(keepAliveInterval);
    // Reconnect logic
    reconnectTimeout = setTimeout(() => {
      connect(wsUrl);
    }, 5000);
  };
};

self.onmessage = (event) => {
  const { type, payload } = event.data;
  
  if (type === 'connect') {
    connect(payload.url);
  } else if (type === 'send') {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload.data));
    }
  } else if (type === 'disconnect') {
    if (socket) {
      clearTimeout(reconnectTimeout);
      clearInterval(keepAliveInterval);
      socket.close();
      socket = null;
    }
  }
};
