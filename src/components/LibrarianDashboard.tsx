import React from 'react';
import { 
  Search, 
  Plus, 
  RotateCcw, 
  BookMarked, 
  ShieldCheck, 
  AlertCircle,
  MoreVertical,
  History,
  Book,
  Users,
  Layers,
  Zap,
  ArrowUpRight,
  Database,
  Archive
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from './ui/EduCard';
import { EduButton } from './ui/EduButton';
import { EduBadge } from './ui/EduBadge';
import { StatCard } from './ui/StatCard';
import { motion } from 'framer-motion';
import { useSearchStore } from '../store/useSearchStore';
import { toast } from 'sonner';

const BOOKS_DATA = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic Literature', status: 'AVAILABLE', due: '-', isbn: '978-0743273565' },
  { title: 'Advanced Quantum Physics', author: 'Richard Feynman', category: 'Science', status: 'BORROWED', due: '24 Nov 2023', student: 'Alex T.', isbn: '978-0465036677' },
  { title: 'Modern World History', author: 'William J. Duiker', category: 'History', status: 'OVERDUE', due: '12 Nov 2023', student: 'Sarah M.', isbn: '978-1305951198' },
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', status: 'RESERVED', due: 'Awaiting', isbn: '978-0262033848' },
  { title: 'Design Patterns', author: 'Erich Gamma', category: 'Software Engineering', status: 'AVAILABLE', due: '-', isbn: '978-0201633610' },
  { title: 'The Art of War', author: 'Sun Tzu', category: 'Philosophy', status: 'BORROWED', due: '30 Nov 2023', student: 'James K.', isbn: '978-1590302255' },
];

export function LibrarianDashboard() {
  const { query } = useSearchStore();
  
  const filteredBooks = BOOKS_DATA.filter(book => 
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase()) ||
    book.isbn.toLowerCase().includes(query.toLowerCase()) ||
    book.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (action: string) => {
    toast.success(`Library ${action} Successful`, {
      description: "Database node updated in real-time.",
      icon: <Database className="text-rose-500" />
    });
  };

  return (
    <div className="space-y-12 p-2 lg:p-4 pb-32 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Resource <br/><span className="text-rose-600">Archive.</span></h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.4em] text-[10px]">Institutional Library Governance Node</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <EduButton 
            variant="secondary" 
            className="rounded-2xl h-16 px-10 border-slate-200 font-black italic shadow-lg hover:shadow-2xl transition-all"
            onClick={() => handleAction('Sync')}
          >
            <RotateCcw size={20} className="mr-3 text-rose-600" /> SYNC CATALOG
          </EduButton>
          <EduButton 
            variant="primary" 
            className="rounded-2xl h-16 px-10 shadow-[0_20px_40px_-10px_rgba(225,29,72,0.3)] font-black italic bg-rose-600 hover:bg-rose-700"
            onClick={() => handleAction('New Entry')}
          >
            <Plus size={20} className="mr-3" /> ADD MANUSCRIPT
          </EduButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Total Volume"
          value="42.5k"
          icon={<Archive size={24} />}
          trend={{ value: 1.2, isPositive: true }}
          color="rose"
        />
        <StatCard 
          title="Active Loans"
          value="458"
          icon={<BookMarked size={24} />}
          trend={{ value: 5, isPositive: true }}
          color="indigo"
        />
        <StatCard 
          title="Overdue Nodes"
          value="12"
          icon={<AlertCircle size={24} />}
          trend={{ value: 2, isPositive: false }}
          color="rose"
        />
        <StatCard 
          title="Reservations"
          value="24"
          icon={<History size={24} />}
          trend={{ value: 8, isPositive: true }}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <EduCard className="lg:col-span-12 border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 overflow-hidden rounded-[3rem]">
          <EduCardHeader className="border-b border-slate-50 bg-slate-50/20 p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <EduCardTitle className="text-3xl font-black italic tracking-tighter">Inventory Grid</EduCardTitle>
                  <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Manage scholarly assets and digital licenses</EduCardDescription>
               </div>
               <div className="flex bg-slate-100 p-2 rounded-[1.5rem] border border-slate-200">
                 <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-white text-rose-600 rounded-xl shadow-sm">All Assets</button>
                 <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Borrowed</button>
                 <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Overdue</button>
               </div>
            </div>
          </EduCardHeader>
          <EduCardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Manuscript Details</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Classification</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Temporal Log</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBooks.map((book, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={i} 
                      className="hover:bg-slate-50/80 transition-all group"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-20 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                            <BookMarked className="w-8 h-8 text-rose-500/30" />
                          </div>
                          <div>
                            <p className="text-lg font-black text-slate-900 leading-tight italic">{book.title}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">by {book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <EduBadge variant="secondary" className="bg-slate-100 text-slate-600 rounded-xl h-8 px-4 font-black uppercase tracking-widest text-[9px]">{book.category}</EduBadge>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                           <div className={cn("w-2.5 h-2.5 rounded-full", 
                             book.status === 'AVAILABLE' ? "bg-emerald-500" :
                             book.status === 'BORROWED' ? "bg-indigo-500" :
                             book.status === 'OVERDUE' ? "bg-rose-500 animate-pulse" : "bg-amber-500"
                           )} />
                           <span className={cn("text-[10px] font-black uppercase tracking-widest",
                             book.status === 'AVAILABLE' ? "text-emerald-600" :
                             book.status === 'BORROWED' ? "text-indigo-600" :
                             book.status === 'OVERDUE' ? "text-rose-600" : "text-amber-600"
                           )}>{book.status}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="space-y-1">
                          <p className="text-sm font-black text-slate-900">{book.due}</p>
                          {book.student && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{book.student}</p>}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <EduButton variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all">
                            <RotateCcw size={18} />
                          </EduButton>
                          <EduButton variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all">
                            <MoreVertical size={18} />
                          </EduButton>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredBooks.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-30">
                           <Search size={64} className="text-slate-400" />
                           <p className="text-xl font-black italic text-slate-500 tracking-tighter">No manuscripts found in the grid</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-10 border-t border-slate-50 flex justify-center bg-slate-50/30">
               <EduButton variant="ghost" className="text-[10px] font-black text-slate-400 hover:text-rose-600 tracking-[0.5em] uppercase hover:bg-white h-12">DOWNLOAD FULL LEDGER</EduButton>
            </div>
          </EduCardContent>
        </EduCard>
      </div>
    </div>
  );
}