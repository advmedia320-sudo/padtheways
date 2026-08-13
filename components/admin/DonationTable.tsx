'use client';

import { useState } from 'react';
import { Donation } from '@/lib/donationDb';
import { DonationDetailModal } from './DonationDetailModal';

interface DonationTableProps {
  donations: Donation[];
  selectedIds: string[];
  onToggleSelectAll: () => void;
  onToggleSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function DonationTable({
  donations,
  selectedIds,
  onToggleSelectAll,
  onToggleSelect,
  onApprove,
  onReject,
}: DonationTableProps) {
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={donations.length > 0 && selectedIds.length === donations.length}
                  onChange={onToggleSelectAll}
                  className="cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Reference</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Donor Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(donation.id)}
                    onChange={() => onToggleSelect(donation.id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => setSelectedDonation(donation)}>
                  {donation.referenceNumber}
                </td>
                <td className="px-4 py-3">{donation.firstName} {donation.lastName}</td>
                <td className="px-4 py-3 text-gray-600">{donation.email}</td>
                <td className="px-4 py-3 font-medium">${donation.amount.toFixed(2)}</td>
                <td className="px-4 py-3 capitalize text-sm">
                  {donation.donationType === 'one-time' ? 'One-Time' : 'Monthly'}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={donation.status} />
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(donation.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {donation.status !== 'approved' && (
                    <button
                      onClick={() => onApprove(donation.id)}
                      className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                  )}
                  {donation.status !== 'rejected' && (
                    <button
                      onClick={() => onReject(donation.id)}
                      className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {donations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No donations found</p>
        </div>
      )}

      {selectedDonation && (
        <DonationDetailModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onApprove={() => {
            onApprove(selectedDonation.id);
            setSelectedDonation(null);
          }}
          onReject={() => {
            onReject(selectedDonation.id);
            setSelectedDonation(null);
          }}
        />
      )}
    </>
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
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
