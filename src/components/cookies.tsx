import React, { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>('Detecting...');

  useEffect(() => {
    const consent = localStorage.getItem('pwrc-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }

    // Fetch IP address for display
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress('Unknown IP'));
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pwrc-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('pwrc-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-5 z-50 animate-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Privacy & Cookies</h3>
        </div>
        <button onClick={handleDecline} className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-xs text-gray-600 dark:text-zinc-400 mb-4 leading-relaxed">
        We use cookies to ensure you get the best experience on the PowerChain network. 
        Your current session IP (<span className="font-mono text-emerald-600 dark:text-emerald-400">{ipAddress}</span>) 
        is temporarily logged for security.
      </p>

      <div className="flex items-center gap-2">
        <button 
          onClick={handleAccept}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Accept All
        </button>
        <button 
          onClick={handleDecline}
          className="flex-1 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 text-xs font-bold py-2 px-4 rounded-lg transition-colors border border-gray-200 dark:border-zinc-700"
        >
          Decline
        </button>
      </div>
    </div>
  );
};
