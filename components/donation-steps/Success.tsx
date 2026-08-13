'use client';

import { Donation } from '@/lib/donationDb';

interface SuccessProps {
  donation: Donation;
  onClose: () => void;
}

export function Success({ donation, onClose }: SuccessProps) {
  const downloadReceipt = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      const element = document.getElementById('receipt-content');
      if (!element) return;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${donation.referenceNumber}-receipt.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  return (
    <div className="py-12 px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Donation Successful!</h2>
        <p className="text-gray-600">Thank you for your generous donation</p>
      </div>

      <div id="receipt-content" className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Donation Receipt</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Reference Number:</span>
            <span className="font-bold text-lg text-blue-600">{donation.referenceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Donor Name:</span>
            <span className="font-medium">{donation.firstName} {donation.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span>{donation.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Donation Amount:</span>
            <span className="font-medium">${donation.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Donation Type:</span>
            <span className="capitalize">{donation.donationType === 'one-time' ? 'One-Time' : 'Monthly'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium capitalize">
              {donation.status}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={downloadReceipt}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Download Receipt (PDF)
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
        >
          Close
        </button>
      </div>

      <p className="text-center text-gray-600 text-sm mt-6">
        A confirmation email has been sent to {donation.email}. Your donation will be reviewed by our team.
      </p>
    </div>
  );
}
