'use client';

import { useState } from 'react';

interface DonationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  purpose: string;
  howHeard: string;
  learnedAbout: string;
  businessDonation: boolean;
}

interface Props {
  data: DonationData;
  onUpdate: (updates: Partial<DonationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DonorInfo({ data, onUpdate, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isPhoneValid = (phone: string) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isPhoneValid(data.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!data.howHeard) {
      newErrors.howHeard = 'Please select how you heard about us';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) onNext();
  };

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors ${
      field && errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`;

  return (
    <div>
      {/* Header */}
      <div className="bg-teal-700 -mx-8 -mt-8 px-8 py-6 mb-8 rounded-t-lg">
        <h2 className="text-3xl font-bold text-white mb-1">Who is giving today?</h2>
        <p className="text-teal-200 text-sm">Tell us a little about yourself so we can send your receipt.</p>
      </div>

      <div className="space-y-4 mb-6">

        {/* Name Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">First Name</label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="Jane"
              className={inputClass()}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Last Name</label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder="Doe"
              className={inputClass()}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Email Address</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="jane@example.com"
            className={inputClass()}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => { onUpdate({ phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
            placeholder="+1234567890"
            className={inputClass('phone')}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Purpose of Donation (optional)</label>
          <input
            type="text"
            value={data.purpose}
            onChange={(e) => onUpdate({ purpose: e.target.value })}
            placeholder="e.g. In memory of someone special"
            className={inputClass()}
          />
        </div>

        {/* How Heard */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            How did you hear about us? <span className="text-red-500">*</span>
          </label>
          <select
            value={data.howHeard}
            onChange={(e) => { onUpdate({ howHeard: e.target.value }); setErrors({ ...errors, howHeard: '' }); }}
            className={inputClass('howHeard')}
          >
            <option value="">Select an option</option>
            <option>Social Media</option>
            <option>Facebook</option>
            <option>Google Search</option>
            <option>Friend / Family</option>
            <option>News Article</option>
            <option>Other</option>
          </select>
          {errors.howHeard && <p className="text-red-500 text-xs mt-1">{errors.howHeard}</p>}
        </div>

        {/* Learned About */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Tell us more (optional)</label>
          <textarea
            value={data.learnedAbout}
            onChange={(e) => onUpdate({ learnedAbout: e.target.value })}
            placeholder="Share how you learned about Pad The Way..."
            className={`${inputClass()} h-20 resize-none`}
          />
        </div>

        {/* Business Donation */}
        <label className="flex items-center gap-3 cursor-pointer bg-gray-50 rounded-xl p-4 border border-gray-100">
          <input
            type="checkbox"
            checked={data.businessDonation}
            onChange={(e) => onUpdate({ businessDonation: e.target.checked })}
            className="w-5 h-5 accent-teal-600 flex-shrink-0"
          />
          <span className="text-sm text-gray-700 font-medium">This is a business / corporate donation</span>
        </label>

      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200 text-sm"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors duration-200 text-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}