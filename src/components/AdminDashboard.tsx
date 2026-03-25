import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings,
  Shield,
  Activity,
  Zap,
  Star
} from 'lucide-react';
import { EduCard } from './ui/EduCard';
import { EduButton } from './ui/EduButton';
import { StatCard } from './ui/StatCard';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">System Administration</h1>
          <p className="text-slate-500 font-semibold mt-1">Institutional overview and network operations node.</p>
        </div>
        <div className="flex gap-2">
           <EduButton variant="primary" className="rounded-2xl h-12 px-6 font-black uppercase tracking-widest text-[10px]">Generate Report</EduButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="1,248" 
          icon={<Users size={24} />} 
          trend={{ value: 12, isPositive: true }} 
          color="indigo" 
        />
        <StatCard 
          title="Faculty Members" 
          value="86" 
          icon={<GraduationCap size={24} />} 
          trend={{ value: 2, isPositive: true }} 
          color="amber" 
        />
        <StatCard 
          title="Library Volume" 
          value="4,285" 
          icon={<BookOpen size={24} />} 
          color="emerald" 
        />
        <StatCard 
          title="System Load" 
          value="14%" 
          icon={<Activity size={24} />} 
          trend={{ value: 5, isPositive: false }} 
          color="rose" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EduCard className="lg:col-span-2 p-8 border-none shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Infrastructure Logs</h3>
              <EduButton variant="secondary" size="sm" className="rounded-xl h-10 px-4">View All</EduButton>
           </div>
           <div className="space-y-4">
              {[
                 { event: 'Node Synchronized', time: '2 mins ago', color: 'emerald' },
                 { event: 'Database Backup Completed', time: '1 hour ago', color: 'indigo' },
                 { event: 'Network Spike Detected', time: '3 hours ago', color: 'amber' },
              ].map((log, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                       <div className={cn("w-3 h-3 rounded-full", 
                          log.color === 'emerald' ? "bg-emerald-500" :
                          log.color === 'indigo' ? "bg-indigo-500" : "bg-amber-500"
                       )} />
                       <span className="text-sm font-black text-slate-700">{log.event}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.time}</span>
                 </div>
              ))}
           </div>
        </EduCard>

        <EduCard className="p-8 border-none shadow-sm bg-slate-900 text-white relative overflow-hidden">
           <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400 mb-6">
                 <Shield size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Security Node</h3>
              <p className="text-slate-400 text-sm font-medium mb-8">Protocol level 4 active. All systems are operating within nominal parameters.</p>
              <EduButton className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl h-12 font-black uppercase tracking-widest text-[10px]">System Check</EduButton>
           </div>
           <Star className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12" />
        </EduCard>
      </div>
    </div>
  );
};