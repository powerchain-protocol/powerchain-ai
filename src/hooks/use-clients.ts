import { useState } from 'react';
import { API_CLIENTS_LIST, APIClientConfig } from '../utils/clients';

export function useClients() {
  const [clients, setClients] = useState<APIClientConfig[]>(API_CLIENTS_LIST);

  const refreshClient = (clientId: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.clientId === clientId
          ? { ...c, lastPingMs: Math.floor(Math.random() * 20) + 10, status: 'connected' }
          : c
      )
    );
  };

  return { clients, refreshClient };
}
