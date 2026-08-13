'use client';

import { Heart, Repeat, Lock } from 'lucide-react';

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
}

export function DonationSummary({ data, onUpdate, onSubmit, onBack }: Props) {
  const fee = data.coverFees ? 1.0 : 0;
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
          onClick={onSubmit}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors duration-200 text-sm"
        >
          <Lock size={14} />
          Donate Now
        </button>
      </div>
    </div>
  );
}