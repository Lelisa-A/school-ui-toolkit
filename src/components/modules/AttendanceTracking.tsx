import React, { useState, useMemo } from 'react';
import { Calendar, UserCheck, UserX, Clock, ChevronLeft, ChevronRight, FileSpreadsheet, Download, Activity, Target, ShieldCheck, Zap, Users, GraduationCap, Search, History } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { cn } from '../../lib/utils';
import { PermissionGate } from '../auth/PermissionGate';
import { usePermissions } from '../../hooks/usePermissions';
import { useSearchStore } from '../../store/useSearchStore';
import { EduButton } from '../ui/EduButton';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from '../ui/EduCard';
import { EduBadge } from '../ui/EduBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const MOCK_STUDENTS = [
  { id: '1', name: 'Alice Thompson', avatar: 'AT', status: 'present' },
  { id: '2', name: 'Bob Richards', avatar: 'BR', status: 'absent' },
  { id: '3', name: 'Charlie Davis', avatar: 'CD', status: 'present' },
  { id: '4', name: 'Diana Prince', avatar: 'DP', status: 'present' },
  { id: '5', name: 'Ethan Hunt', avatar: 'EH', status: 'late' },
];

const MOCK_PERSONAL_LOGS = [
  { date: '2023-11-20', status: 'PRESENT', time: '08:42 AM', node: 'Lab 2A' },
  { date: '2023-11-19', status: 'PRESENT', time: '08:35 AM', node: 'Hall B' },
  { date: '2023-11-18', status: 'LATE', time: '09:12 AM', node: 'Room 302' },
  { date: '2023-11-17', status: 'PRESENT', time: '08:45 AM', node: 'Main Hub' },
  { date: '2023-11-16', status: 'ABSENT', time: '-', node: '-' },
];

