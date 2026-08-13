'use client';

import { Donation } from '@/lib/donationDb';

interface OverviewTabProps {
  donations: Donation[];
}

export function OverviewTab({ donations }: OverviewTabProps) {
  const totalDonations = donations.length;
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const approvedCount = donations.filter(d => d.status === 'approved').length;
  const pendingCount = donations.filter(d => d.status === 'pending').length;
  const rejectedCount = donations.filter(d => d.status === 'rejected').length;

  const approvalRate = totalDonations > 0 ? (approvedCount / totalDonations * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Donations"
          value={totalDonations.toString()}
          color="blue"
        />
        <StatCard
          title="Total Amount"
          value={`$${totalAmount.toFixed(2)}`}
          color="green"
        />
        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
          color="purple"
        />
        <StatCard
          title="Pending Review"
          value={pendingCount.toString()}
          color="yellow"
        />
      </div>

      {/* Status Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Donation Status Breakdown</h3>
        <div className="space-y-4">
          <StatusBar
            label="Approved"
            count={approvedCount}
            total={totalDonations}
            color="green"
          />
          <StatusBar
            label="Pending"
            count={pendingCount}
            total={totalDonations}
            color="yellow"
          />
          <StatusBar
            label="Rejected"
            count={rejectedCount}
            total={totalDonations}
            color="red"
          />
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Donations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 font-semibold">Reference</th>
                <th className="pb-3 font-semibold">Donor Name</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.slice(0, 10).map((donation) => (
                <tr key={donation.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium text-blue-600">{donation.referenceNumber}</td>
                  <td className="py-3">{donation.firstName} {donation.lastName}</td>
                  <td className="py-3">${donation.amount.toFixed(2)}</td>
                  <td className="py-3">
                    <StatusBadge status={donation.status} />
                  </td>
                  <td className="py-3 text-gray-600">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-lg shadow p-6`}>
      <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const percentage = total > 0 ? (count / total * 100) : 0;
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colorClasses[color as keyof typeof colorClasses]} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
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
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
