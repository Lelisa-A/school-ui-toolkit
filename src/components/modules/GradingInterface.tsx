import React, { useState, useMemo } from 'react';
import { EduCard, EduCardHeader, EduCardTitle, EduCardContent, EduCardDescription } from '../ui/EduCard';
import { EduButton } from '../ui/EduButton';
import { EduBadge } from '../ui/EduBadge';
import { toast } from 'sonner';
import { Save, Search, Filter, ArrowUpRight, CheckCircle2, AlertCircle, FileText, User, Layout, ChevronRight, GraduationCap, Zap, Sparkles, Target, ArrowRight, Award, TrendingUp, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { usePermissions } from '../../hooks/usePermissions';
import { useSearchStore } from '../../store/useSearchStore';

const MOCK_STUDENTS = [
  { id: '1', name: 'Alice Johnson', grades: { math: 85, science: 92, english: 78 }, attendance: 98, status: 'EXCELLENT', trend: '+4.2%' },
  { id: '2', name: 'Bob Smith', grades: { math: 72, science: 68, english: 80 }, attendance: 85, status: 'AVERAGE', trend: '-2.1%' },
  { id: '3', name: 'Charlie Davis', grades: { math: 95, science: 98, english: 92 }, attendance: 100, status: 'TOP_TIER', trend: '+1.5%' },
  { id: '4', name: 'Diana Prince', grades: { math: 88, science: 84, english: 89 }, attendance: 92, status: 'STABLE', trend: '0.0%' },
];

const MOCK_PERSONAL_GRADES = [
  { subject: 'Mathematics', score: 92, max: 100, grade: 'A', weight: '35%', teacher: 'Prof. Miller' },
  { subject: 'Quantum Physics', score: 88, max: 100, grade: 'A-', weight: '25%', teacher: 'Dr. Sarah' },
  { subject: 'English Lit', score: 95, max: 100, grade: 'A+', weight: '20%', teacher: 'Ms. Emily' },
  { subject: 'World History', score: 78, max: 100, grade: 'B', weight: '20%', teacher: 'Mr. David' },
];

export function GradingInterface() {
  const { hasPermission, hasRole } = usePermissions();
  const { query: globalQuery } = useSearchStore();
  const [subject, setSubject] = useState('math');
  const [localGrades, setLocalGrades] = useState(MOCK_STUDENTS);
  const [localSearch, setLocalSearch] = useState('');

  const isStaff = hasPermission('grades:manage');
  const activeSearch = globalQuery || localSearch;

  const handleGradeChange = (studentId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setLocalGrades(prev => prev.map(s => 
      s.id === studentId ? { ...s, grades: { ...s.grades, [subject as keyof typeof s.grades]: Math.min(100, Math.max(0, numValue)) } } : s
    ));
  };

  const handleSave = () => {
    toast.success(`Academic Matrix Synchronized`, {
       description: `Evaluation records for ${subject.toUpperCase()} have been committed to the central core.`,
       icon: <CheckCircle2 className="text-emerald-500" />
    });
  };

  const filteredGrades = useMemo(() => {
    return localGrades.filter(s => s.name.toLowerCase().includes(activeSearch.toLowerCase()));
  }, [localGrades, activeSearch]);

  const filteredPersonal = useMemo(() => {
    return MOCK_PERSONAL_GRADES.filter(g => g.subject.toLowerCase().includes(activeSearch.toLowerCase()));
  }, [activeSearch]);

  if (!isStaff) {
    return (
      <div className="space-y-16 pb-32 animate-in fade-in duration-1000">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 bg-slate-900 p-12 md:p-20 rounded-[4rem] relative overflow-hidden group shadow-3xl">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-[3s]" />
           
           <div className="space-y-8 relative z-10 max-w-4xl text-white">
              <div className="flex items-center gap-4">
                 <EduBadge variant="indigo" className="px-6 py-2 rounded-2xl text-[11px] tracking-[0.3em] font-black uppercase bg-indigo-600 border-none shadow-xl shadow-indigo-500/20">GRADEBOOK HUB</EduBadge>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                    <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest opacity-70">Synchronized With Core</span>
                 </div>
              </div>
              <div className="space-y-4">
                 <h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] italic">Academic <br/> <span className="text-indigo-400">Ledger.</span></h2>
                 <p className="text-indigo-100/70 font-bold text-2xl tracking-tight leading-relaxed max-w-2xl italic">
                   Your multi-dimensional performance matrix across the current academic cycle.
                 </p>
              </div>
           </div>
           
           <div className="relative z-10">
              <EduButton variant="glass" size="lg" className="h-20 px-12 rounded-[2rem] border-white/10 font-black italic">
                 DOWNLOAD OFFICIAL TRANSCRIPT <ArrowRight size={24} className="ml-3" />
              </EduButton>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <EduCard className="p-8 border-none shadow-xl bg-white group hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-6">
                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform">
                    <Award size={28} />
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global GPA</span>
                    <p className="text-3xl font-black text-slate-900 italic">3.85</p>
                 </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full w-[96%] bg-indigo-600"></div>
              </div>
           </EduCard>
           <EduCard className="p-8 border-none shadow-xl bg-white group hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-6">
                 <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
                    <TrendingUp size={28} />
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consistency</span>
                    <p className="text-3xl font-black text-slate-900 italic">92%</p>
                 </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full w-[92%] bg-emerald-500"></div>
              </div>
           </EduCard>
           <EduCard className="p-8 border-none shadow-xl bg-white group hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-6">
                 <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100 group-hover:scale-110 transition-transform">
                    <Zap size={28} />
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points</span>
                    <p className="text-3xl font-black text-slate-900 italic">2,450</p>
                 </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full w-[75%] bg-amber-500"></div>
              </div>
           </EduCard>
           <EduCard className="p-8 border-none shadow-xl bg-white group hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-6">
                 <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 border border-rose-100 group-hover:scale-110 transition-transform">
                    <AlertCircle size={28} />
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending</span>
                    <p className="text-3xl font-black text-slate-900 italic">3</p>
                 </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full w-[30%] bg-rose-500"></div>
              </div>
           </EduCard>
        </div>

        <EduCard className="rounded-[3rem] border-none shadow-2xl overflow-hidden">
           <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-50/30">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter">Evaluation Results</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Academic Cycle: 2023-24 \\\\u2022 Term 2</p>
                 </div>
              </div>
              
              <div className="relative w-full xl:w-64 group">
                 <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", activeSearch ? "text-indigo-600" : "text-slate-300")} />
                 <input 
                   type="text" 
                   placeholder="Filter subjects..." 
                   className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                   value={activeSearch}
                   onChange={(e) => setLocalSearch(e.target.value)}
                 />
              </div>
           </div>

           <div className="p-0">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-50">
                       <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Academic Discipline</th>
                       <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Evaluation Weight</th>
                       <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Instructor Node</th>
                       <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Result Marker</th>
                       <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Metric</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    <AnimatePresence mode="popLayout">
                      {filteredPersonal.length > 0 ? filteredPersonal.map((item, i) => (
                        <motion.tr 
                          layout
                          key={item.subject}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="hover:bg-indigo-50/30 transition-all duration-500 group"
                        >
                           <td className="px-10 py-8">
                              <p className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic leading-none">{item.subject}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Core Node Discipline</p>
                           </td>
                           <td className="px-10 py-8">
                              <EduBadge variant="secondary" className="rounded-xl font-black text-[10px]">{item.weight}</EduBadge>
                           </td>
                           <td className="px-10 py-8 font-bold text-slate-500 italic">{item.teacher}</td>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-3">
                                 <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shadow-sm", 
                                   item.grade.startsWith('A') ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                                 )}>
                                    {item.grade}
                                 </div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase">Verified</span>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex flex-col items-end gap-2">
                                 <span className="text-xl font-black text-slate-900">{item.score}%</span>
                                 <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-indigo-600" style={{ width: `${item.score}%` }}></div>
                                 </div>
                              </div>
                           </td>
                        </motion.tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-10 py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <Search size={48} className="text-slate-100" />
                              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No metric nodes matched the query signature</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                 </tbody>
              </table>
           </div>
        </EduCard>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-[3s]" />
         
         <div className="space-y-8 relative z-10 max-w-4xl">
            <div className="flex items-center gap-4">
               <EduBadge variant="indigo" className="px-6 py-2 rounded-2xl text-[11px] tracking-[0.3em] font-black uppercase shadow-xl shadow-indigo-100/50">ACADEMIC RECORDS</EduBadge>
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-80">Assessment Hub Active</span>
               </div>
            </div>
            <div className="space-y-4">
               <h2 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] italic">Evaluation <br/> <span className="text-indigo-600">Engine.</span></h2>
               <p className="text-slate-500 font-bold text-2xl opacity-70 tracking-tight leading-relaxed max-w-2xl">
                 Managing student performance benchmarks with multi-variable precision analytics and cloud-sync core logic.
               </p>
            </div>
         </div>
         
         <div className="flex flex-wrap items-center gap-6 relative z-10">
            <div className="flex bg-slate-100/50 p-2 rounded-[2rem] border border-slate-200/50 shadow-inner backdrop-blur-xl">
               {['math', 'science', 'english'].map((subj) => (
                 <button 
                   key={subj} 
                   onClick={() => setSubject(subj)}
                   className={cn(
                     "px-10 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-700",
                     subject === subj 
                       ? "bg-white text-indigo-600 shadow-2xl shadow-indigo-100 scale-105" 
                       : "text-slate-400 hover:text-slate-900 hover:bg-white/50"
                   )}
                 >
                   {subj}
                 </button>
               ))}
            </div>
            <EduButton variant="gradient" size="lg" onClick={handleSave} className="shadow-[0_30px_60px_-15px_rgba(79,70,229,0.4)] h-20 px-12 rounded-[2rem] group">
              <Save className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" /> Synchronize Matrix
            </EduButton>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8">
            <EduCard variant="white" className="border-none shadow-[0_60px_120px_-30px_rgba(0,0,0,0.06)] overflow-visible" hoverGlow>
               <EduCardHeader className="border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-10 p-12 md:p-16">
                  <div className="relative flex-1 max-w-2xl group">
                     <Search className={cn("absolute left-10 top-1/2 -translate-y-1/2 transition-all duration-500 group-focus-within:scale-110", activeSearch ? "text-indigo-600" : "text-slate-300")} size={28} />
                     <input 
                       type="text" 
                       placeholder="Filter by entity or performance..." 
                       className="w-full pl-24 pr-12 py-7 bg-slate-50 border-[3px] border-transparent rounded-[2.5rem] focus:bg-white focus:border-indigo-100 focus:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.1)] transition-all duration-700 outline-none text-lg font-black placeholder:text-slate-300 placeholder:italic"
                       value={activeSearch}
                       onChange={(e) => setLocalSearch(e.target.value)}
                     />
                  </div>
                  <div className="flex items-center gap-4">
                     <EduButton variant="secondary" size="lg" className="rounded-[1.75rem] h-16 bg-white shadow-xl hover:shadow-2xl border-2 border-slate-100"><Filter className="mr-3 h-6 w-6 text-indigo-500" /> Intelligence</EduButton>
                  </div>
               </EduCardHeader>
               <EduCardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50/50">
                              <th className="px-12 py-10 text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Student Entity</th>
                              <th className="px-12 py-10 text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Historical Flow</th>
                              <th className="px-12 py-10 text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Input Score</th>
                              <th className="px-12 py-10 text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           <AnimatePresence mode="popLayout">
                             {filteredGrades.length > 0 ? filteredGrades.map((student, i) => (
                               <motion.tr 
                                 layout
                                 key={student.id} 
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, scale: 0.95 }}
                                 className="hover:bg-indigo-50/30 transition-all duration-700 group cursor-pointer"
                               >
                                  <td className="px-12 py-10">
                                     <div className="flex items-center gap-8">
                                        <div className="w-16 h-16 rounded-[1.75rem] bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                                           <User size={28} />
                                        </div>
                                        <div className="space-y-2">
                                           <p className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic leading-none">{student.name}</p>
                                           <div className="flex items-center gap-3">
                                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-80">#{student.id.padStart(4, '0')}</p>
                                              <span className={cn("text-[10px] font-black uppercase", student.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>{student.trend}</span>
                                           </div>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-12 py-10">
                                     <div className="flex items-center gap-5">
                                        <div className={cn("w-24 h-2.5 rounded-full bg-slate-100 overflow-hidden shadow-inner border border-slate-50")}>
                                           <motion.div 
                                             initial={{ width: 0 }}
                                             animate={{ width: `${student.grades[subject as keyof typeof student.grades]}%` }}
                                             transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                                             className="h-full bg-indigo-500 rounded-full shadow-lg" 
                                           />
                                        </div>
                                        <span className="text-lg font-black text-slate-700 italic">{student.grades[subject as keyof typeof student.grades]}%</span>
                                     </div>
                                  </td>
                                  <td className="px-12 py-10">
                                     <div className="relative w-32 group/input">
                                        <input 
                                          type="number"
                                          value={student.grades[subject as keyof typeof student.grades]}
                                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                          className="w-full text-center py-5 bg-white border-[3px] border-slate-50 rounded-2xl focus:border-indigo-600 focus:ring-8 focus:ring-indigo-100 transition-all outline-none font-black text-slate-900 text-2xl italic shadow-sm group-hover/input:shadow-md"
                                        />
                                     </div>
                                  </td>
                                  <td className="px-12 py-10 text-right">
                                     <EduButton variant="secondary" size="icon" className="w-14 h-14 rounded-2xl bg-slate-50 border-none hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                                        <ArrowUpRight size={22} />
                                     </EduButton>
                                  </td>
                               </motion.tr>
                             )) : (
                               <tr>
                                 <td colSpan={4} className="px-10 py-20 text-center">
                                   <div className="flex flex-col items-center gap-4">
                                     <Search size={48} className="text-slate-100" />
                                     <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No identities matched the search signature</p>
                                   </div>
                                 </td>
                               </tr>
                             )}
                           </AnimatePresence>
                        </tbody>
                     </table>
                  </div>
               </EduCardContent>
               <div className="p-12 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Real-time telemetry synchronization active</p>
                  <div className="flex items-center gap-6">
                     <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] animate-pulse italic">Quantum Link Secure \\u2022 v4.2</span>
                  </div>
               </div>
            </EduCard>
         </div>

         <div className="lg:col-span-4 space-y-10">
            <EduCard variant="slate" className="p-10 group min-h-[400px] overflow-hidden" hoverGlow>
               <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
               <EduCardHeader className="p-0 mb-10">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] flex items-center justify-center text-indigo-400 mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform">
                     <Layout size={32} />
                  </div>
                  <EduCardTitle className="text-white text-3xl italic">Grading Metrics</EduCardTitle>
                  <EduCardDescription className="text-slate-400 font-black uppercase tracking-[0.2em]">Institutional Distribution</EduCardDescription>
               </EduCardHeader>
               <EduCardContent className="p-0 space-y-8">
                  {[ 
                    { label: 'Completion Flux', value: 85, color: 'bg-indigo-500' },
                    { label: 'Elite Tier (A+)', value: 12, color: 'bg-emerald-500' },
                    { label: 'Pending Audit', value: 3, color: 'bg-amber-500' },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-4">
                       <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-[0.3em] text-slate-300">
                          <span>{stat.label}</span>
                          <span className="italic">{stat.value}{stat.label.includes('Completion') ? '%' : ''}</span>
                       </div>
                       <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.label.includes('Completion') ? stat.value : (stat.value / 40) * 100}%` }}
                            className={cn("h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]", stat.color)}
                          />
                       </div>
                    </div>
                  ))}
                  
                  <div className="pt-8">
                     <EduButton variant="glass" size="md" className="w-full h-16 rounded-[1.5rem] border-white/10 font-black text-[11px]">View Analytics Grid</EduButton>
                  </div>
               </EduCardContent>
            </EduCard>
         </div>
      </div>
    </div>
  );
}