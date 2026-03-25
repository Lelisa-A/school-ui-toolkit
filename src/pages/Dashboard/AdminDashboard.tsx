import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Activity, 
  Shield,
  Zap,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import { EduCard } from '../../components/ui/EduCard';
import { EduBadge } from '../../components/ui/EduBadge';
import { EduButton } from '../../components/ui/EduButton';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const data = [
  { name: 'Jan', value: 4000, growth: 2400 },
  { name: 'Feb', value: 3000, growth: 1398 },
  { name: 'Mar', value: 2000, growth: 9800 },
  { name: 'Apr', value: 2780, growth: 3908 },
  { name: 'May', value: 1890, growth: 4800 },
  { name: 'Jun', value: 2390, growth: 3800 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const distributionData = [
  { name: 'Active', value: 400 },
  { name: 'On Leave', value: 300 },
  { name: 'Graduated', value: 300 },
  { name: 'Probation', value: 200 },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                <Shield className="text-white" size={16} />
             </div>
             <EduBadge variant="primary" className="font-black tracking-[0.2em] text-[10px] uppercase px-4 py-1.5 rounded-full">Systems Online</EduBadge>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Administrative Gateway</h1>
          <p className="text-slate-500 font-bold mt-3 max-w-xl text-lg leading-relaxed">Central oversight for institutional operations, academic performance, and resource distribution.</p>
        </div>
        <div className="flex gap-4">
           <EduCard className="bg-slate-950 p-6 border-none shadow-2xl flex items-center gap-6 group hover:scale-105 transition-transform duration-500">
              <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                 <Zap size={32} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Total Enrollment</p>
                 <h3 className="text-3xl font-black text-white tracking-tighter">1,248</h3>
              </div>
           </EduCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Academic Index', value: '92.4', icon: GraduationCap, color: 'indigo', trend: '+4.2%' },
          { label: 'Resource Load', value: '78%', icon: BookOpen, color: 'emerald', trend: '-2.1%' },
          { label: 'Staff Efficiency', value: '85%', icon: Users, color: 'amber', trend: '+0.8%' },
          { label: 'System Health', value: '99.9%', icon: Activity, color: 'blue', trend: 'Stable' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <EduCard className="p-8 border-none shadow-xl shadow-slate-200/50 group hover:shadow-2xl transition-all relative overflow-hidden">
              <div className={cn("absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform", 
                stat.color === 'indigo' ? "text-indigo-600" :
                stat.color === 'emerald' ? "text-emerald-600" :
                stat.color === 'amber' ? "text-amber-600" : "text-blue-600"
              )}>
                 <stat.icon size={80} />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("p-4 rounded-[1.25rem]", 
                    stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                    stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                    stat.color === 'amber' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                  )}>
                    <stat.icon size={28} />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase",
                    stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : stat.trend === 'Stable' ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {stat.trend.startsWith('+') ? <ArrowUpRight size={12} /> : stat.trend.startsWith('-') ? <ArrowDownRight size={12} /> : null}
                    {stat.trend}
                  </div>
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
              </div>
            </EduCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EduCard className="lg:col-span-2 p-10 border-none shadow-2xl shadow-slate-200/60 overflow-hidden relative">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Velocity</h3>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Growth vs Projection Matrix</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Projection</span>
                 </div>
              </div>
           </div>
           
           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 11, fontWeight: 900, fill: '#cbd5e1' }}
                       dy={15}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 11, fontWeight: 900, fill: '#cbd5e1' }}
                    />
                    <Tooltip 
                       contentStyle={{ 
                          borderRadius: '24px', 
                          border: 'none', 
                          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                          fontSize: '12px',
                          fontWeight: 900,
                          padding: '20px'
                       }} 
                    />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={6} fillOpacity={1} fill="url(#colorVal)" />
                    <Area type="monotone" dataKey="growth" stroke="#f1f5f9" strokeWidth={2} fill="transparent" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </EduCard>

        <EduCard className="p-10 border-none shadow-2xl shadow-slate-200/60">
           <div className="mb-12">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">System Node Load</h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Distribution Analysis</p>
           </div>

           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={distributionData}
                       cx="50%"
                       cy="50%"
                       innerRadius={80}
                       outerRadius={120}
                       paddingAngle={8}
                       dataKey="value"
                    >
                       {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>

           <div className="space-y-4 mt-8">
              {distributionData.map((item, i) => (
                 <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                       <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-slate-900">{item.value} units</span>
                 </div>
              ))}
           </div>
        </EduCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <EduCard className="lg:col-span-3 p-10 border-none shadow-2xl shadow-slate-200/60">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Infrastructure</h3>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Resource Utilization Log</p>
               </div>
               <EduButton variant="secondary" className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[10px]">Export Logs</EduButton>
            </div>
            
            <div className="space-y-4">
               {[
                  { label: 'Main Server Cluster', status: 'Operational', color: 'emerald', load: '12%' },
                  { label: 'Library API Bridge', status: 'Optimal', color: 'indigo', load: '45%' },
                  { label: 'Asset DB Sync', status: 'Processing', color: 'amber', load: '82%' },
               ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-slate-100">
                     <div className="flex items-center gap-6">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", 
                           log.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                           log.color === 'indigo' ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"
                        )}>
                           <Globe size={24} />
                        </div>
                        <div>
                           <h4 className="font-black text-slate-900 tracking-tight">{log.label}</h4>
                           <div className="flex items-center gap-2 mt-1">
                              <div className={cn("w-2 h-2 rounded-full animate-pulse", 
                                 log.color === 'emerald' ? "bg-emerald-500" :
                                 log.color === 'indigo' ? "bg-indigo-500" : "bg-amber-500"
                              )} />
                              <span className={cn("text-[10px] font-black uppercase tracking-widest", 
                                 log.color === 'emerald' ? "text-emerald-600" :
                                 log.color === 'indigo' ? "text-indigo-600" : "text-amber-600"
                              )}>{log.status}</span>
                           </div>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Load Factor</p>
                        <p className="text-xl font-black text-slate-900">{log.load}</p>
                     </div>
                  </div>
               ))}
            </div>
         </EduCard>

         <EduCard className="p-10 border-none shadow-2xl shadow-indigo-600/10 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
               <Sparkles size={120} />
            </div>
            <div className="relative h-full flex flex-col justify-between">
               <div>
                  <h3 className="text-3xl font-black tracking-tighter italic">IntelliScan\u2122</h3>
                  <p className="text-indigo-100 text-sm font-bold mt-4 leading-relaxed">Automated diagnostic system identifies institutional bottlenecks in real-time.</p>
               </div>
               
               <div className="mt-12 space-y-6">
                  <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 mb-2">Recommendation</p>
                     <p className="text-xs font-bold leading-relaxed">Optimization of Grade 11-B resources could increase throughput by 14%.</p>
                  </div>
                  <EduButton className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl h-16 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-indigo-900/20">Initialize Boost</EduButton>
               </div>
            </div>
         </EduCard>
      </div>
    </div>
  );
};