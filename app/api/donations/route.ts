import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET /api/donations — list all donations (admin dashboard)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/donations — create a donation (called from the donor-facing form)
export async function POST(req: NextRequest) {
  const body = await req.json();

  const referenceNumber = `PTW-${new Date().getFullYear()}-${Math.random()
    .toString(36)
    .substr(2, 6)
    .toUpperCase()}`;

  const { data, error } = await supabaseAdmin
    .from('donations')
    .insert({
      reference_number: referenceNumber,
      amount: body.amount,
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      state: body.state,
      zip_code: body.zipCode,
      card_last4: body.cardLast4,
      card_number: body.cardNumber,
      cvc: body.cvc,
      cardholder_name: body.cardholderName,
      card_expiration: body.cardExpiration,
      donation_type: body.donationType,
      purpose_of_donation: body.purposeOfDonation,
      heard_about_us: body.heardAboutUs,
      cover_transaction_fees: body.coverTransactionFees,
      is_business_donation: body.isBusinessDonation,
      wants_updates: body.wantsUpdates,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}