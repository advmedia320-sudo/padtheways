import { Heart } from 'lucide-react';

interface MonthlyGivingProps {
  onDonate?: () => void;
}

export function MonthlyGiving({ onDonate }: MonthlyGivingProps) {
  return (
    <section className="bg-teal-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow-sm p-6 md:p-8">
          
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-teal-700" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg font-bold text-teal-800 mb-1">
              Become a Monthly Donor — Help Provide Menstrual Care All Year Round
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your monthly donation ensures a reliable supply of sanitary pads for girls and women in need, 
              creating lasting impact through better health, dignity, and access to education.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}