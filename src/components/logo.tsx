import React from 'react';
import { PowerChainLogo } from '../assets/logo';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'horizontal';
}

export const Logo: React.FC<LogoProps> = (props) => {
  return <PowerChainLogo {...props} />;
};

export default Logo;
