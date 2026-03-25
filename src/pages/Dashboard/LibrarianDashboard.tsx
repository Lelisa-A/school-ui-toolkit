import React, { useMemo } from 'react';
import { 
  BookMarked, 
  RotateCcw, 
  Plus, 
  Search, 
  History, 
  AlertCircle, 
  ArrowUpRight, 
  BookOpen, 
  Zap
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from '../../components/ui/EduCard';
import { EduButton } from '../../components/ui/EduButton';
import { EduBadge } from '../../components/ui/EduBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useSearchStore } from '../../store/useSearchStore';
import { toast } from 'sonner';

const MOCK_INVENTORY = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic Literature', status: 'AVAILABLE', due: '-', student: '-' },
  { id: 2, title: 'Advanced Quantum Physics', author: 'Richard Feynman', category: 'Science', status: 'BORROWED', due: '24 Nov 2023', student: 'Alex T.' },
  { id: 3, title: 'Modern World History', author: 'William J. Duiker', category: 'History', status: 'OVERDUE', due: '12 Nov 2023', student: 'Sarah M.' },
  { id: 4, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', status: 'RESERVED', due: 'Awaiting', student: 'Jim H.' },
];

export const LibrarianDashboard = () => {
  const { query: globalQuery } = useSearchStore();

  const filteredInventory = useMemo(() => {
    return MOCK_INVENTORY.filter(item => 
      item.title.toLowerCase().includes(globalQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(globalQuery.toLowerCase()) ||
      item.student.toLowerCase().includes(globalQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(globalQuery.toLowerCase())
    );
  }, [globalQuery]);

  const handleAction = (action: string) => {
    toast.success(`Library ${action} Initiated`, {
      description: "The resource database node is synchronizing with your request.",
      icon: <BookOpen className="text-indigo-500" />
    });
  };

  return (
    <div className="space-y-12 p-2 lg:p-4 pb-32 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Knowledge <br/><span className="text-indigo-600">Curator.</span></h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.4em] text-[10px]">Resource Management & Digital Archiving Node</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <EduButton 
            permission="library:manage"
            variant="secondary" 
            className="rounded-2xl h-16 px-10 border-slate-200 font-black italic shadow-lg"
            onClick={() => handleAction('Catalog Sync')}
          >
            <RotateCcw size={20} className="mr-3 text-indigo-600" /> SYNC ARCHIVE
          </EduButton>
          <EduButton 
            permission="library:manage"
            variant="primary" 
            className="rounded-2xl h-16 px-10 shadow-2xl font-black italic"
            onClick={() => handleAction('New Entry')}
          >
            <Plus size={20} className="mr-3" /> ADD RESOURCE
          </EduButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Books Issued" value="458" icon={<BookMarked size={24} />} trend={{ value: 8, isPositive: true }} color="indigo" />
        <StatCard title="Overdue Items" value="12" icon={<AlertCircle size={24} />} trend={{ value: 2, isPositive: false }} color="rose" />
        <StatCard title="Reservations" value="24" icon={<History size={24} />} trend={{ value: 15, isPositive: true }} color="blue" />
        <StatCard title="Catalog Health" value="99.4%" icon={<Zap size={24} />} trend={{ value: 0.2, isPositive: true }} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <EduCard className="lg:col-span-8 border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem] overflow-hidden" animate hoverGlow>
          <EduCardHeader className="border-b border-slate-50 bg-slate-50/20 p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <EduCardTitle className="text-3xl font-black italic tracking-tighter">Inventory Flux</EduCardTitle>
              <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Active resource tracking matrix</EduCardDescription>
            </div>
            <div className="flex bg-white/50 p-1.5 rounded-2xl border border-slate-100 backdrop-blur-xl">
               {['All', 'Borrowed', 'Reserved'].map((tab) => (
                 <button key={tab} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", tab === 'All' ? "bg-white text-indigo-600 shadow-xl" : "text-slate-400 hover:text-slate-600")}>
                    {tab}
                 </button>
               ))}
            </div>
          </EduCardHeader>
          <EduCardContent className="p-0">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50/30 border-b border-slate-50">
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Resource Node</th>
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</th>
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Temporal Flow</th>
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      <AnimatePresence mode="popLayout">
                        {filteredInventory.length > 0 ? filteredInventory.map((book, i) => (
                          <motion.tr 
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={book.id} 
                            className="hover:bg-slate-50/50 transition-all group"
                          >
                             <td className="px-10 py-8">
                                <div className="flex items-center gap-6">
                                   <div className="w-12 h-16 bg-slate-100 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-indigo-500 transition-all duration-700 shadow-sm">
                                      <BookOpen size={24} />
                                   </div>
                                   <div>
                                      <p className="text-lg font-black text-slate-900 italic leading-none group-hover:text-indigo-600 transition-colors">{book.title}</p>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{book.author} \u2022 {book.category}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-10 py-8">
                                <EduBadge variant={book.status === 'AVAILABLE' ? 'success' : book.status === 'OVERDUE' ? 'error' : 'indigo'} className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-none">
                                   {book.status}
                                </EduBadge>
                             </td>
                             <td className="px-10 py-8">
                                <div className="space-y-1.5">
                                   <p className="text-sm font-black text-slate-700 italic">{book.due}</p>
                                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{book.student}</p>
                                </div>
                             </td>
                             <td className="px-10 py-8 text-right">
                                <EduButton variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-indigo-50">
                                   <ArrowUpRight size={20} />
                                </EduButton>
                             </td>
                          </motion.tr>
                        )) : (
                          <tr>
                            <td colSpan={4} className="px-10 py-20 text-center">
                              <div className="flex flex-col items-center gap-4">
                                <Search size={48} className="text-slate-100" />
                                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No resources matched the query node</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                   </tbody>
                </table>
             </div>
             <div className="p-10 border-t border-slate-50 bg-slate-50/20 flex justify-center">
                <EduButton variant="ghost" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 tracking-[0.4em] uppercase">VIEW GLOBAL CATALOG</EduButton>
             </div>
          </EduCardContent>
        </EduCard>

        <div className="lg:col-span-4 space-y-10">
           <EduCard className="bg-slate-950 text-white rounded-[3rem] border-none shadow-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md">
                    <History size={32} className="text-indigo-400" />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black italic tracking-tighter">Overdue Alerts</h4>
                    <p className="text-slate-400 text-sm mt-3 font-medium">12 items are currently beyond their temporal return window. Immediate action required.</p>
                 </div>
                 <EduButton variant="glass" className="w-full h-16 rounded-2xl text-[10px] font-black tracking-widest uppercase bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20">SEND RECALL PROTOCOLS</EduButton>
              </div>
           </EduCard>

           <EduCard className="border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem]" animate>
             <EduCardHeader className="border-b border-slate-50 p-10">
               <EduCardTitle className="text-2xl font-black italic tracking-tighter">Recent Uplinks</EduCardTitle>
               <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Live transaction feed</EduCardDescription>
             </EduCardHeader>
             <EduCardContent className="p-10 space-y-8">
               {[
                 { title: 'Book Returned', user: 'Grade 10-A', time: '5m ago', type: 'SUCCESS' },
                 { title: 'New Reservation', user: 'Faculty Node', time: '18m ago', type: 'INFO' },
                 { title: 'Catalog Update', user: 'Science Node', time: '1h ago', type: 'INFO' },
                 { title: 'Fine Generated', user: 'Student #EDU-14', time: '4h ago', type: 'WARNING' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 group cursor-pointer">
                   <div className={cn(
                     "w-4 h-4 rounded-full ring-[6px] shadow-lg transition-all",
                     item.type === 'SUCCESS' ? "bg-emerald-50 ring-emerald-50" : 
                     item.type === 'WARNING' ? "bg-rose-50 ring-rose-50" : "bg-indigo-500 ring-indigo-50"
                   )} />
                   <div className="flex-1">
                     <p className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight italic">{item.title}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.user}</p>
                   </div>
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">{item.time}</span>
                 </div>
               ))}
             </EduCardContent>
           </EduCard>
        </div>
      </div>
    </div>
  );
};