export const AttendanceTracking = () => {
  const { hasPermission, user } = usePermissions();
  const { query: globalQuery } = useSearchStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [localSearch, setLocalSearch] = useState('');

  const isStaff = hasPermission('attendance:manage');
  const activeSearch = globalQuery || localSearch;

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(activeSearch.toLowerCase())
    );
  }, [activeSearch]);

  const handleSave = () => {
    toast.success("Attendance Synchronized", {
      description: "Daily attendance log has been pushed to the institutional cloud node.",
      icon: <ShieldCheck className="text-emerald-500" />
    });
  };

  if (!isStaff) {
    return (
      <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Personal Persistence</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Your institutional temporal footprint</p>
          </div>
          <EduButton variant="secondary" className="rounded-2xl border-slate-200 font-black h-14 px-8">
             <Download size={18} className="mr-2 text-indigo-600" /> DOWNLOAD LOGS
          </EduButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <EduCard className="p-8 flex items-center gap-6 border-none shadow-xl">
              <div className="w-16 h-16 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 shadow-inner border border-indigo-100">
                 <Activity size={28} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presence Rate</p>
                 <p className="text-3xl font-black text-slate-900 italic">98.2%</p>
              </div>
           </EduCard>
           <EduCard className="p-8 flex items-center gap-6 border-none shadow-xl">
              <div className="w-16 h-16 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-amber-600 shadow-inner border border-amber-100">
                 <Clock size={28} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Late Nodes</p>
                 <p className="text-3xl font-black text-slate-900 italic">2</p>
              </div>
           </EduCard>
           <EduCard className="p-8 flex items-center gap-6 border-none shadow-xl">
              <div className="w-16 h-16 bg-rose-50 rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-inner border border-rose-100">
                 <UserX size={28} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Absences</p>
                 <p className="text-3xl font-black text-slate-900 italic">1</p>
              </div>
           </EduCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <EduCard className="lg:col-span-4 rounded-[3rem] border-none shadow-2xl p-10 bg-white">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-black italic tracking-tighter">{format(currentDate, 'MMMM yyyy')}</h3>
                 <div className="flex gap-2">
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 hover:bg-slate-50 rounded-xl"><ChevronLeft size={20}/></button>
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 hover:bg-slate-50 rounded-xl"><ChevronRight size={20}/></button>
                 </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                 {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center text-[10px] font-black text-slate-300">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                 {daysInMonth.map((day, idx) => (
                    <div key={idx} className={cn(
                       "aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all",
                       isToday(day) ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500",
                       day.getDay() === 0 || day.getDay() === 6 ? "opacity-30" : ""
                    )}>
                       {format(day, 'd')}
                    </div>
                 ))}
              </div>
           </EduCard>

           <EduCard className="lg:col-span-8 rounded-[3rem] border-none shadow-2xl overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-indigo-600 border border-slate-100">
                       <History size={24} />
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter">Temporal Ledger</h3>
                 </div>
              </div>
              <div className="p-0">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Marker</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sync Time</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sector</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {MOCK_PERSONAL_LOGS.map((log, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-all">
                             <td className="px-10 py-6 font-black text-slate-700 italic">{log.date}</td>
                             <td className="px-10 py-6">
                                <EduBadge variant={log.status === 'PRESENT' ? 'success' : log.status === 'LATE' ? 'warning' : 'error'} className="rounded-xl">
                                   {log.status}
                                </EduBadge>
                             </td>
                             <td className="px-10 py-6 text-sm font-bold text-slate-500">{log.time}</td>
                             <td className="px-10 py-6 text-[10px] font-black text-indigo-600 uppercase tracking-widest">{log.node}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </EduCard>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in slide-in-from-right-8 duration-1000 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Attendance Intelligence</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Daily Persistence Tracking & Temporal Logs</p>
        </div>
        <div className="flex gap-4">
          <EduButton variant="secondary" className="rounded-2xl border-slate-200 font-black h-14 px-8">
             <FileSpreadsheet size={18} className="mr-2 text-emerald-600" /> EXPORT EXCEL
          </EduButton>
          <EduButton variant="secondary" className="rounded-2xl border-slate-200 font-black h-14 px-8">
             <Download size={18} className="mr-2 text-indigo-600" /> DOWNLOAD REPORTS
          </EduButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <EduCard className="p-8 flex items-center gap-6 border-none shadow-xl">
            <div className="w-16 h-16 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 shadow-inner border border-indigo-100">
               <Users size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Enrollment</p>
               <p className="text-3xl font-black text-slate-900 italic">1,284</p>
            </div>
         </EduCard>
         <EduCard className="p-8 flex items-center gap-6 border-none shadow-xl">
            <div className="w-16 h-16 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100">
               <Activity size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presence Rate</p>
               <p className="text-3xl font-black text-slate-900 italic">94.2%</p>
            </div>
         </EduCard>
         <EduCard className="p-8 flex items-center gap-6 border-none shadow-xl">
            <div className="w-16 h-16 bg-rose-50 rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-inner border border-rose-100">
               <Zap size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Critical Alerts</p>
               <p className="text-3xl font-black text-slate-900 italic">12</p>
            </div>
         </EduCard>
         <EduCard className="p-8 flex items-center gap-6 border-none shadow-xl">
            <div className="w-16 h-16 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-amber-600 shadow-inner border border-amber-100">
               <Target size={28} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Goal Offset</p>
               <p className="text-3xl font-black text-slate-900 italic">-2.4%</p>
            </div>
         </EduCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-10">
           <EduCard className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white p-10">
             <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black italic text-slate-900">{format(currentDate, 'MMMM yyyy')}</h3>
               <div className="flex gap-3">
                 <button 
                   onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                   className="p-3 hover:bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all"
                 >
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button 
                   onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                   className="p-3 hover:bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all"
                 >
                   <ChevronRight className="w-5 h-5" />
                 </button>
               </div>
             </div>
             
             <div className="grid grid-cols-7 gap-2 mb-4">
               {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                 <div key={day} className="text-center text-[11px] font-black text-slate-300 uppercase py-3">{day}</div>
               ))}
             </div>
             <div className="grid grid-cols-7 gap-2">
               {daysInMonth.map((day, idx) => (
                 <button
                   key={idx}
                   onClick={() => setSelectedDay(day)}
                   className={cn(
                     "aspect-square rounded-2xl text-xs font-black flex flex-col items-center justify-center transition-all relative group",
                     isSameDay(day, selectedDay) ? "bg-indigo-600 text-white shadow-xl scale-110 z-10" : "hover:bg-indigo-50 text-slate-500",
                     !isSameDay(day, selectedDay) && isToday(day) && "text-indigo-600 border-2 border-indigo-100 shadow-inner bg-indigo-50/20"
                   )}
                 >
                   {format(day, 'd')}
                   {idx % 7 === 0 && !isSameDay(day, selectedDay) && (
                     <div className="absolute bottom-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
                   )}
                 </button>
               ))}
             </div>

             <div className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] space-y-4 border border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-black">
                   <span className="text-slate-400 uppercase tracking-widest">Active Nodes</span>
                   <span className="text-slate-900 font-black italic">22 DAYS</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-black">
                   <span className="text-slate-400 uppercase tracking-widest">Temporal Gaps</span>
                   <span className="text-indigo-600 font-black italic">4 HOLIDAYS</span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-black">
                   <span className="text-slate-400 uppercase tracking-widest">Hub Efficiency</span>
                   <span className="text-emerald-600 font-black italic">92.4% NOMINAL</span>
                </div>
             </div>
           </EduCard>

           <EduCard className="rounded-[3rem] border-none shadow-2xl p-10 bg-slate-950 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-6">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <GraduationCap size={32} className="text-indigo-400" />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black italic tracking-tighter">Faculty Log</h4>
                    <p className="text-slate-400 text-sm mt-3 font-medium">Switch to faculty attendance mode to verify staff presence nodes.</p>
                 </div>
                 <EduButton variant="glass" className="w-full h-14 rounded-2xl text-[10px] font-black tracking-widest uppercase">SWITCH TO FACULTY</EduButton>
              </div>
           </EduCard>
        </div>

        <div className="lg:col-span-8 bg-white rounded-[3rem] border-none shadow-2xl overflow-hidden flex flex-col">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 flex-col xl:flex-row gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center border border-slate-100">
                <Calendar className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter">{format(selectedDay, 'EEEE, MMM d, yyyy')}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Node: Class 10A \\\\u2022 English Literature</p>
              </div>
            </div>

            <div className="relative w-full xl:w-64 group">
               <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", activeSearch ? "text-indigo-600" : "text-slate-300")} />
               <input 
                 type="text" 
                 placeholder="Scan node..." 
                 className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                 value={activeSearch}
                 onChange={(e) => {
                   setLocalSearch(e.target.value);
                 }}
               />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-3xl z-10 border-b border-slate-50">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entity Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Marker</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Handshake Timestamp</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Modifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                    <motion.tr 
                      layout
                      key={student.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-slate-50/50 transition-all group"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-600 group-hover:scale-110 transition-transform">{student.avatar}</div>
                          <span className="font-black text-slate-800 text-base italic group-hover:text-indigo-600 transition-colors">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-3">
                          <EduButton 
                            variant="ghost" 
                            size="sm" 
                            className={cn(
                              "w-12 h-12 p-0 rounded-2xl border-2 transition-all",
                              student.status === 'present' ? "bg-emerald-50 border-emerald-500 text-emerald-600 shadow-xl shadow-emerald-100" : "bg-slate-50 border-transparent text-slate-300 hover:border-emerald-100"
                            )}
                          >
                            <UserCheck className="w-5 h-5" />
                          </EduButton>
                          <EduButton 
                            variant="ghost" 
                            size="sm" 
                            className={cn(
                              "w-12 h-12 p-0 rounded-2xl border-2 transition-all",
                              student.status === 'absent' ? "bg-rose-50 border-rose-500 text-rose-600 shadow-xl shadow-rose-100" : "bg-slate-50 border-transparent text-slate-300 hover:border-rose-100"
                            )}
                          >
                            <UserX className="w-5 h-5" />
                          </EduButton>
                          <EduButton 
                            variant="ghost" 
                            size="sm" 
                            className={cn(
                              "w-12 h-12 p-0 rounded-2xl border-2 transition-all",
                              student.status === 'late' ? "bg-amber-50 border-amber-500 text-amber-600 shadow-xl shadow-amber-100" : "bg-slate-50 border-transparent text-slate-300 hover:border-amber-100"
                            )}
                          >
                            <Clock className="w-5 h-5" />
                          </EduButton>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-xs text-slate-500 font-black uppercase tracking-widest">{student.status === 'present' ? '08:45:32 AM' : student.status === 'late' ? '09:12:08 AM' : '-'}</span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <EduButton variant="ghost" className="text-[10px] font-black text-indigo-600 hover:bg-indigo-50 px-4 rounded-xl h-10 tracking-widest uppercase">APPEND NOTE</EduButton>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <Search size={40} className="text-slate-100" />
                          <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">No matching identities node</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          <div className="p-10 border-t border-slate-50 bg-slate-50/20">
            <PermissionGate permission="attendance:manage">
              <EduButton 
                variant="gradient" 
                size="lg" 
                className="w-full h-20 rounded-[2rem] shadow-2xl shadow-indigo-200 group"
                onClick={handleSave}
              >
                <span className="flex items-center gap-4 italic font-black text-lg">
                  VERIFY & SYNCHRONIZE DAILY LOG <Zap size={24} className="transition-transform group-hover:scale-125 group-hover:rotate-12" />
                </span>
              </EduButton>
            </PermissionGate>
          </div>
        </div>
      </div>
    </div>
  );
};