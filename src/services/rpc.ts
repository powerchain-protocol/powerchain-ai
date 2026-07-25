export interface RpcEndpointConfig {
  id: string;
  network: 'solana' | 'sui' | 'powerchain';
  cluster: string;
  url: string;
  wsUrl?: string;
  latencyMs: number;
  status: 'active' | 'degraded' | 'offline';
  isPrimary: boolean;
}

export const DEFAULT_RPC_ENDPOINTS: RpcEndpointConfig[] = [
  {
    id: 'sol-mainnet-primary',
    network: 'solana',
    cluster: 'mainnet-beta',
    url: 'https://api.mainnet-beta.solana.com',
    wsUrl: 'wss://api.mainnet-beta.solana.com',
    latencyMs: 18.4,
    status: 'active',
    isPrimary: true,
  },
  {
    id: 'sol-pyth-hermes',
    network: 'solana',
    cluster: 'pyth-hermes',
    url: 'https://hermes.pyth.network',
    latencyMs: 12.1,
    status: 'active',
    isPrimary: false,
  },
  {
    id: 'sui-mainnet-primary',
    network: 'sui',
    cluster: 'mainnet',
    url: 'https://fullnode.mainnet.sui.io:443',
    latencyMs: 22.8,
    status: 'active',
    isPrimary: true,
  },
  {
    id: 'powerchain-dePIN-rpc',
    network: 'powerchain',
    cluster: 'sovereign-grid-v1',
    url: 'https://rpc.powerchain.network/v1',
    latencyMs: 8.5,
    status: 'active',
    isPrimary: true,
  },
];

export class RpcService {
  private static endpoints: RpcEndpointConfig[] = [...DEFAULT_RPC_ENDPOINTS];

  public static getEndpoints(): RpcEndpointConfig[] {
    return this.endpoints;
  }

  public static getActiveRpc(network: 'solana' | 'sui' | 'powerchain'): RpcEndpointConfig | undefined {
    return this.endpoints.find((ep) => ep.network === network && ep.isPrimary && ep.status === 'active') ||
      this.endpoints.find((ep) => ep.network === network && ep.status === 'active');
  }

  public static async pingEndpoint(id: string): Promise<number> {
    const ep = this.endpoints.find((e) => e.id === id);
    if (!ep) return 999;
    
    // Simulated low latency ping check
    const newLatency = parseFloat((Math.random() * 10 + 10).toFixed(1));
    ep.latencyMs = newLatency;
    return newLatency;
  }

  public static setPrimaryEndpoint(id: string) {
    const target = this.endpoints.find((e) => e.id === id);
    if (!target) return;
    this.endpoints.forEach((e) => {
      if (e.network === target.network) {
        e.isPrimary = e.id === target.id;
      }
    });
  }
}
