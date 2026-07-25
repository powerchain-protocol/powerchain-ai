import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Wifi, ShieldCheck } from 'lucide-react';

export const PwaStatusBadge: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
        <CheckCircle className="w-3 h-3" />
        PowerChain PWA Active
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleInstallClick}
        disabled={!deferredPrompt}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
      >
        <Download className="w-3 h-3" />
        Install PWA App
      </button>
      <span className="text-[10px] text-gray-400 font-medium">Install if needed</span>
    </div>
  );
};
