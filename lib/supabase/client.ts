import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Safe to use in client components. RLS policies restrict this key
// to insert-only on donations/admin_notifications — it cannot read,
// update, or delete existing rows.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);