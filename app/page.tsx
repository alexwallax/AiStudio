'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Clock,
  MoreVertical,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { useContacts } from '@/hooks/use-contacts';

export default function DashboardPage() {
  const { contacts, loading } = useContacts();

  const stats = [
    { label: 'Contatos Ativos', value: contacts.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Conversão', value: '12.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Leads Qualificados', value: contacts.filter(c => c.status === 'Lead').length.toString(), icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Tempo Médio', value: '4d 2h', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-500 font-medium mt-1">Bem-vindo de volta! Aqui está um resumo do seu Nexus CRM.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
            <Plus size={20} />
            Novo Registro
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} />
                </div>
                <MoreVertical className="text-slate-300 cursor-pointer hover:text-slate-500" size={18} />
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                Recentes Adicionados
                <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Live</span>
              </h2>
              <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                Ver todos
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto">
              {loading ? (
                 <div className="flex items-center justify-center h-full">
                    <Loader2 className="animate-spin text-blue-500" size={32} />
                 </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contato</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.slice(0, 5).map((contact) => (
                      <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50 last:border-0 font-medium">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm`}>
                                {contact.initials}
                              </div>
                              <div>
                                <p className="text-slate-900 text-sm font-bold group-hover:text-blue-600 transition-colors">{contact.name}</p>
                                <p className="text-[11px] text-slate-400 font-semibold">{contact.role} @ {contact.company}</p>
                              </div>
                           </div>
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
                           <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-blue-600">
                             <ChevronRight size={18} />
                           </button>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600/30 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4">Pipeline Analysis</h2>
              <p className="text-slate-400 text-sm font-medium mb-8">Seu desempenho aumentou 24% em relação ao mês anterior.</p>
              <div className="space-y-6">
                {[
                  { label: 'Leads Ativos', proc: 75, color: 'bg-blue-500' },
                  { label: 'Negociações', proc: 42, color: 'bg-purple-500' },
                  { label: 'Fechamentos', proc: 18, color: 'bg-emerald-500' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-300">
                      <span>{item.label}</span>
                      <span>{item.proc}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.proc}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="relative z-10 w-full mt-12 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-colors">
              Gerar Relatório Completo
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Loader2({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
