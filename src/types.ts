export interface KPIMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface ChartPoint {
  date: string;
  [key: string]: string | number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  kpis?: KPIMetric[];
  chartData?: ChartPoint[];
  calloutText?: string;
  actions?: string[];
  sources?: string[];
  agentId?: string;
  isSaved?: boolean;
  attachments?: { name: string; size: string; type: string; url?: string }[];
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  timestamp: string;
  pinned: boolean;
  archived?: boolean;
  agentId: string;
  messages: ChatMessage[];
  category?: 'Today' | 'Yesterday' | 'Last Week' | 'Older';
  tags?: string[];
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: string;
  badgeColor: string;
  role: string;
  systemPrompt: string;
  capabilities?: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'All' | 'Analytics' | 'Reports' | 'Operations';
  prompt: string;
  icon: string;
}

export interface ChatSkeleton {
  id: string;
  title: string;
  description: string;
  defaultPrompt: string;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  responseLength: 'Compact' | 'Balanced' | 'Detailed';
  memory: boolean;
  webSearch: boolean;
  dataSources: string;
  autoExecuteWorkflows?: boolean;
  webSocketRealtime?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  organization: string;
  email: string;
  avatarUrl?: string;
  isMpcSecure: boolean;
  token?: string;
  mfaEnabled?: boolean;
}

export type WorkspaceTab =
  | 'chat'
  | 'knowledge'
  | 'agents'
  | 'workflows'
  | 'history'
  | 'analytics'
  | 'marketplace'
  | 'developer'
  | 'settings';

export type WebSocketStatus = 'connected' | 'connecting' | 'disconnected';

