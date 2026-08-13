'use client';

import { useState } from 'react';
import { Donation, donationDb } from '@/lib/donationDb';
import { DonationTable } from './DonationTable';

interface SearchTabProps {
  donations: Donation[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onBulkApprove: (ids: string[]) => void;
  onBulkReject: (ids: string[]) => void;
}

export function SearchTab({
  donations,
  onApprove,
  onReject,
  onBulkApprove,
  onBulkReject,
}: SearchTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const searchResults = searchQuery.trim() ? donationDb.searchDonations(searchQuery) : [];

  const toggleSelectAll = () => {
    if (selectedIds.length === searchResults.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(searchResults.map(d => d.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search Donations</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedIds([]);
          }}
          placeholder="Search by reference number, donor name, or email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {searchQuery.trim() && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Search Results ({searchResults.length})
          </h3>

          {searchResults.length > 0 ? (
            <DonationTable
              donations={searchResults}
              selectedIds={selectedIds}
              onToggleSelectAll={toggleSelectAll}
              onToggleSelect={toggleSelect}
              onApprove={onApprove}
              onReject={onReject}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No donations found matching your search</p>
            </div>
          )}
        </div>
      )}

      {!searchQuery.trim() && (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
          <p>Enter a search term to find donations</p>
          <p className="text-sm mt-2">Search by reference number, donor name, or email address</p>
        </div>
      )}
    </div>
  );
}
