'use client';

interface DonationData {
  amount: number;
  isMonthly: boolean;
  coverFees: boolean;
}

interface Props {
  data: DonationData;
  onUpdate: (updates: Partial<DonationData>) => void;
  onNext: () => void;
  onClose: () => void;
}

export function DonationAmount({ data, onUpdate, onNext, onClose }: Props) {
  const presetAmounts = [1, 10, 20, 50, 100, 250, 500, 1000, 2000];

  const getImpactMessage = (amount: number) => {
    if (amount >= 500) return "Sponsors a full community workshop and a year of supplies for 30 girls";
    if (amount >= 50) return "Supplies an entire rural school dorm with hygiene products";
    if (amount >= 15) return "Funds a sustainable reusable kit lasting up to 3 years";
    if (amount >= 5) return "Covers an emergency kit for a refugee camp girl for 2 months";
    return "Buys disposable pads for a girl with nothing";
  };

  const fee = parseFloat((data.amount * 0.029 + 0.30).toFixed(2));

  return (
    <div>
      {/* Header */}
      <div className="bg-teal-700 -mx-8 -mt-8 px-8 py-6 mb-8 rounded-t-lg">
        <h1 className="text-3xl font-bold text-white mb-1">Make a Donation</h1>
        <p className="text-teal-200 text-sm">
          100% of your donation goes directly to girls in need worldwide.
        </p>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          How much would you like to donate?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-teal-700">$</span>
          <input
            type="number"
            value={data.amount || ""}
            onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-4 text-3xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
        {data.amount > 0 && (
          <p className="mt-2 text-sm text-orange-500 font-medium">
            Your gift: {getImpactMessage(data.amount)}
          </p>
        )}
      </div>

      {/* Preset Amounts */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onUpdate({ amount })}
            className={`py-3 px-2 text-sm font-bold rounded-xl transition-all duration-200 ${
              data.amount === amount
                ? "bg-teal-700 text-white shadow-md scale-105"
                : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-teal-400 hover:text-teal-700"
            }`}
          >
            ${amount.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.coverFees}
            onChange={(e) => onUpdate({ coverFees: e.target.checked })}
            className="w-5 h-5 mt-0.5 accent-teal-600 flex-shrink-0"
          />
          <span className="text-sm text-gray-600">
            I would like to help cover the transaction fees of{" "}
            <strong className="text-gray-800">${fee}</strong> for my donation.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.isMonthly}
            onChange={(e) => onUpdate({ isMonthly: e.target.checked })}
            className="w-5 h-5 mt-0.5 accent-teal-600 flex-shrink-0"
          />
          <span className="text-sm text-gray-600">
            Make this a <strong className="text-teal-700">monthly donation</strong>
            {data.isMonthly && (
              <span className="ml-2 bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                2x Impact
              </span>
            )}
          </span>
        </label>
      </div>

      {/* Total */}
      {data.amount > 0 && (
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 flex justify-between items-center">
          <span className="text-sm font-medium text-teal-800">Donation Total</span>
          <span className="text-xl font-bold text-teal-800">
            ${(data.amount + (data.coverFees ? fee : 0)).toFixed(2)}
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onNext}
          disabled={!data.amount || data.amount <= 0}
          className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-full transition-colors duration-200 text-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}