'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Building2, Mail, Briefcase, Tag } from 'lucide-react';
import { Contact, ContactStatus } from '@/hooks/use-contacts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Omit<Contact, 'id' | 'initials' | 'lastSeen' | 'createdAt'>) => Promise<Contact | void>;
  contact?: Contact | null;
}

export default function ContactModal({ isOpen, onClose, onSave, contact }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    status: 'Lead' as ContactStatus,
    color: 'blue'
  });

  useEffect(() => {
    if (contact && isOpen) {
      setFormData({
        name: contact.name,
        company: contact.company,
        role: contact.role,
        email: contact.email,
        status: contact.status,
        color: contact.color || 'blue'
      });
    } else if (isOpen) {
      setFormData({
        name: '',
        company: '',
        role: '',
        email: '',
        status: 'Lead',
        color: 'blue'
      });
    }
  }, [contact, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to save contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {contact ? 'Editar Contato' : 'Novo Contato'}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-4">
                {/* Nome */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome Completo</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: João Silva"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:border-blue-500/20 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">E-mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@empresa.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:border-blue-500/20 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Empresa */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Empresa</label>
                    <div className="relative group">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        required
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nome da empresa"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:border-blue-500/20 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Cargo */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Cargo</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        required
                        type="text"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        placeholder="Ex: Diretor"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:border-blue-500/20 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                  <div className="relative group">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as ContactStatus })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:border-blue-500/20 focus:bg-white outline-none appearance-none transition-all"
                    >
                      <option value="Lead">Lead</option>
                      <option value="Cliente">Cliente</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? 'Salvando...' : contact ? 'Atualizar' : 'Criar Contato'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
