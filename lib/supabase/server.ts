import { createClient } from '@supabase/supabase-js';

// SERVER-ONLY. Never import this file from a 'use client' component —
// it uses the secret key, which has full read/write access bypassing RLS.
// Only use inside app/api/**/route.ts files.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});