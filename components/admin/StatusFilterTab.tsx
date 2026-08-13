'use client';

import { Donation } from '@/lib/donationDb';
import { DonationTable } from './DonationTable';
import { BulkActions } from './BulkActions';
import { useState } from 'react';

interface StatusFilterTabProps {
  donations: Donation[];
  status: 'approved' | 'pending' | 'rejected';
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onBulkApprove: (ids: string[]) => void;
  onBulkReject: (ids: string[]) => void;
}

export function StatusFilterTab({
  donations,
  status,
  onApprove,
  onReject,
  onBulkApprove,
  onBulkReject,
}: StatusFilterTabProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === donations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(donations.map(d => d.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className="space-y-6">
      {selectedIds.length > 0 && (
        <BulkActions
          selectedCount={selectedIds.length}
          onApprove={() => {
            onBulkApprove(selectedIds);
            setSelectedIds([]);
          }}
          onReject={() => {
            onBulkReject(selectedIds);
            setSelectedIds([]);
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          {statusLabel} Donations ({donations.length})
        </h3>

        <DonationTable
          donations={donations}
          selectedIds={selectedIds}
          onToggleSelectAll={toggleSelectAll}
          onToggleSelect={toggleSelect}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </div>
  );
}
