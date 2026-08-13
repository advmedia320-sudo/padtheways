'use client';

import { Donation } from '@/lib/donationDb';

interface RejectionProps {
  donation: Donation;
  rejectionReason?: string;
  onClose: () => void;
  onRetry: () => void;
}

export function Rejection({ donation, rejectionReason, onClose, onRetry }: RejectionProps) {
  return (
    <div className="py-12 px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Donation Not Approved</h2>
        <p className="text-gray-600">Unfortunately, your donation could not be processed at this time.</p>
      </div>

      <div className="bg-red-50 rounded-lg p-6 mb-6 border border-red-200">
        <h3 className="text-lg font-bold text-red-900 mb-4">Rejection Details</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-red-800">Reference Number:</span>
            <span className="font-mono font-bold text-red-900">{donation.referenceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-800">Amount:</span>
            <span className="font-medium">${donation.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-800">Donor Name:</span>
            <span className="font-medium">{donation.firstName} {donation.lastName}</span>
          </div>
          {rejectionReason && (
            <div className="mt-4 pt-4 border-t border-red-200">
              <p className="text-red-800 font-semibold mb-2">Reason:</p>
              <p className="text-red-900 bg-white rounded p-3">{rejectionReason}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>What's next?</strong> Please review the rejection reason above and try again. If you believe this is an error, please contact our support team.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Try Again
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
        >
          Exit
        </button>
      </div>

      <p className="text-center text-gray-600 text-sm mt-6">
        If you have any questions, please contact our support team.
      </p>
    </div>
  );
}
