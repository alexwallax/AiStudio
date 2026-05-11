'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { LayoutDashboard, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-600/40">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nexus CRM</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Enterprise Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">E-mail</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                placeholder="seu@empresa.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Entrar no Sistema
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
