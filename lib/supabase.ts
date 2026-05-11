'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) return false;
  
  const hasPlaceholder = url.includes('placeholder') || 
                        url.includes('example.com') || 
                        key.includes('placeholder') ||
                        key.includes('example');
                        
  const isValidFormat = url.startsWith('https://') && url.includes('.supabase.co');
  
  return isValidFormat && !hasPlaceholder && url.length > 30;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
