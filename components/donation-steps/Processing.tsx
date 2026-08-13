'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface ProcessingProps {
  onComplete: () => void;
}

export function Processing({ onComplete }: ProcessingProps) {
  const [seconds, setSeconds] = useState(60);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const processingMessages = [
    'Verifying your donation details...',
    'Securing your payment information...',
    'Processing your generous contribution...',
    'Confirming your donation...',
    'Preparing your receipt...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + (100 / 60); // Increment progress over 60 seconds
      });
    }, 1000);

    // Cycle through messages every 12 seconds (60 / 5 messages)
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % processingMessages.length);
    }, 12000);

    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete, processingMessages.length]);

  return (
    <div className="py-14 px-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Your Donation</h2>
      <p className="text-gray-500 mb-10 text-sm">Thank you for your generous support!</p>

      {/* Pulsing heart — signature element, ties to the cause instead of a generic spinner */}
      <div className="relative w-24 h-24 mx-auto mb-10 flex items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-200 opacity-60 animate-ping" />
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-teal-100" />
        <Heart className="relative text-teal-700 animate-pulse" size={32} fill="currentColor" />
      </div>

      <div className="w-full max-w-xs mx-auto bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-teal-600 h-2 rounded-full transition-all duration-300 ease-linear"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
          {Math.floor(Math.min(progress, 100))}% complete
        </p>
        <p className="text-3xl font-extrabold text-teal-700 tabular-nums">{seconds}s</p>
        <p className="text-xs text-gray-400 min-h-5 transition-opacity duration-500">
          {processingMessages[messageIndex]}
        </p>
      </div>
    </div>
  );
}