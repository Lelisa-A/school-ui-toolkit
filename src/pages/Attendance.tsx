import React, { useEffect, useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EduCard } from '../components/ui/EduCard';
import { EduButton } from '../components/ui/EduButton';
import { EduBadge } from '../components/ui/EduBadge';
import { Check, X, Users, Calendar, Filter, ChevronRight, Search } from 'lucide-react';
import { Student } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const Attendance: React.FC = () => {
  const { data: students, loading, fetchData } = useCrud<Student>('students');
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [selectedGrade, setSelectedGrade] = useState('11');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleAttendance = (id: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === status ? undefined : status
    } as any));
  };

  const filteredStudents = students.filter(s => 
    (selectedGrade === 'all' || s.grade === selectedGrade) &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Attendance Tracking</h1>
          <p className="text-slate-500 font-semibold mt-1">Daily roll call and presence reporting for all grades.</p>
        </div>
        <div className="flex items-center gap-3">
          <EduCard className="flex items-center gap-3 py-2 px-4 border-2 border-slate-100 shadow-none">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </EduCard>
          <EduButton variant="primary" className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20">
            Submit Record
          </EduButton>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-100">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
               placeholder="Search by student name..."
               className="w-full h-12 bg-slate-50 rounded-2xl pl-12 pr-4 outline-none border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all text-sm font-semibold"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex gap-2">
            {['all', '9', '10', '11', '12'].map(g => (
               <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`px-6 h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${
                     selectedGrade === g 
                     ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                     : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
               >
                  {g === 'all' ? 'All' : `G${g}`}
               </button>
            ))}
         </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Compiling Class List..." className="h-64" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredStudents.map((student, i) => (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <EduCard className={`p-6 border-2 transition-all duration-300 relative overflow-hidden ${
                  attendance[student.id] === 'present' ? 'border-emerald-500/30 bg-emerald-50/10' :
                  attendance[student.id] === 'absent' ? 'border-rose-500/30 bg-rose-50/10' :
                  attendance[student.id] === 'late' ? 'border-amber-500/30 bg-amber-50/10' :
                  'border-slate-100 bg-white hover:border-slate-200'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-indigo-600 border-2 border-white shadow-sm overflow-hidden">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 tracking-tight text-sm">{student.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">G{student.grade} - {student.section}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => toggleAttendance(student.id, 'present')}
                      className={`h-10 rounded-xl flex items-center justify-center gap-2 transition-all ${
                        attendance[student.id] === 'present' 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                        : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, 'absent')}
                      className={`h-10 rounded-xl flex items-center justify-center gap-2 transition-all ${
                        attendance[student.id] === 'absent' 
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                        : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600'
                      }`}
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, 'late')}
                      className={`h-10 rounded-xl flex items-center justify-center gap-2 transition-all ${
                        attendance[student.id] === 'late' 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                        : 'bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                    >
                      <div className="font-black text-xs">L</div>
                    </button>
                  </div>

                  {attendance[student.id] && (
                     <div className="absolute top-0 right-0 p-2">
                        <div className={`w-2 h-2 rounded-full animate-ping ${
                           attendance[student.id] === 'present' ? 'bg-emerald-500' :
                           attendance[student.id] === 'absent' ? 'bg-rose-500' : 'bg-amber-500'
                        }`} />
                     </div>
                  )}
                </EduCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {filteredStudents.length === 0 && !loading && (
         <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200">
            <Users size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-black text-slate-400 tracking-tighter uppercase">No Students Found</h3>
            <p className="text-sm font-semibold text-slate-400 mt-2">Try adjusting your filters or search query.</p>
         </div>
      )}
    </div>
  );
};