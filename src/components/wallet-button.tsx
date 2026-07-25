import React, { useState } from 'react';
import { Wallet, CheckCircle2 } from 'lucide-react';
import { useWallet } from './wallet-provider';
import { WalletConnectModal } from './wallet-connect-modal';
import { Button } from './Button';

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
        variant="darkGreen"
        size={size}
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-1.5 ${className}`}
      >
        <Wallet className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">
          {isConnected && address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : 'Connect Wallet'}
        </span>
      </Button>

      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
