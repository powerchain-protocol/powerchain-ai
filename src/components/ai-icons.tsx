import React from 'react';
import {
  Zap,
  Activity,
  Cpu,
  BarChart3,
  ShieldCheck,
  Globe,
  Database,
  Lock,
  Workflow,
  Sparkles,
  Terminal,
  Scale,
  Leaf,
  Layers,
  BatteryCharging
} from 'lucide-react';

export interface AIIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const AIIcons: React.FC<AIIconProps> = ({
  name,
  className = 'text-emerald-700 dark:text-emerald-400',
  size = 18,
}) => {
  const iconProps = { className, size };

  switch (name.toLowerCase()) {
    case 'zap':
    case 'power':
      return <Zap {...iconProps} />;
    case 'activity':
    case 'telemetry':
      return <Activity {...iconProps} />;
    case 'cpu':
    case 'compute':
      return <Cpu {...iconProps} />;
    case 'chart':
    case 'barchart':
      return <BarChart3 {...iconProps} />;
    case 'shield':
    case 'security':
      return <ShieldCheck {...iconProps} />;
    case 'globe':
    case 'network':
      return <Globe {...iconProps} />;
    case 'database':
    case 'data':
      return <Database {...iconProps} />;
    case 'lock':
    case 'auth':
      return <Lock {...iconProps} />;
    case 'workflow':
    case 'automation':
      return <Workflow {...iconProps} />;
    case 'sparkles':
    case 'ai':
      return <Sparkles {...iconProps} />;
    case 'terminal':
    case 'developer':
      return <Terminal {...iconProps} />;
    case 'carbon':
    case 'leaf':
      return <Leaf {...iconProps} />;
    case 'battery':
    case 'bess':
      return <BatteryCharging {...iconProps} />;
    case 'governance':
    case 'legal':
      return <Scale {...iconProps} />;
    case 'layers':
      return <Layers {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
};
