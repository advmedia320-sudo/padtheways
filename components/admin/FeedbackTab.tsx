import { DonorFeedback } from '@/lib/donationDb';

interface FeedbackTabProps {
  feedback: DonorFeedback[];
}

export function FeedbackTab({ feedback }: FeedbackTabProps) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <h3 className="text-lg font-bold text-gray-800">
        Donor Feedback ({feedback.length})
      </h3>

      {feedback.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No feedback submitted yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {feedback.map((item) => (
            <div key={item.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">
                  {item.name || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-700">{item.message}</p>
              {item.donationAmount && (
                <p className="mt-1 text-xs text-gray-500">
                  Donation: ${item.donationAmount}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}