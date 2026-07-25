import { ChatSession, AIAgent, PromptTemplate, ChatSkeleton, ChatSettings, UserProfile } from '../types';

export const currentUser: UserProfile = {
  name: 'John Doe',
  role: 'Enterprise Admin',
  organization: 'PowerChain Grid Systems',
  email: 'john.doe@powerchain.ai',
  isMpcSecure: true,
};

export const defaultChatSettings: ChatSettings = {
  model: 'PowerChain GPT-4o',
  temperature: 0.3,
  responseLength: 'Balanced',
  memory: true,
  webSearch: true,
  dataSources: 'All Sources',
};

export const availableAgents: AIAgent[] = [
  {
    id: 'analyst',
    name: 'Energy Analyst',
    description: 'Analyze energy data',
    icon: 'Zap',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    role: 'Primary Infrastructure Intelligence',
    systemPrompt: 'You are an Energy Analyst specializing in solar, wind, and battery storage telemetry analysis.',
  },
  {
    id: 'carbon',
    name: 'Carbon Manager',
    description: 'Carbon accounting',
    icon: 'Leaf',
    badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    role: 'ESG & Offset Auditor',
    systemPrompt: 'You are a Carbon Accounting Manager focused on Scope 1, 2, and 3 emissions tracking and carbon credit verification.',
  },
  {
    id: 'grid',
    name: 'Grid Optimizer',
    description: 'Optimize grid operations',
    icon: 'Cpu',
    badgeColor: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    role: 'Power Distribution Engineer',
    systemPrompt: 'You are a Grid Optimizer specialized in real-time frequency stabilization, peak shaving, and demand response.',
  },
  {
    id: 'market',
    name: 'Market Predictor',
    description: 'Predict energy markets',
    icon: 'TrendingUp',
    badgeColor: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-600/20',
    role: 'Algorithmic Power Trader',
    systemPrompt: 'You are a Renewable Energy Market Trader focused on PPA price forecasts, spot market arbitrage, and nodal marginal pricing.',
  },
];

export const initialChatSessions: ChatSession[] = [
  {
    id: 'session-1',
    title: 'Energy production analysis',
    date: 'Today, 10:42 AM',
    timestamp: '2026-07-24T10:42:00Z',
    pinned: true,
    agentId: 'analyst',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Show me the energy production summary for all solar farms this month compared to last month.',
        timestamp: '10:42 AM',
        status: 'read',
      },
      {
        id: 'msg-2',
        sender: 'assistant',
        text: "Here's the energy production summary for all solar farms this month compared to last month.",
        timestamp: '10:42 AM',
        agentId: 'analyst',
        kpis: [
          { label: 'Total Production (This Month)', value: '18.64 GWh', change: '12.5% vs last month', isPositive: true },
          { label: 'Total Production (Last Month)', value: '16.56 GWh', change: '', isPositive: true },
          { label: 'Total Revenue (This Month)', value: '$2.48M', change: '9.7% vs last month', isPositive: true },
          { label: 'Avg. Efficiency', value: '94.6%', change: '2.1% vs last month', isPositive: true },
        ],
        chartData: [
          { date: 'May 1', 'This Month': 5, 'Last Month': 2.5 },
          { date: 'May 4', 'This Month': 8, 'Last Month': 4.5 },
          { date: 'May 8', 'This Month': 12, 'Last Month': 7.0 },
          { date: 'May 12', 'This Month': 10, 'Last Month': 6.5 },
          { date: 'May 15', 'This Month': 15, 'Last Month': 9.2 },
          { date: 'May 18', 'This Month': 13, 'Last Month': 11.0 },
          { date: 'May 22', 'This Month': 18, 'Last Month': 12.8 },
          { date: 'May 25', 'This Month': 22, 'Last Month': 17.1 },
          { date: 'May 29', 'This Month': 21, 'Last Month': 16.0 },
        ],
        calloutText: 'Energy production is up 12.5% this month compared to last month. Higher solar irradiance and improved panel efficiency contributed to this increase.',
        actions: ['Breakdown by location', 'Top performing assets', 'Export report'],
      },
    ],
  },
  {
    id: 'session-2',
    title: 'Carbon emission report',
    date: 'Today, 09:15 AM',
    timestamp: '2026-07-24T09:15:00Z',
    pinned: false,
    agentId: 'carbon',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Generate our quarterly Scope 1 and Scope 2 carbon emission offset summary.',
        timestamp: '09:15 AM',
        status: 'read',
      },
      {
        id: 'msg-4',
        sender: 'assistant',
        text: 'Quarterly ESG Carbon Emission Audit generated successfully. Total offset credits verified on-chain equal 14,280 MT CO2e.',
        timestamp: '09:15 AM',
        agentId: 'carbon',
        kpis: [
          { label: 'CO2 Avoided', value: '14,280 MT', change: '+18.2% YoY', isPositive: true },
          { label: 'Net Carbon Footprint', value: '120 MT', change: '-14.5% MoM', isPositive: true },
          { label: 'REC Credits Active', value: '18,500', change: '100% Verified', isPositive: true },
        ],
      },
    ],
  },
  {
    id: 'session-3',
    title: 'Grid optimization scenario',
    date: 'Yesterday, 04:33 PM',
    timestamp: '2026-07-23T16:33:00Z',
    pinned: false,
    agentId: 'grid',
    messages: [],
  },
  {
    id: 'session-4',
    title: 'Smart contract audit',
    date: 'May 28, 11:20 AM',
    timestamp: '2026-05-28T11:20:00Z',
    pinned: false,
    agentId: 'analyst',
    messages: [],
  },
  {
    id: 'session-5',
    title: 'Renewable asset forecast',
    date: 'May 27, 02:18 PM',
    timestamp: '2026-05-27T14:18:00Z',
    pinned: false,
    agentId: 'market',
    messages: [],
  },
];

