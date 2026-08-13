import { Heart, Gift, Target, Users, Zap } from 'lucide-react';

interface DonationOptionsProps {
  onDonate?: () => void;
}

export function DonationOptions({ onDonate }: DonationOptionsProps) {
  const options = [
    {
      title: 'Donate Monthly',
      description: 'Start a recurring donation',
      icon: Heart,
      bg: 'bg-teal-50 hover:bg-teal-100',
      iconColor: 'text-teal-700',
      border: 'border border-teal-100',
    },
    {
      title: 'Donate One Time',
      description: 'Make a single donation',
      icon: Gift,
      bg: 'bg-orange-50 hover:bg-orange-100',
      iconColor: 'text-orange-500',
      border: 'border border-orange-100',
    },
    {
      title: 'Fund an Essential Need',
      description: 'Critical support for girls in need',
      icon: Target,
      bg: 'bg-teal-50 hover:bg-teal-100',
      iconColor: 'text-teal-700',
      border: 'border border-teal-100',
    },
    {
      title: 'Corporate Donation',
      description: 'Leave a lasting legacy',
      icon: Users,
      bg: 'bg-orange-50 hover:bg-orange-100',
      iconColor: 'text-orange-500',
      border: 'border border-orange-100',
    },
    {
      title: 'Donor Advised Funds',
      description: 'Recommend a grant from your DAF',
      icon: Zap,
      bg: 'bg-teal-50 hover:bg-teal-100',
      iconColor: 'text-teal-700',
      border: 'border border-teal-100',
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-base">
            Choose how you would like to make a difference today
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                onClick={onDonate}
                className={`${option.bg} ${option.border} rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md group`}
              >
                <div className={`${option.iconColor} mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
                  {option.title}
                </h3>
                <p className="text-xs text-gray-500 leading-snug">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}