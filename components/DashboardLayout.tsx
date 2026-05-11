'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="text-blue-500 animate-spin" size={40} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-slate-50">
        <Topbar />
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key="page-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
