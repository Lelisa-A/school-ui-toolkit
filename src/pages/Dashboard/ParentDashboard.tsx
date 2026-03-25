import React, { useMemo } from 'react';
import { 
  Heart, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Star, 
  ArrowUpRight, 
  Award, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Bell,
  Search
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from '../../components/ui/EduCard';
import { EduButton } from '../../components/ui/EduButton';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useSearchStore } from '../../store/useSearchStore';
import { toast } from 'sonner';

const MOCK_CHILD_DATA = [
  { subject: 'Mathematics', progress: 92, lastScore: 94, trend: 'up', color: 'indigo' },
  { subject: 'Science', progress: 85, lastScore: 82, trend: 'up', color: 'emerald' },
  { subject: 'English', progress: 78, lastScore: 88, trend: 'down', color: 'rose' },
  { subject: 'History', progress: 95, lastScore: 92, trend: 'up', color: 'amber' },
];

export const ParentDashboard = () => {
  const { query: globalQuery } = useSearchStore();

  const filteredMetrics = useMemo(() => {
    return MOCK_CHILD_DATA.filter(item => 
      item.subject.toLowerCase().includes(globalQuery.toLowerCase())
    );
  }, [globalQuery]);

  const handleAction = (action: string) => {
    toast.success(`Guardian ${action} Initiated`, {
      description: "Accessing restricted student performance nodes for Ethan Hunt.",
      icon: <Heart className="text-rose-500" />
    });
  };

  return (
    <div className="space-y-12 p-2 lg:p-4 pb-32 animate-in fade-in duration-1000">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 p-12 md:p-20 text-white shadow-[0_50px_100px_-20px_rgba(79,70,229,0.4)] group"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-[4s] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
          <div className="space-y-8 max-w-3xl">
            <div className="flex items-center gap-4">
               <div className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-[10px] font-black uppercase tracking-[0.4em] transition-transform hover:scale-105">
                  GUARDIAN LINK ACTIVE
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                  <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest opacity-70">Real-time Monitoring Sync</span>
               </div>
            </div>
            <div className="space-y-4">
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] italic">
                  Student <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">Nexus.</span>
               </h1>
               <p className="text-indigo-100 text-2xl font-medium max-w-xl leading-relaxed opacity-90 tracking-tight">
                 Overseeing Ethan Hunt's academic trajectory and institutional engagement for Academic Year 2024.
               </p>
            </div>
            <div className="flex flex-wrap gap-5 pt-4">
               <EduButton variant="secondary" size="lg" className="h-20 px-12 rounded-[2.25rem] bg-white text-indigo-700 border-none font-black shadow-2xl hover:scale-105 transition-all">
                  VIEW REPORT CARD
               </EduButton>
               <EduButton variant="glass" size="lg" className="h-20 px-12 rounded-[2.25rem] border-white/20 font-black">
                  CONTACT FACULTY
               </EduButton>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center xl:justify-end">
             <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/30 blur-[100px] rounded-full scale-150" />
                <EduCard className="w-[350px] bg-white/5 backdrop-blur-3xl border-white/10 p-10 rounded-[3rem] shadow-2xl relative z-10">
                   <div className="flex flex-col items-center text-center gap-6">
                      <div className="relative">
                         <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/student-avatar-1-6b60fd30-1773641873198.webp" className="w-28 h-28 rounded-[2rem] object-cover ring-8 ring-white/10 shadow-2xl" alt="" />
                         <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-slate-900 flex items-center justify-center">
                            <Activity size={18} className="text-white" />
                         </div>
                      </div>
                      <div>
                         <p className="text-2xl font-black italic tracking-tighter text-white">Ethan Hunt</p>
                         <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mt-1">Grade 10-A \\\\u2022 ID: EDU-14</p>
                      </div>
                      <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Overall Score</span>
                            <span className="text-2xl font-black text-white italic">88%</span>
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Class Rank</span>
                            <span className="text-2xl font-black text-white italic">#4</span>
                         </div>
                      </div>
                   </div>
                </EduCard>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Attendance Rate" value="96.4%" icon={<Calendar size={24} />} color="indigo" trend={{ value: 1.2, isPositive: true }} />
        <StatCard title="System Points" value="2,450" icon={<Star size={24} />} color="amber" trend={{ value: 15, isPositive: true }} />
        <StatCard title="Fee Status" value="SYNCD" icon={<DollarSign size={24} />} color="green" description="Paid for Q4" />
        <StatCard title="Faculty Alerts" value="2 New" icon={<Bell size={24} />} color="rose" trend={{ value: 1, isPositive: false }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <EduCard className="lg:col-span-8 border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem] overflow-hidden" animate hoverGlow>
          <EduCardHeader className="border-b border-slate-50 bg-slate-50/20 p-10">
             <div className="flex items-center justify-between">
                <div>
                   <EduCardTitle className="text-3xl font-black italic tracking-tighter">Academic Trajectory</EduCardTitle>
                   <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Core subject performance matrix</EduCardDescription>
                </div>
                <TrendingUp size={40} className="text-indigo-500 opacity-20" />
             </div>
          </EduCardHeader>
          <EduCardContent className="p-12 space-y-10">
             <AnimatePresence mode="popLayout">
               {filteredMetrics.length > 0 ? filteredMetrics.map((sub, i) => (
                 <motion.div 
                   layout
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   key={sub.subject} 
                   className="space-y-4 group cursor-pointer p-6 rounded-[2rem] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                 >
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110", 
                            sub.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
                            sub.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                            sub.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                          )}>
                             <Activity size={24} />
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic">{sub.subject}</h4>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historical Peak: 98%</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-right">
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Latest Result</p>
                             <p className="text-2xl font-black text-slate-900">{sub.lastScore}%</p>
                          </div>
                          {sub.trend === 'up' ? <TrendingUp size={24} className="text-emerald-500" /> : <TrendingUp size={24} className="text-rose-500 rotate-180" />}
                       </div>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-50">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${sub.progress}%` }}
                         transition={{ duration: 1.5, ease: "circOut", delay: 0.3 + (i * 0.1) }}
                         className={cn("h-full rounded-full shadow-lg", 
                           sub.color === 'indigo' ? 'bg-indigo-600' : 
                           sub.color === 'emerald' ? 'bg-emerald-500' : 
                           sub.color === 'rose' ? 'bg-rose-50' : 'bg-amber-50'
                         )}
                       />
                    </div>
                 </motion.div>
               )) : (
                 <div className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Search size={48} className="text-slate-100" />
                      <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No metric nodes matched the search query</p>
                    </div>
                 </div>
               )}
             </AnimatePresence>
          </EduCardContent>
        </EduCard>

        <div className="lg:col-span-4 space-y-10">
           <EduCard className="border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem]" animate>
             <EduCardHeader className="border-b border-slate-50 p-10">
               <EduCardTitle className="text-2xl font-black italic tracking-tighter">Institutional Feed</EduCardTitle>
               <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Relevant student events</EduCardDescription>
             </EduCardHeader>
             <EduCardContent className="p-10 space-y-8">
               {[
                 { title: 'Parent-Teacher Meet', date: '22 Nov, 3 PM', icon: MessageSquare, color: 'indigo' },
                 { title: 'Annual Science Fair', date: '05 Dec, 9 AM', icon: Zap, color: 'amber' },
                 { title: 'Mid-term Sync End', date: '15 Dec, 8 AM', icon: CheckCircle2, color: 'emerald' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 group cursor-pointer">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform", 
                     item.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
                     item.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                   )}>
                      <item.icon size={20} />
                   </div>
                   <div className="flex-1">
                     <p className="text-base font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{item.title}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.date}</p>
                   </div>
                   <ArrowUpRight size={18} className="text-slate-200 group-hover:text-indigo-400 transition-all" />
                 </div>
               ))}
               <EduButton variant="secondary" className="w-full h-14 rounded-2xl text-[10px] font-black tracking-widest uppercase mt-4">
                  VIEW FULL CALENDAR
               </EduButton>
             </EduCardContent>
           </EduCard>

           <EduCard className="bg-slate-950 text-white rounded-[3rem] border-none shadow-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md">
                    <Activity size={32} className="text-rose-400" />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black italic tracking-tighter">Support Hub</h4>
                    <p className="text-slate-400 text-sm mt-3 font-medium opacity-80">Access educational resources, guidance council, and mental well-being nodes for your child.</p>
                 </div>
                 <EduButton variant="glass" className="w-full h-16 rounded-2xl text-[10px] font-black tracking-widest uppercase">OPEN CARE CONSOLE</EduButton>
              </div>
           </EduCard>
        </div>
      </div>
    </div>
  );
};