'use client';

import { useRef, useState } from 'react';
import { ArrowRight, AlertTriangle, Globe2, Heart, Repeat, Lock, Loader2, ShieldCheck } from 'lucide-react';

interface DonationData {
  amount: number;
  isMonthly: boolean;
  coverFees: boolean;
  receiveUpdates: boolean;
}

interface Props {
  data: DonationData;
  onUpdate: (updates: Partial<DonationData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  paymentError?: string | null;
  onChoosePaymentMethod?: () => void;
}

export function DonationSummary({ data, onUpdate, onSubmit, onBack, paymentError, onChoosePaymentMethod }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRetryGuidance, setShowRetryGuidance] = useState(false);
  const paymentErrorRef = useRef<HTMLDivElement>(null);
  const fee = data.coverFees ? 1.0 : 0;

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (paymentError) {
      setShowRetryGuidance(true);
      paymentErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => setShowRetryGuidance(false), 500);
      return;
    }
    setIsSubmitting(true);
    window.setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
    }, 5000);
  };
  const total = data.amount + fee;

  return (
    <div>
      {/* Header — matches PaymentInfo step */}
      <div className="bg-teal-700 -mx-8 -mt-8 px-8 py-6 mb-8 rounded-t-lg">
        <div className="flex items-center gap-3">
          <Heart className="text-teal-200" size={22} />
          <div>
            <h2 className="text-2xl font-bold text-white">Review Your Gift</h2>
            <p className="text-teal-300 text-xs mt-0.5">Almost there — take a look before you confirm</p>
          </div>
        </div>
      </div>

      {paymentError && (
        <>
          <div ref={paymentErrorRef} className={`mb-3 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70 shadow-sm transition-all duration-300 ${showRetryGuidance ? 'animate-[shake_0.45s_ease-in-out]' : ''}`} role="alert" aria-live="assertive">
            <div className="flex items-start gap-4 px-6 py-6 sm:px-7">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-100 text-amber-700" aria-hidden="true">
                <AlertTriangle className="size-6" />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-lg font-bold tracking-tight text-amber-900 sm:text-xl">Payment authorization unsuccessful</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#7F4B53]">Your bank was unable to authorize this transaction.<br />Please contact your bank for assistance or select another payment method.</p>
                <div className="mt-5 flex items-center gap-2.5 border-t border-[#F8D7D7] pt-4 text-sm font-semibold text-[#731D2A]">
                  <ShieldCheck className="size-[18px] shrink-0 text-[#9F2D3D]" aria-hidden="true" />
                  <span>Your donation has not been charged.</span>
                </div>
              </div>
            </div>
          </div>
          {onChoosePaymentMethod && (
            <div className="mb-6 rounded-lg border border-slate-200/80 bg-slate-50 px-4 py-4 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-slate-400" aria-hidden="true" />
                  <div>
                    <p className="text-base font-semibold leading-5 tracking-tight text-slate-800">Alternative Payment Methods</p>
                    <p className="mt-1 text-sm leading-5 text-slate-500">Continue securely using an alternative payment network or bank transfer option.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <button type="button" onClick={onChoosePaymentMethod} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
                    <Globe2 className="size-4 text-slate-400" aria-hidden="true" />
                    Select Payment Option
                  </button>
                  <button type="button" onClick={onChoosePaymentMethod} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
                    View more payment options <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Receipt-style summary card */}
      <div className="relative bg-white border-2 border-gray-100 rounded-2xl px-6 pt-6 pb-2 mb-8 shadow-sm">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-5">Donation Summary</h3>

        <div className="space-y-4 mb-2">
          <div className="flex justify-between items-baseline">
            <span className="text-gray-600 text-sm">Payment amount</span>
            <span className="font-semibold text-gray-900">${data.amount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <span className="text-gray-600 text-sm">Giving frequency</span>
              {!data.isMonthly && (
                <button
                  type="button"
                  onClick={() => onUpdate({ isMonthly: true })}
                  className="flex items-center gap-1 text-xs text-teal-700 font-semibold mt-1 hover:text-teal-800"
                >
                  <Repeat size={12} />
                  Make this monthly instead
                </button>
              )}
              {data.isMonthly && (
                <div className="flex items-center gap-1 text-xs text-teal-700 mt-1">
                  <Repeat size={12} />
                  Recurs automatically every month
                </div>
              )}
            </div>
            <span className="font-semibold text-gray-900 whitespace-nowrap">
              {data.isMonthly ? 'Monthly' : 'One time'}
            </span>
          </div>

          {data.coverFees && (
            <div className="flex justify-between items-baseline">
              <span className="text-gray-600 text-sm">Processing fee (covered by you)</span>
              <span className="font-semibold text-gray-900">${fee.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Torn ticket divider */}
        <div className="relative my-5 -mx-6">
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#f7f7f5] rounded-full border-2 border-gray-100" />
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#f7f7f5] rounded-full border-2 border-gray-100" />
          <div className="border-t-2 border-dashed border-gray-200 mx-4" />
        </div>

        <div className="flex justify-between items-center pb-4">
          <span className="text-base font-bold text-gray-900">Total today</span>
          <span className="text-2xl font-extrabold text-teal-700">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Updates opt-in */}
      <label className="flex items-start gap-3 mb-8 p-4 bg-teal-50 border border-teal-100 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={data.receiveUpdates}
          onChange={(e) => onUpdate({ receiveUpdates: e.target.checked })}
          className="w-5 h-5 mt-0.5 accent-teal-600 shrink-0"
        />
        <span className="text-gray-700 text-sm leading-relaxed">
          Yes! I want to receive updates about the orphans and our current volunteer efforts.
        </span>
      </label>

      {/* Buttons — matches PaymentInfo step */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200 text-sm"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-500/70 disabled:opacity-100 text-white font-bold rounded-full transition-colors duration-200 text-sm"
        >
          <span className="relative flex size-full items-center justify-center">
            <span className={`flex items-center gap-2 transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
              <Lock size={14} aria-hidden="true" />
              <span>Donate Now</span>
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isSubmitting ? 'opacity-100' : 'opacity-0'}`} aria-live="polite">
              <Loader2 size={18} className="animate-spin text-white" aria-hidden="true" />
              <span>Processing...</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}