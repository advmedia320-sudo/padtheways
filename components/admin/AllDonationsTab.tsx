'use client';

import { useState } from 'react';
import { Donation } from '@/lib/donationDb';
import { DonationTable } from './DonationTable';
import { BulkActions } from './BulkActions';

interface AllDonationsTabProps {
  donations: Donation[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onBulkApprove: (ids: string[]) => void;
  onBulkReject: (ids: string[]) => void;
}

export function AllDonationsTab({
  donations,
  onApprove,
  onReject,
  onBulkApprove,
  onBulkReject,
}: AllDonationsTabProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedDonations = [...donations].sort((a, b) => {
    let compareValue = 0;
    
    if (sortBy === 'date') {
      compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'amount') {
      compareValue = a.amount - b.amount;
    } else if (sortBy === 'name') {
      compareValue = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">All Donations ({donations.length})</h3>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'name')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="name">Sort by Name</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <DonationTable
          donations={sortedDonations}
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
