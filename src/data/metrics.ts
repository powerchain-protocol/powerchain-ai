export interface InfrastructureMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  category: 'generation' | 'battery' | 'carbon' | 'treasury' | 'grid';
  unit?: string;
  description?: string;
}

export const platformMetrics: InfrastructureMetric[] = [
  {
    id: 'm-1',
    label: 'Total Clean Power Generation',
    value: '18.4 GWh',
    change: '+12.5% vs avg',
    isPositive: true,
    category: 'generation',
    unit: 'GWh',
    description: 'Combined output across 42 solar arrays and 18 wind installations.',
  },
  {
    id: 'm-2',
    label: 'Grid Infrastructure Health',
    value: '99.98%',
    change: '+0.02% vs SLA',
    isPositive: true,
    category: 'grid',
    unit: '%',
    description: 'Sub-station availability and voltage stability index.',
  },
  {
    id: 'm-3',
    label: 'Battery Reserve (BESS-04)',
    value: '88.4 MWh',
    change: 'Nominal',
    isPositive: true,
    category: 'battery',
    unit: 'MWh',
    description: 'Lithium iron phosphate storage online for peak load frequency support.',
  },
  {
    id: 'm-4',
    label: 'Carbon Credits Verified',
    value: '14,280 MT',
    change: '+18.2% YoY',
    isPositive: true,
    category: 'carbon',
    unit: 'MT',
    description: 'Audited carbon offset certificates generated on-chain.',
  },
  {
    id: 'm-5',
    label: 'On-Chain Treasury Balance',
    value: '$14.20M',
    change: 'Healthy Reserve',
    isPositive: true,
    category: 'treasury',
    unit: 'USD',
    description: 'Automated PPA revenue yield settlement reserve.',
  },
];
