import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('donor_feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, message, amount } = body;

  if (typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json(
      { error: 'Message must be at least 10 characters.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('donor_feedback')
    .insert({
      name: typeof name === 'string' ? name.trim() : null,
      message: message.trim(),
      donation_amount: typeof amount === 'number' ? amount : null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}