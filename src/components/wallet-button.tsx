import React, { useState } from 'react';
import { Wallet, CheckCircle2 } from 'lucide-react';
import { useWallet } from './wallet-provider';
import { WalletConnectModal } from './wallet-connect-modal';
import { Button } from './button';

interface WalletButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  className = '',
  size = 'md',
}) => {
  const { isConnected, address } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant={isConnected ? 'framed-dark-green' : 'framed-dark-white'}
        size={size}
        onClick={() => setIsModalOpen(true)}
        icon={isConnected ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Wallet className="w-3.5 h-3.5" />}
        className={className}
      >
        {isConnected && address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : 'Connect Wallet'}
      </Button>

      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
