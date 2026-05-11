'use client';

import { createClient } from '@supabase/supabase-js';

export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) return false;
  
  const hasPlaceholder = url.toLowerCase().includes('placeholder') || 
                        url.toLowerCase().includes('example') ||
                        key.toLowerCase().includes('placeholder') ||
                        key.toLowerCase().includes('example');
                        
  const isValidUrlFormat = url.startsWith('https://') && url.includes('.supabase.co');
  
  // Stricter check: project URL should be at least ~20 chars (https://xxx.supabase.co)
  return isValidUrlFormat && !hasPlaceholder && url.length > 20;
};

const supabaseUrlValue = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKeyValue = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Use a safe initialization
const isConfigured = isSupabaseConfigured();
const finalUrl = isConfigured && supabaseUrlValue ? supabaseUrlValue : 'https://cjrghcljthckcljthckc.supabase.co'; 
const finalKey = isConfigured && supabaseAnonKeyValue ? supabaseAnonKeyValue : 'no-key-set';

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    persistSession: isConfigured,
    autoRefreshToken: isConfigured,
    detectSessionInUrl: isConfigured,
    storageKey: 'nexus-crm-auth',
  },
  global: {
    headers: { 'x-application-name': 'nexus-crm' },
  },
});
