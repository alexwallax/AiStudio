'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useContacts, Contact } from '@/hooks/use-contacts';
import ContactModal from '@/components/ContactModal';
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Building2,
  Trash2,
  Edit,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactsPage() {
  const { contacts, loading, deleteContact, addContact, updateContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleSave = async (formData: Omit<Contact, 'id' | 'initials' | 'lastSeen' | 'createdAt'>) => {
    if (selectedContact) {
      await updateContact(selectedContact.id, formData);
    } else {
      await addContact(formData);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contatos</h1>
            <p className="text-slate-500 font-medium">Gerencie sua rede de contatos e leads.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
          >
            <Plus size={20} />
            Novo Contato
          </button>
        </header>

        <ContactModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          contact={selectedContact}
        />

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nome, empresa ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors">
                <Filter size={16} />
                Filtros
              </button>
              <button className="px-4 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors">
                Status
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 className="animate-spin text-blue-500" size={32} />
                <p className="text-sm font-bold uppercase tracking-widest">Carregando contatos...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <Plus size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-slate-900 font-bold">Nenhum contato encontrado</h3>
                  <p className="text-sm">Tente ajustar sua busca ou adicione um novo contato.</p>
                </div>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contato</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Empresa / Cargo</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">E-mail</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {filteredContacts.map((contact) => (
                      <motion.tr 
                        key={contact.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm`}>
                              {contact.initials}
                            </div>
                            <span className="text-sm font-bold text-slate-900">{contact.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                              <Building2 size={12} className="text-slate-400" />
                              {contact.company}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold pl-4.5">{contact.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                            <Mail size={12} className="text-slate-400" />
                            {contact.email}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            contact.status === 'Cliente' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            contact.status === 'Lead' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            'bg-slate-50 text-slate-600 border border-slate-100'
                           }`}>
                             {contact.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(contact)}
                              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-blue-600"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => deleteContact(contact.id)}
                              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
