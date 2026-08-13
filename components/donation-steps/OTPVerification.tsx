'use client';

import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  otpCode: string;
  onVerify: (code: string) => void;
  onResend: () => void;
}

export function OTPVerification({ email, otpCode, onVerify, onResend }: OTPVerificationProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    onVerify(code);
  };

  const handleResend = () => {
    setResendCooldown(30);
    setCode('');
    setError('');
    onResend();
    
    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto py-10 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5">
        <ShieldCheck className="text-teal-700" size={24} />
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm your donation</h2>
      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        We've sent a one-time verification code to your email or phone. Enter it below to continue.
      </p>

      <div className="mb-3 text-left">
        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
          Enter OTP Code
        </label>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          value={code}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, '');
            setCode(digitsOnly);
            setError('');
          }}
          placeholder="000000"
          maxLength={6}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-center text-2xl font-bold tracking-[0.4em]"
        />
      </div>

      <div className="h-5 mb-4 text-left">
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      <div className="text-center mb-8">
        {resendCooldown > 0 ? (
          <p className="text-gray-400 text-sm">Resend code in {resendCooldown}s</p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-teal-700 hover:text-teal-800 text-sm font-semibold"
          >
            Didn&apos;t get it? Resend code
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={code.length < 4}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 px-4 rounded-full transition-colors duration-200 text-sm"
      >
        Confirm donation
      </button>
    </form>
  );
}