'use client';

import { Donation } from '@/lib/donationDb';
import { X, User, CreditCard, MapPin, Info, FileText } from 'lucide-react';

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
const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    approved: 'bg-green-100 text-green-700 border border-green-200',
    rejected: 'bg-red-100 text-red-700 border border-red-200',
  };
  const statusColor = statusColors[donation.status] ?? 'bg-gray-100 text-gray-700';

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="bg-teal-800 rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Donation Details</h2>
            <p className="text-teal-300 text-sm font-mono mt-0.5">{donation.referenceNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${statusColor}`}>
              {donation.status}
            </span>
            <button onClick={onClose} className="text-teal-300 hover:text-white transition-colors">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Amount Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">Donation Amount</p>
              <p className="text-3xl font-bold text-teal-800">${donation.amount.toFixed(2)}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">Donation Type</p>
              <p className="text-xl font-bold text-orange-700 capitalize">
                {donation.donationType === 'one-time' ? 'One-Time' : 'Monthly'}
              </p>
            </div>
          </div>

          {/* Donor Info */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-100">
              <User size={15} className="text-teal-600" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Donor Information</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">First Name</p>
                <p className="font-semibold text-gray-800">{donation.firstName || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Last Name</p>
                <p className="font-semibold text-gray-800">{donation.lastName || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="font-semibold text-gray-800">{donation.email || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                <p className="font-semibold text-gray-800">{donation.phone || '—'}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-100">
              <CreditCard size={15} className="text-teal-600" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Payment Information</h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">Card Number</p>
                <p className="font-mono font-bold text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  {donation.cardNumber
                    ? `${donation.cardNumber.slice(0, 4)} **** **** ${donation.cardNumber.slice(-4)}`
                    : 'Not available'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Cardholder Name</p>
                <p className="font-semibold text-gray-800">{donation.cardholderName || '—'}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Expiration</p>
                  <p className="font-semibold text-gray-800">{donation.cardExpiration || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">CVC</p>
                  <p className="font-mono font-bold text-gray-800">{donation.cvc || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-100">
              <MapPin size={15} className="text-teal-600" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Billing Address</h3>
            </div>
            <div className="p-4 text-sm text-gray-700 space-y-0.5">
              <p>{donation.address1 || '—'}</p>
              {donation.address2 && <p>{donation.address2}</p>}
              <p>{donation.city}, {donation.state} {donation.zipCode}</p>
              <p>{donation.country}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-100">
              <Info size={15} className="text-teal-600" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Additional Information</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Purpose</p>
                <p className="font-semibold text-gray-800">{donation.purposeOfDonation || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">How They Found Us</p>
                <p className="font-semibold text-gray-800">{donation.heardAboutUs || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Business Donation</p>
                <p className="font-semibold text-gray-800">{donation.isBusinessDonation ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Wants Updates</p>
                <p className="font-semibold text-gray-800">{donation.wantsUpdates ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Covers Fees</p>
                <p className="font-semibold text-gray-800">{donation.coverTransactionFees ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          {donation.adminNotes && (
            <div className="border border-teal-100 bg-teal-50 rounded-xl overflow-hidden">
              <div className="bg-teal-100 px-4 py-3 flex items-center gap-2 border-b border-teal-100">
                <FileText size={15} className="text-teal-700" />
                <h3 className="text-sm font-bold text-teal-800 uppercase tracking-wide">Admin Notes</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-teal-800">{donation.adminNotes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200 text-sm"
            >
              Close
            </button>
            <div className="flex gap-3">
              {donation.status !== 'approved' && (
                <button
                  onClick={onApprove}
                  className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-colors duration-200 text-sm"
                >
                  Approve
                </button>
              )}
              {donation.status !== 'rejected' && (
                <button
                  onClick={onReject}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors duration-200 text-sm"
                >
                  Reject
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}