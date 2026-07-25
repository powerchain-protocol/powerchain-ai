import React, { useState } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { FeeWalletSolana } from './FeeWalletSolana';

export const SettingsForm: React.FC = () => {
  const [nodeName, setNodeName] = useState('PowerChain Primary Node');
  const [rpcUrl, setRpcUrl] = useState('https://api.mainnet-beta.solana.com');

  return (
    <div className="space-y-4">
      <Input
        label="Grid Node Identifier"
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
      />
      <Input
        label="Solana RPC Endpoint"
        value={rpcUrl}
        onChange={(e) => setRpcUrl(e.target.value)}
      />
      <FeeWalletSolana />
      <Button variant="primary" size="md">
        Save Grid Configuration
      </Button>
    </div>
  );
};
