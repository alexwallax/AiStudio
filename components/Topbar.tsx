'use client';

import React from 'react';
import { Search, Bell, History, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';

export function Topbar() {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-8 justify-between w-full">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 pr-6 border-r border-slate-100">
           <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95 group">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:animate-pulse" />
          </button>
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95">
            <MessageSquare size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95">
            <History size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">{user?.name || 'Alex Rivera'}</p>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">{user?.email || 'Sales Director'}</p>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/20">
            <Image 
              src="https://picsum.photos/seed/user/200" 
              alt="User" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
