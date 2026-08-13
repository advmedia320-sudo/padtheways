'use client';

interface BulkActionsProps {
  selectedCount: number;
  onApprove: () => void;
  onReject: () => void;
}

export function BulkActions({ selectedCount, onApprove, onReject }: BulkActionsProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
      <span className="font-medium text-blue-800">
        {selectedCount} donation{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <div className="flex gap-3">
        <button
          onClick={onApprove}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
        >
          Approve All
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
        >
          Reject All
        </button>
      </div>
    </div>
  );
}
