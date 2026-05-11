'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Contact, ContactStatus } from '@/hooks/use-contacts';
import { cn } from '@/lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: any) => void;
  onDelete?: (id: string) => void;
  contact?: Contact | null;
}

const COLORS = [
  { name: 'Blue', value: 'blue' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Amber', value: 'amber' },
  { name: 'Purple', value: 'purple' },
  { name: 'Slate', value: 'slate' },
];

const STATUSES: ContactStatus[] = ['Lead', 'Cliente', 'Inativo'];

export function ContactModal({ isOpen, onClose, onSave, onDelete, contact }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    status: 'Lead' as ContactStatus,
    color: 'blue'
  });

  useEffect(() => {
    const syncData = () => {
      if (contact) {
        setFormData({
          name: contact.name,
          company: contact.company,
          role: contact.role,
          email: contact.email,
          status: contact.status,
          color: contact.color
        });
      } else {
        setFormData({
          name: '',
          company: '',
          role: '',
          email: '',
          status: 'Lead',
          color: 'blue'
        });
      }
    };
    syncData();
  }, [contact, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {contact ? 'Editar Contato' : 'Novo Contato'}
                </h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                  {contact ? 'Atualize as informações do cliente' : 'Adicione um novo relacionamento'}
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nome Completo</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                    placeholder="Ex: João Silva"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Empresa</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                    placeholder="Ex: Tech Corp"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Cargo</label>
                  <input
                    required
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                    placeholder="Ex: Gerente"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">E-mail Corporativo</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                    placeholder="joao@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as ContactStatus })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Cor do Avatar</label>
                  <div className="flex gap-2 pt-1">
                    {COLORS.map(c => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: c.value })}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all",
                          formData.color === c.value ? "border-blue-600 scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100",
                          c.value === 'blue' && "bg-blue-500",
                          c.value === 'emerald' && "bg-emerald-500",
                          c.value === 'amber' && "bg-amber-500",
                          c.value === 'purple' && "bg-purple-500",
                          c.value === 'slate' && "bg-slate-500",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {contact && onDelete ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Deseja realmente excluir este contato?')) {
                        onDelete(contact.id);
                        onClose();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm"
                  >
                    <Trash2 size={18} />
                    Excluir
                  </button>
                ) : <div />}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 text-slate-500 hover:text-slate-700 font-bold text-sm transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    <Save size={18} />
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
