'use client';

import { X } from 'lucide-react';
import { Donation } from '@/lib/donationDb';

interface DonationDetailModalProps {
  donation: Donation;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function DonationDetailModal({
  donation,
  onClose,
  onApprove,
  onReject,
}: DonationDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Donation Details</h2>
            <p className="text-sm text-gray-500 mt-1">Ref: {donation.referenceNumber}</p>
          </div>

          {/* Status + Amount */}
          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
            <div>
              <p className="text-xs text-gray-500 uppercase">Status</p>
              <StatusBadge status={donation.status} />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Amount</p>
              <p className="text-xl font-bold text-gray-800">${donation.amount.toFixed(2)}</p>
              <p className="text-xs text-gray-500 capitalize">{donation.donationType}</p>
            </div>
          </div>

          {/* Donor Information */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Donor Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Field label="Name" value={`${donation.firstName} ${donation.lastName}`} />
              <Field label="Email" value={donation.email} />
              <Field label="Phone" value={donation.phone} />
              <Field label="Country" value={donation.country} />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Billing Address</h3>
            <p className="text-sm text-gray-800">
              {donation.address1}
              {donation.address2 && `, ${donation.address2}`}
              {donation.city && `, ${donation.city}`}
              {donation.state && `, ${donation.state}`}
              {donation.zipCode && ` ${donation.zipCode}`}
            </p>
          </div>

          {/* Card Details */}
          {(donation.cardNumber || donation.cardLast4) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Card Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Field label="Card Number" value={donation.cardNumber || `****${donation.cardLast4}`} mono />
                {donation.cardholderName && <Field label="Cardholder" value={donation.cardholderName} />}
                {donation.cardExpiration && <Field label="Expiration" value={donation.cardExpiration} />}
                {donation.cvc && <Field label="CVC" value={donation.cvc} mono />}
              </div>
            </div>
          )}

          {/* OTP */}
          {donation.otpCode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">OTP Verification</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Field label="OTP Code" value={donation.otpCode} mono />
                <Field label="Verified" value={donation.otpVerified ? 'Yes' : 'No'} />
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Additional Info</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {donation.purposeOfDonation && (
                <Field label="Purpose" value={donation.purposeOfDonation} />
              )}
              {donation.heardAboutUs && (
                <Field label="Heard About Us" value={donation.heardAboutUs} />
              )}
              <Field label="Covers Fees" value={donation.coverTransactionFees ? 'Yes' : 'No'} />
              <Field label="Business Donation" value={donation.isBusinessDonation ? 'Yes' : 'No'} />
              <Field label="Wants Updates" value={donation.wantsUpdates ? 'Yes' : 'No'} />
              <Field label="Submitted" value={new Date(donation.createdAt).toLocaleString()} />
            </div>
            {donation.adminNotes && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 uppercase">Admin Notes</p>
                <p className="text-sm text-gray-800">{donation.adminNotes}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t">
            {donation.status !== 'approved' && (
              <button
                onClick={onApprove}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Approve Donation
              </button>
            )}
            {donation.status !== 'rejected' && (
              <button
                onClick={onReject}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Reject Donation
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className={`font-medium text-gray-800 ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusClasses = {
    approved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
    processing: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
        statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}