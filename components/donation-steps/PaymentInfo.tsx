'use client';

import { useState } from 'react';
import { Lock, CreditCard } from 'lucide-react';

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Greece' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KR', name: 'Korea, Republic' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russian Federation' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SZ', name: 'Swaziland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
];

interface DonationData {
  cardNumber: string;
  cvc: string;
  cardholderName: string;
  expiration: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

interface Props {
  data: DonationData;
  onUpdate: (updates: Partial<DonationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PaymentInfo({ data, onUpdate, onNext, onBack }: Props) {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const cardDigits = data.cardNumber.includes('•') ? '' : data.cardNumber.replace(/\D/g, '');
    if (!cardDigits || cardDigits.length < 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!data.cvc || data.cvc.length < 3) newErrors.cvc = 'CVC must be at least 3 digits';
    if (!data.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    const expirationDigits = data.expiration.replace(/\D/g, '');
    if (!expirationDigits || expirationDigits.length < 4) newErrors.expiration = 'Enter MM/YY';
    if (!data.country.trim()) newErrors.country = 'Country is required';
    if (!data.address1.trim()) newErrors.address1 = 'Address is required';
    if (!data.city.trim()) newErrors.city = 'City is required';
    if (!data.state.trim()) newErrors.state = 'State is required';
    if (!data.zip.trim()) newErrors.zip = 'Zip code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateForm()) onNext(); };

  const handleCountrySelect = (countryName: string) => {
    onUpdate({ country: countryName });
    setCountrySearch(countryName);
    setShowCountryDropdown(false);
  };

  const handleCardNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 16) {
      const formatted = digitsOnly.match(/.{1,4}/g)?.join(' ') || '';
      onUpdate({ cardNumber: formatted });
    }
  };

  const handleExpirationChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 4) {
      let formatted = digitsOnly;
      if (digitsOnly.length >= 2) formatted = digitsOnly.slice(0, 2) + ' / ' + digitsOnly.slice(2);
      onUpdate({ expiration: formatted });
    }
  };

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors ${
      field && errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`;

  return (
    <div>
      {/* Header */}
      <div className="bg-teal-700 -mx-8 -mt-8 px-8 py-6 mb-8 rounded-t-lg">
        <div className="flex items-center gap-3">
          <CreditCard className="text-teal-200" size={22} />
          <div>
            <h2 className="text-2xl font-bold text-white">Secure Payment</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Lock size={12} className="text-teal-300" />
              <p className="text-teal-300 text-xs">SSL encrypted — your card details are safe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Card Information</h3>
          <div className="flex gap-1.5">
            {['VISA', 'MC', 'AMEX', 'DISC'].map((card) => (
              <span key={card} className="text-xs bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded border border-gray-200">{card}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {/* Card Number + CVC */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Card Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={data.cardNumber}
                onFocus={() => { if (data.cardNumber.includes('•')) onUpdate({ cardNumber: '' }); }}
                onChange={(e) => { handleCardNumberChange(e.target.value); setErrors({ ...errors, cardNumber: '' }); }}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className={inputClass('cardNumber')}
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">CVC <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={data.cvc}
                onChange={(e) => { onUpdate({ cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }); setErrors({ ...errors, cvc: '' }); }}
                placeholder="123"
                maxLength={4}
                className={inputClass('cvc')}
              />
              {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
            </div>
          </div>

          {/* Cardholder + Expiry */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Cardholder Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={data.cardholderName}
                onChange={(e) => { onUpdate({ cardholderName: e.target.value }); setErrors({ ...errors, cardholderName: '' }); }}
                placeholder="Jane Doe"
                className={inputClass('cardholderName')}
              />
              {errors.cardholderName && <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Expiry <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={data.expiration}
                onChange={(e) => { handleExpirationChange(e.target.value); setErrors({ ...errors, expiration: '' }); }}
                placeholder="MM / YY"
                maxLength={7}
                className={inputClass('expiration')}
              />
              {errors.expiration && <p className="text-red-500 text-xs mt-1">{errors.expiration}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Billing Address</h3>
        <div className="space-y-3">

          {/* Country */}
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Country <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={data.country || countrySearch}
              onChange={(e) => { setCountrySearch(e.target.value); setShowCountryDropdown(true); setErrors({ ...errors, country: '' }); }}
              onFocus={() => setShowCountryDropdown(true)}
              placeholder="Search country..."
              className={inputClass('country')}
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            {showCountryDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl mt-1 max-h-48 overflow-y-auto z-20 shadow-lg">
                {filteredCountries.length > 0 ? filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country.name)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors"
                  >
                    {country.name}
                  </button>
                )) : (
                  <div className="px-4 py-3 text-sm text-gray-400">No countries found</div>
                )}
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Address Line 1 <span className="text-red-500">*</span></label>
            <input type="text" value={data.address1} onChange={(e) => onUpdate({ address1: e.target.value })} placeholder="Street address" className={inputClass('address1')} />
            {errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Address Line 2</label>
            <input type="text" value={data.address2} onChange={(e) => onUpdate({ address2: e.target.value })} placeholder="Apt, suite, etc. (optional)" className={inputClass()} />
          </div>

          {/* City + Zip */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">City <span className="text-red-500">*</span></label>
              <input type="text" value={data.city} onChange={(e) => { onUpdate({ city: e.target.value }); setErrors({ ...errors, city: '' }); }} placeholder="City" className={inputClass('city')} />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Zip / Postal <span className="text-red-500">*</span></label>
              <input type="text" value={data.zip} onChange={(e) => { onUpdate({ zip: e.target.value }); setErrors({ ...errors, zip: '' }); }} placeholder="00000" className={inputClass('zip')} />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">State / Region <span className="text-red-500">*</span></label>
            <input type="text" value={data.state} onChange={(e) => { onUpdate({ state: e.target.value }); setErrors({ ...errors, state: '' }); }} placeholder="State or region" className={inputClass('state')} />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200 text-sm">
          ← Back
        </button>
        <button onClick={handleNext} className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors duration-200 text-sm">
          Review Donation →
        </button>
      </div>
    </div>
  );
}