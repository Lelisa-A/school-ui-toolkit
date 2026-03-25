import React from 'react';
import { 
  Heart, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  MessageSquare, 
  FileText,
  DollarSign,
  Star,
  Activity,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Fingerprint
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from './ui/EduCard';
import { EduButton } from './ui/EduButton';
import { EduBadge } from './ui/EduBadge';
import { StatCard } from './ui/StatCard';
import { motion } from 'framer-motion';
import { useSearchStore } from '../store/useSearchStore';

export function ParentDashboard() {
  const { query } = useSearchStore();

  return (
    <div className="space-y-12 p-2 lg:p-4 pb-32 animate-in fade-in duration-1000">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-violet-600 to-indigo-700 p-12 text-white shadow-3xl shadow-indigo-200/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-20 -mt-20 animate-pulse duration-3000" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 blur-[80px] rounded-full -ml-32 -mb-32 animate-pulse duration-5000" />
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
              <Fingerprint size={14} className="text-violet-300" />
              Guardian Network Node
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none italic">
              Guardian <br /> <span className="text-violet-200">Terminal.</span>
            </h1>
            <p className="text-indigo-100 max-w-xl font-medium text-lg italic opacity-80">
              Monitoring Alex Thompson's Academic Year 2023-24. All systems synchronized with institutional core.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <EduButton variant="secondary" className="rounded-2xl px-10 h-16 shadow-2xl font-black italic">
                PERFORMANCE LOGS
              </EduButton>
              <EduButton variant="glass" className="text-white hover:bg-white/10 border border-white/20 rounded-2xl px-10 h-16 font-black italic">
                CONTACT FACULTY
              </EduButton>
            </div>
          </div>
          
          <div className="hidden xl:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-violet-500/30 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10 p-4 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 flex items-center gap-8 pr-12 group-hover:scale-105 transition-transform duration-700">
                <div className="w-32 h-32 rounded-[2.25rem] border-4 border-white/20 overflow-hidden shadow-2xl">
                  <img 
                    src="https://i.pravatar.cc/200?img=12" 
                    alt="Student" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black italic">Alex Thompson</p>
                  <p className="text-violet-200 text-[10px] font-black uppercase tracking-widest">Grade 10-A \u2022 Overall: 88%</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-300">Currently in Class</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Attendance Grid" 
          value="96.4%" 
          icon={<Calendar size={24} />} 
          trend={{ value: 1.2, isPositive: true }} 
          color="indigo"
          description="Institutional average: 92%"
        />
        <StatCard 
          title="Global Rank" 
          value="04" 
          icon={<Star size={24} />} 
          trend={{ value: 2, isPositive: true }} 
          color="amber"
          description="Out of 32 nodes"
        />
        <StatCard 
          title="Financial Sync" 
          value="PAID" 
          icon={<DollarSign size={24} />} 
          trend={{ value: 100, isPositive: true }} 
          color="green"
          description="Next billing: Jan 2024"
        />
        <StatCard 
          title="Faculty Alerts" 
          value="02" 
          icon={<MessageSquare size={24} />} 
          trend={{ value: 0, isPositive: true }} 
          color="rose"
          description="Unread transmissions"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <EduCard className="lg:col-span-8 border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem] overflow-hidden">
          <EduCardHeader className="border-b border-slate-50 bg-slate-50/20 p-10">
             <div className="flex items-center justify-between">
                <div>
                   <EduCardTitle className="text-3xl font-black italic tracking-tighter">Academic Analytics</EduCardTitle>
                   <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Real-time performance metrics by subject</EduCardDescription>
                </div>
                <div className="h-16 w-16 rounded-[1.75rem] bg-violet-50 flex items-center justify-center text-violet-600 border border-violet-100">
                   <TrendingUp size={32} />
                </div>
             </div>
          </EduCardHeader>
          <EduCardContent className="p-10 space-y-12">
            {[
              { subject: 'Mathematics', progress: 92, lastScore: 94, trend: 'up', color: 'indigo' },
              { subject: 'Science', progress: 85, lastScore: 82, trend: 'up', color: 'emerald' },
              { subject: 'English', progress: 78, lastScore: 88, trend: 'down', color: 'rose' },
              { subject: 'History', progress: 95, lastScore: 92, trend: 'up', color: 'amber' },
            ].map((sub, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", 
                      sub.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
                      sub.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                      sub.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    )}>
                       <BookOpen size={20} />
                    </div>
                    <div>
                       <span className="text-lg font-black text-slate-900 leading-none italic">{sub.subject}</span>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Section Alpha-02</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm font-black text-slate-900">Score: {sub.lastScore}%</span>
                      {sub.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingUp className="w-4 h-4 text-rose-500 rotate-180" />}
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Updated 2h ago</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${sub.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={cn("h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]",
                      sub.color === 'indigo' ? 'bg-indigo-600' : 
                      sub.color === 'emerald' ? 'bg-emerald-600' :
                      sub.color === 'rose' ? 'bg-rose-600' : 'bg-amber-600'
                    )}
                  />
                </div>
              </div>
            ))}
          </EduCardContent>
          <div className="p-10 bg-slate-50/50 border-t border-slate-50 flex justify-center">
             <EduButton variant="ghost" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 tracking-[0.4em] uppercase hover:bg-white h-12">VIEW FULL GRADE ARCHIVE</EduButton>
          </div>
        </EduCard>

        <div className="lg:col-span-4 space-y-10">
           <EduCard className="border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem] overflow-hidden" animate>
             <EduCardHeader className="border-b border-slate-50 bg-slate-50/20 p-10">
               <EduCardTitle className="text-2xl font-black italic tracking-tighter">Intelligence Hub</EduCardTitle>
               <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Upcoming events and notifications</EduCardDescription>
             </EduCardHeader>
             <EduCardContent className="p-10 space-y-8">
               {[
                 { title: 'Parent-Teacher Meet', date: '22 Nov, 03:00 PM', location: 'Hall A', type: 'MEETING' },
                 { title: 'Annual Science Fair', date: '05 Dec, 09:00 AM', location: 'Campus Yard', type: 'EVENT' },
                 { title: 'Term 1 Exam Cycle', date: '15 Dec, 08:00 AM', location: 'Rooms 101-402', type: 'ACADEMIC' },
               ].map((ev, i) => (
                 <div key={i} className="group relative p-6 bg-slate-50/50 rounded-[2rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className="absolute top-6 right-6">
                       <ArrowUpRight size={18} className="text-slate-200 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-3">{ev.date}</p>
                    <h4 className="font-black text-slate-900 text-base italic leading-tight">{ev.title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3 flex items-center gap-2">
                       <Clock size={12} /> {ev.location}
                    </p>
                 </div>
               ))}
               <EduButton variant="secondary" className="w-full h-14 rounded-2xl text-[10px] font-black tracking-widest uppercase border-slate-200 mt-4">
                  SCHOOL CALENDAR
               </EduButton>
             </EduCardContent>
           </EduCard>

           <EduCard className="bg-slate-950 text-white rounded-[3rem] border-none shadow-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                    <Heart size={32} className="text-rose-500 animate-pulse" />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black italic tracking-tighter">Support Node</h4>
                    <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">Connect directly with Alex's counselor or access mental health resources.</p>
                 </div>
                 <EduButton variant="glass" className="w-full h-14 rounded-2xl text-[10px] font-black tracking-widest uppercase bg-white/5 border-white/5 hover:bg-white/10">INITIATE SECURE CHAT</EduButton>
              </div>
           </EduCard>
        </div>
      </div>
    </div>
  );
}