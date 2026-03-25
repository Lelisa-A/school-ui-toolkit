import React, { useEffect, useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EduCard } from '../components/ui/EduCard';
import { EduButton } from '../components/ui/EduButton';
import { EduBadge } from '../components/ui/EduBadge';
import { Plus, BookOpen, Clock, CheckCircle2, AlertCircle, FileText, Trash2 } from 'lucide-react';
import { Assignment } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const Assignments: React.FC = () => {
  const { data, loading, fetchData, remove } = useCrud<Assignment>('assignments');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SUBMITTED' | 'GRADED'>('ALL');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter(a => filter === 'ALL' || a.status === filter);

  const statusColors = {
    'PENDING': 'warning',
    'SUBMITTED': 'primary',
    'GRADED': 'success'
  } as const;

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Academic Assignments</h1>
          <p className="text-slate-500 font-semibold mt-1">Coursework management, submission tracking, and deadlines.</p>
        </div>
        <EduButton 
          variant="primary" 
          className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20"
          onClick={() => {}}
        >
          <Plus className="mr-2 h-5 w-5" /> Create Assignment
        </EduButton>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
         {(['ALL', 'PENDING', 'SUBMITTED', 'GRADED'] as const).map(tab => (
            <button
               key={tab}
               onClick={() => setFilter(tab)}
               className={`px-8 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === tab 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-white text-slate-500 border-2 border-slate-100 hover:border-slate-200'
               }`}
            >
               {tab}
            </button>
         ))}
      </div>

      {loading && !data.length ? (
        <LoadingSpinner label="Collecting Submissions..." className="h-64" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((assign, i) => (
              <motion.div
                key={assign.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <EduCard className="p-6 border-none shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group border-b-4 border-b-indigo-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-slate-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-500">
                       <FileText size={24} />
                    </div>
                    <EduBadge variant={statusColors[assign.status]} className="font-black uppercase tracking-widest text-[9px] px-3 py-1">
                       {assign.status}
                    </EduBadge>
                  </div>

                  <div className="space-y-4">
                    <div>
                       <h3 className="text-lg font-black text-slate-900 tracking-tight line-clamp-1">{assign.title}</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                          <BookOpen size={12} /> {assign.subject}
                       </p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                       <div className="flex items-center gap-2">
                          <Clock size={14} className="text-slate-400" />
                          <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">Due {assign.dueDate}</span>
                       </div>
                       <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
                          ))}
                       </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                       <EduButton 
                         variant="primary" 
                         size="sm" 
                         className="flex-1 rounded-xl h-10 font-black uppercase tracking-widest text-[10px]"
                       >
                          View Details
                       </EduButton>
                       <EduButton 
                         variant="outline" 
                         size="icon" 
                         className="h-10 w-10 rounded-xl border-2 border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100"
                         onClick={() => remove(assign.id)}
                       >
                          <Trash2 size={16} />
                       </EduButton>
                    </div>
                  </div>
                </EduCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};