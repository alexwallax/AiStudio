'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useAuth } from '@/lib/auth';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Contacts', href: '/contacts', icon: Users },
  { label: 'Timeline', href: '/timeline', icon: Calendar },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
  { label: 'Reports', href: '/reports', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-slate-300 flex flex-col z-50 border-r border-slate-800">
      <div className="p-8 pb-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">Nexus CRM</h1>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Commercial Suite</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 px-4 flex-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Main Menu</p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group text-sm font-semibold",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-2">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 mb-4">
           <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-blue-400" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage Status</p>
           </div>
           <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-blue-500" />
           </div>
           <p className="text-[10px] text-slate-500 mt-2">68% of 2GB used</p>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <Link href="/settings" className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <Settings size={18} />
            Settings
          </Link>
          <Link href="/help" className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <HelpCircle size={18} />
            Help Center
          </Link>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
