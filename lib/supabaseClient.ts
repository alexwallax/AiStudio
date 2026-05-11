'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  const hasPlaceholder = supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');
  const hasValidUrl = supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co');
  return !hasPlaceholder && hasValidUrl;
};

// Instead of a hard throw at module load which can break the whole app bundle/SSR,
// we log a clear error and use a placeholder to avoid "undefined" errors in createClient
if (!supabaseUrl || !supabaseAnonKey || (supabaseUrl && !supabaseUrl.startsWith('https://'))) {
  console.warn('Supabase not properly configured. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
}

const finalUrl = supabaseUrl && supabaseUrl.startsWith('https://') ? supabaseUrl : 'https://tmp.supabase.co';
const finalKey = supabaseAnonKey || 'tmp';

export const supabase = createClient(finalUrl, finalKey);
