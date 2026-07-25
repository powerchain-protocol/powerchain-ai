import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, Zap, X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { PowerCreditPackage } from '../data/credits';
import { useSolanaPay } from '../hooks/use-solana-pay';

interface CheckoutModalProps {
  isOpen: boolean;
  selectedPackage: PowerCreditPackage | null;
  onClose: () => void;
  onSuccess: (creditsAdded: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  selectedPackage,
  onClose,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'solana' | 'card' | 'pyth'>('solana');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const { createPaymentRequest } = useSolanaPay();

  if (!isOpen || !selectedPackage) return null;

  const solAmount = parseFloat((selectedPackage.priceUsd / 180).toFixed(2));

  const handleCompletePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsProcessing(false);
    setPaid(true);
    setTimeout(() => {
      onSuccess(selectedPackage.credits + selectedPackage.bonusCredits);
      setPaid(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">PowerChain Credit Settlement</h3>
              <p className="text-[10.5px] text-zinc-400">Checkout Card • Solana Pay & Pyth Oracle</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Package Details */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/30 to-zinc-900 border border-emerald-500/20 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">{selectedPackage.name}</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">${selectedPackage.priceUsd} USD</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-300">
            <span>Power Credits Included:</span>
            <span className="font-bold text-amber-400">{selectedPackage.credits.toLocaleString()} PWRC</span>
          </div>
          {selectedPackage.bonusCredits > 0 && (
            <div className="flex items-center justify-between text-[10.5px] text-emerald-400 font-mono">
              <span>Bonus Node Credits:</span>
              <span>+{selectedPackage.bonusCredits.toLocaleString()} PWRC Free</span>
            </div>
          )}
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('solana')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                paymentMethod === 'solana'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span className="text-[10px]">Solana Pay</span>
            </button>

            <button
              onClick={() => setPaymentMethod('pyth')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                paymentMethod === 'pyth'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-[10px]">Pyth Oracle</span>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                paymentMethod === 'card'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-[10px]">Credit Card</span>
            </button>
          </div>
        </div>

        {/* QR Code / Details display */}
        {paymentMethod === 'solana' && (
          <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-center space-y-2">
            <p className="text-xs text-zinc-300">Solana Pay Settlement Address:</p>
            <p className="text-[10px] font-mono text-emerald-400 bg-black/40 py-1.5 px-3 rounded-lg border border-zinc-800 truncate">
              PWRC111111111111111111111111111111111111111
            </p>
            <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Amount: {solAmount} SOL (~${selectedPackage.priceUsd})</span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleCompletePayment}
            disabled={isProcessing || paid}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            {paid ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Payment Confirmed!</span>
              </>
            ) : isProcessing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Processing On-Chain...</span>
              </>
            ) : (
              <>
                <span>Complete Purchase</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
