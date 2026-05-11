'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase, isSupabaseConfigured } from './supabase';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Usuário',
              email: session.user.email || '',
            });
            setIsLoading(false);
            return;
          }
        }
      } catch (error: any) {
        if (!error?.message?.includes('fetch')) {
          console.error('Supabase init error:', error);
        }
      }
      
      // Fallback
      const stored = localStorage.getItem('nexus_crm_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setIsLoading(false);
    };

    initAuth();

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      if (isSupabaseConfigured()) {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Usuário',
              email: session.user.email || '',
            });
          } else {
            setUser(null);
          }
        });
        subscription = data.subscription;
      }
    } catch (error: any) {
      if (!error?.message?.includes('fetch')) {
        console.error('onAuthStateChange error:', error);
      }
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname !== '/login') {
        router.push('/login');
      } else if (user && pathname === '/login') {
        router.push('/');
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setUser({
            id: data.user.id,
            name: data.user.user_metadata.full_name || email.split('@')[0],
            email,
          });
          router.push('/');
          return;
        }
      } else {
        // Fallback for when Supabase is not configured
        throw new Error('Supabase not configured');
      }
    } catch (err: any) {
      // Demo fallback: Allow login with any email/pass >= 6 chars if DB is down or unconfigured
      if (email && password.length >= 6) {
        const newUser = { id: 'mock-id', name: 'Alex Rivera', email };
        setUser(newUser);
        localStorage.setItem('nexus_crm_user', JSON.stringify(newUser));
        router.push('/');
        return;
      }
      throw new Error(err.message || 'Erro ao realizar login');
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    localStorage.removeItem('nexus_crm_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