export const suggestionsList = [
  { id: 's1', text: "Show me today's energy production summary", icon: 'Zap' },
  { id: 's2', text: 'Analyze carbon emissions trend', icon: 'ShieldCheck' },
  { id: 's3', text: 'Compare solar vs wind production', icon: 'Activity' },
  { id: 's4', text: 'Check grid stability status', icon: 'Cpu' },
  { id: 's5', text: 'Generate compliance report', icon: 'FileText' },
];

export const promptTemplatesList: PromptTemplate[] = [
  {
    id: 'pt-1',
    title: 'Energy Production Report',
    description: 'Get detailed energy production report by asset, region or time period.',
    category: 'Analytics',
    prompt: 'Provide a comprehensive energy production report broken down by asset location, weather conditions, and inverter efficiency for the current quarter.',
    icon: 'TrendingUp',
  },
  {
    id: 'pt-2',
    title: 'Carbon Emission Analysis',
    description: 'Analyze carbon emissions and offset calculations.',
    category: 'Reports',
    prompt: 'Analyze our carbon emission trends for Scope 1, Scope 2, and Scope 3, and benchmark our net-zero reduction progress against industry standards.',
    icon: 'Cloud',
  },
  {
    id: 'pt-3',
    title: 'Grid Optimization',
    description: 'Optimize grid load, distribution and storage usage.',
    category: 'Operations',
    prompt: 'Simulate a peak load shedding event on Grid Zone 4, and recommend optimal battery discharge timing to maximize peak shaving revenue.',
    icon: 'Zap',
  },
  {
    id: 'pt-4',
    title: 'Financial Summary',
    description: 'Generate revenue, cost and ROI summary.',
    category: 'Analytics',
    prompt: 'Calculate revenue generation, operating expense, and net ROI for solar vs wind assets over the past 12 months.',
    icon: 'DollarSign',
  },
  {
    id: 'pt-5',
    title: 'Asset Performance',
    description: 'Monitor and compare asset performance metrics.',
    category: 'Operations',
    prompt: 'Identify top 5 performing and bottom 5 performing energy assets this month, along with root-cause diagnostic logs for low-performing nodes.',
    icon: 'PieChart',
  },
];

export const chatSkeletonsList: ChatSkeleton[] = [
  {
    id: 'sk-1',
    title: 'Data Analysis Skeleton',
    description: 'Structured framework for telemetry and numerical energy datasets.',
    defaultPrompt: 'Create a Data Analysis workspace for solar farm telemetry: output KPIs, historical trends, anomaly detection, and recommended actions.',
  },
  {
    id: 'sk-2',
    title: 'Report Generation Skeleton',
    description: 'Executive PDF/Doc structure for stakeholder distribution.',
    defaultPrompt: 'Generate an Executive Energy & Carbon Report outline with executive summary, regional metrics, compliance verification, and forecast modeling.',
  },
  {
    id: 'sk-3',
    title: 'Forecasting Skeleton',
    description: 'Predictive model setup for solar irradiance and energy pricing.',
    defaultPrompt: 'Run a 30-day predictive forecast for solar energy production based on upcoming weather forecasts and degradation parameters.',
  },
  {
    id: 'sk-4',
    title: 'Smart Contract Audit Skeleton',
    description: 'PPA execution logs and automated tariff settlement checks.',
    defaultPrompt: 'Audit Power Purchase Agreement (PPA) smart contracts for automated execution, verifying energy delivery against tariff schedules.',
  },
  {
    id: 'sk-5',
    title: 'Compliance Check Skeleton',
    description: 'Regulatory ESG and NERC grid compliance verification.',
    defaultPrompt: 'Run an automated ESG compliance audit checking NERC grid reliability rules, carbon credit certification, and environmental disclosure specs.',
  },
];
export const availableModels = [
  { name: 'Gemini 3.5 Flash', badge: 'Default', desc: 'Google low-latency 2M context AI', provider: 'google' as const },
  { name: 'Gemini 3.1 Pro Thinking', badge: 'Reasoning', desc: 'Complex grid logic & code synthesis', provider: 'google' as const },
  { name: 'GPT-4o Omnimodal', badge: 'OpenAI', desc: 'High intelligence multi-modal model', provider: 'openai' as const },
  { name: 'Claude 3.5 Sonnet', badge: 'Anthropic', desc: 'Precision code & Anchor smart contracts', provider: 'anthropic' as const },
  { name: 'DeepSeek-R1 CoT', badge: 'DeepSeek', desc: 'Chain-of-thought mathematical proof solver', provider: 'deepseek' as const },
  { name: 'Llama 3.3 70B', badge: 'Meta Open', desc: 'Open-weight sovereign MPC private model', provider: 'meta' as const },
  { name: 'Grok 3 Reasoning', badge: 'xAI', desc: 'Real-time telemetry & macro trend analysis', provider: 'xai' as const },
  { name: 'PowerChain Domain-v2', badge: 'Sovereign', desc: 'Trained on grid & DePIN datasets', provider: 'powerchain' as const },
];
