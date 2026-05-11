'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/auth';

export type ContactStatus = 'Lead' | 'Cliente' | 'Inativo';

export interface Contact {
  id: string;
  user_id?: string;
  name: string;
  initials: string;
  company: string;
  role: string;
  email: string;
  status: ContactStatus;
  lastSeen: string;
  color: string;
  createdAt: string | number;
}

const STORAGE_KEY = 'nexus-crm-contacts';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      if (user && user.id !== 'mock-id' && isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setContacts(data.map(c => ({
            ...c,
            createdAt: c.created_at,
            lastSeen: c.last_seen
          })));
          setLoading(false);
          return;
        }
      }
    } catch (err: any) {
      console.error('Supabase fetch failed:', err.message || err);
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setContacts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse local contacts', e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  const saveToLocal = (newContacts: Contact[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
  };

  const addContact = async (contact: Omit<Contact, 'id' | 'initials' | 'lastSeen' | 'createdAt'>) => {
    const initials = contact.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    try {
      if (user && user.id !== 'mock-id' && isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('contacts')
          .insert([{
            ...contact,
            user_id: user.id,
            initials,
            last_seen: 'Agora mesmo',
            color: contact.color || 'blue'
          }])
          .select()
          .single();

        if (error) throw error;
        
        if (data) {
          const newContact = { ...data, createdAt: data.created_at, lastSeen: data.last_seen };
          setContacts(prev => [newContact, ...prev]);
          return newContact;
        }
      }
    } catch (err: any) {
      console.error('Supabase insert failed:', err.message || err);
    }

    const newContact: Contact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9),
      initials,
      lastSeen: 'Agora mesmo',
      createdAt: new Date().toISOString(),
    };

    setContacts(prev => {
      const updated = [newContact, ...prev];
      saveToLocal(updated);
      return updated;
    });
    return newContact;
  };

  const updateContact = async (id: string, updates: Partial<Omit<Contact, 'id'>>) => {
    const initials = updates.name
      ? updates.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : undefined;

    try {
      if (user && user.id !== 'mock-id' && isSupabaseConfigured()) {
        const { error } = await supabase
          .from('contacts')
          .update({
            ...updates,
            ...(initials ? { initials } : {})
          })
          .eq('id', id);

        if (error) throw error;
      }
    } catch (err: any) {
      console.error('Supabase update failed:', err.message || err);
    }

    setContacts(prev => {
      const updated = prev.map(c => {
        if (c.id === id) {
          const u = { ...c, ...updates };
          if (initials) u.initials = initials;
          return u;
        }
        return c;
      });
      saveToLocal(updated);
      return updated;
    });
  };

  const deleteContact = async (id: string) => {
    try {
      if (user && user.id !== 'mock-id' && isSupabaseConfigured()) {
        const { error } = await supabase
          .from('contacts')
          .delete()
          .eq('id', id);

        if (error) throw error;
      }
    } catch (err: any) {
      console.error('Supabase delete failed:', err.message || err);
    }

    setContacts(prev => {
      const updated = prev.filter(c => c.id !== id);
      saveToLocal(updated);
      return updated;
    });
  };

  return {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    refresh: fetchContacts
  };
}
