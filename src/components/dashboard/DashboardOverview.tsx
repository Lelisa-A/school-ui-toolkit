import React from 'react';
import { 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Award,
  Zap,
  Star,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  MessageSquare,
  ArrowUpRight,
  Activity,
  Bell,
  FileText
} from 'lucide-react';
import { EduCard, EduCardHeader, EduCardTitle, EduCardContent, EduCardDescription } from '../ui/EduCard';
import { 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';
import { EduBadge } from '../ui/EduBadge';
import { EduButton } from '../ui/EduButton';
import { StatCard } from '../ui/StatCard';
import { motion } from 'framer-motion';
import { usePermissions } from '../../hooks/usePermissions';

const performanceData = [
  { name: 'Jan', score: 78, attendance: 92, engagement: 65, tasks: 45 },
  { name: 'Feb', score: 82, attendance: 94, engagement: 72, tasks: 52 },
  { name: 'Mar', score: 85, attendance: 91, engagement: 88, tasks: 48 },
  { name: 'Apr', score: 88, attendance: 95, engagement: 81, tasks: 65 },
  { name: 'May', score: 92, attendance: 96, engagement: 95, tasks: 78 },
  { name: 'Jun', score: 90, attendance: 98, engagement: 89, tasks: 72 },
];

const distributionData = [
  { name: 'Excellence (A)', value: 15, color: '#6366f1' },
  { name: 'Proficiency (B)', value: 35, color: '#818cf8' },
  { name: 'Growth (C)', value: 30, color: '#a5b4fc' },
  { name: 'Foundational (D)', value: 20, color: '#c7d2fe' },
];

export function DashboardOverview({ role }: { role: UserRole }) {
  const { hasRole } = usePermissions();
  const isStudent = hasRole(['STUDENT', 'PARENT']);

  const heroImg = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/school-banner-3-01f3838a-1773642243971.webp";
  const featureImg = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/school-banner-2-4fb17561-1773642243835.webp";

  return (
    <div className="space-y-16 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-[4rem] bg-slate-900 min-h-[500px] flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] group"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent z-10" />
         <img 
           src={heroImg} 
           className="absolute right-0 top-0 h-full w-full md:w-3/4 object-cover object-center opacity-50 md:opacity-100 transition-transform duration-[4s] group-hover:scale-110"
           alt="Dashboard Hero"
         />
         
         <div className="relative z-20 p-12 md:p-24 flex flex-col justify-center max-w-3xl gap-10">
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <EduBadge variant="indigo" className="bg-indigo-500 text-white border-none shadow-xl shadow-indigo-500/20 px-6 py-2 rounded-2xl text-[10px] tracking-[0.3em] font-black uppercase transition-transform hover:scale-105">
                     SYSTEM ONLINE
                  </EduBadge>
                  <div className="flex -space-x-3 transition-transform hover:translate-x-2 duration-500 cursor-pointer">
                     {[1,2,3,4,5].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?u=u${i}`} className="w-10 h-10 rounded-2xl border-4 border-slate-900 ring-1 ring-white/10 hover:z-30 transition-all" alt="" />
                     ))}
                     <div className="w-10 h-10 rounded-2xl bg-indigo-600 border-4 border-slate-900 flex items-center justify-center text-[10px] font-black text-white">+12</div>
                  </div>
               </div>
               <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] italic">
                  {isStudent ? 'Future' : 'Global'} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-500 animate-gradient-x">
                    Academy.
                  </span>
               </h1>
               <p className="text-slate-300 text-xl font-medium max-w-xl leading-relaxed opacity-80">
                  {isStudent 
                    ? "Welcome back to your personalized learning ecosystem. Track your progress, engage with peers, and excel in your academic journey."
                    : "Empowering administrators with real-time analytics, institutional control, and streamlined management for a smarter campus."}
               </p>
            </div>

            <div className="flex flex-wrap gap-5">
               <EduButton variant="gradient" size="lg" className="h-20 px-12 text-sm rounded-[2.25rem] shadow-2xl shadow-indigo-500/30 group">
                  Explore Hub <ArrowUpRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
               </EduButton>
               <EduButton variant="glass" size="lg" className="h-20 px-12 text-sm rounded-[2.25rem] border-white/20">
                  Active Intelligence
               </EduButton>
            </div>
         </div>

         <div className="absolute bottom-12 right-12 z-20 hidden lg:flex gap-16 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10">
            <div className="flex flex-col gap-2">
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Active Students</span>
               <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-white leading-none tracking-tighter">1,248</span>
                  <span className="text-xs text-emerald-400 font-bold mb-1">+5.2%</span>
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Efficiency Index</span>
               <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-white leading-none tracking-tighter">98.4%</span>
                  <span className="text-xs text-emerald-400 font-bold mb-1">MAX</span>
               </div>
            </div>
         </div>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {isStudent ? (
          <>
            <StatCard title="Academic GPA" value="3.85" icon={<Award size={30} />} color="indigo" trend={{ value: 4, isPositive: true }} description="Top 5% Rank" />
            <StatCard title="Presence" value="96.4%" icon={<CheckCircle2 size={30} />} color="indigo" trend={{ value: 1.2, isPositive: true }} description="Optimal" />
            <StatCard title="Tasks Done" value="18/24" icon={<Layers size={30} />} color="amber" description="75% Done" />
            <StatCard title="Global Rank" value="#12" icon={<Star size={30} />} color="indigo" description="Elite Tier" />
          </>
        ) : (
          <>
            <StatCard title="Student Body" value="1,248" icon={<Users size={30} />} color="indigo" trend={{ value: 5.2, isPositive: true }} description="Total Active" />
            <StatCard title="Attendance" value="94.8%" icon={<Activity size={30} />} color="indigo" trend={{ value: 0.8, isPositive: true }} description="Daily Mean" />
            <StatCard title="KPI Score" value="88.2%" icon={<Zap size={30} />} color="amber" trend={{ value: 2.1, isPositive: true }} description="Above Target" />
            <StatCard title="Faculty" value="86" icon={<GraduationCap size={30} />} color="indigo" description="Certified" />
          </>
        )}
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <EduCard variant="glass" className="lg:col-span-8 group border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]" hoverGlow>
          <EduCardHeader className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 md:p-16">
            <div className="space-y-2">
              <EduCardTitle className="text-4xl font-black tracking-tight">Academic Growth</EduCardTitle>
              <EduCardDescription className="text-slate-400 font-bold uppercase tracking-widest">Historical Performance Analysis</EduCardDescription>
            </div>
            <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-2xl">
               <button className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors">Weekly</button>
               <button className="px-6 py-3 text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 rounded-xl shadow-xl">Monthly</button>
            </div>
          </EduCardHeader>
          <EduCardContent className="p-12 md:p-16 pt-0">
            <div className="h-[400px] w-full pt-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 900}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 900}} dx={-15} />
                  <Tooltip 
                    cursor={{stroke: '#e2e8f0', strokeWidth: 2}}
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '24px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#6366f1" 
                    strokeWidth={6} 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    animationDuration={2500}
                    activeDot={{ r: 10, strokeWidth: 0, fill: '#6366f1' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    strokeDasharray="8 8"
                    fillOpacity={1} 
                    fill="url(#colorEng)" 
                    animationDuration={3000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap items-center gap-10 mt-12 p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
               <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>
                  <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Main Index</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-dashed animate-spin-slow"></div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Engagement</span>
               </div>
               <div className="ml-auto">
                  <EduButton variant="ghost" size="sm" className="text-indigo-600">Detailed Logs <ChevronRight size={14} className="ml-1" /></EduButton>
               </div>
            </div>
          </EduCardContent>
        </EduCard>

        <div className="lg:col-span-4 flex flex-col gap-10">
           <EduCard variant="slate" className="relative group min-h-[350px] overflow-hidden" hoverGlow>
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute top-10 right-10 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                <Sparkles size={180} />
              </div>
              <EduCardHeader className="p-10 relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.75rem] flex items-center justify-center text-indigo-400 mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                  <Star size={32} />
                </div>
                <EduCardTitle className="text-white text-3xl font-black italic">Leaderboard</EduCardTitle>
                <EduCardDescription className="text-slate-400 font-bold uppercase tracking-widest">Elite Cohorts 2024</EduCardDescription>
              </EduCardHeader>
              <EduCardContent className="p-10 pt-0 space-y-8 relative z-10">
                 {[
                   { name: 'Senior Grade A', score: 98.4, color: 'indigo' },
                   { name: 'Junior Science B', score: 94.2, color: 'purple' },
                   { name: 'Advanced Arts', score: 91.8, color: 'green' },
                 ].map((item, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-white uppercase tracking-widest">{item.name}</span>
                        <span className="text-xs font-black text-indigo-400">{item.score}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: "circOut" }}
                          className={cn("h-full rounded-full shadow-[0_0_10px_currentColor]", item.color === 'indigo' ? 'bg-indigo-500' : item.color === 'purple' ? 'bg-violet-500' : 'bg-emerald-500')} 
                        />
                      </div>
                   </div>
                 ))}
                 <EduButton variant="glass" size="md" className="w-full mt-4 h-14 rounded-2xl border-white/10">Open Global Ranking</EduButton>
              </EduCardContent>
           </EduCard>

           <EduCard variant="glass" className="flex-1 border-none shadow-xl" hoverGlow>
              <EduCardHeader className="p-10">
                 <EduCardTitle className="text-3xl font-black">Resource Flow</EduCardTitle>
                 <EduCardDescription className="font-bold uppercase tracking-widest">Allocation Matrix</EduCardDescription>
              </EduCardHeader>
              <EduCardContent className="p-10 pt-0 flex-1 flex flex-col justify-center">
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={95}
                        paddingAngle={12}
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-10">
                  {distributionData.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-lg">
                       <div className="h-3 w-3 rounded-full shrink-0 shadow-[0_0_8px_currentColor]" style={{ color: item.color, backgroundColor: item.color }} />
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{item.name.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </EduCardContent>
           </EduCard>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
          <EduCard className="border-none shadow-2xl shadow-indigo-100/30 group overflow-hidden" hoverGlow>
             <div className="absolute top-0 left-0 w-full h-48 overflow-hidden">
                <img src={featureImg} className="w-full h-full object-cover opacity-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
             </div>
             <EduCardHeader className="relative z-10 pt-32">
                <div className="flex items-center justify-between mb-4">
                   <EduCardTitle className="text-3xl font-black">Campus Feed</EduCardTitle>
                   <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100">
                      <Bell size={24} />
                   </div>
                </div>
                <EduCardDescription className="font-bold uppercase tracking-widest">Real-time Broadcasts</EduCardDescription>
             </EduCardHeader>
             <EduCardContent className="relative z-10 space-y-8 p-12 pt-0">
                {[
                  { title: 'New Quantum Lab Launch', date: 'OCT 24', color: 'bg-indigo-500', icon: Zap },
                  { title: 'Global Seminar Series', date: 'OCT 28', color: 'bg-emerald-500', icon: MessageSquare },
                  { title: 'Annual Gala Registration', date: 'NOV 02', color: 'bg-amber-500', icon: Star },
                ].map((item, i) => (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    key={i} 
                    className="flex items-center gap-6 group/item cursor-pointer p-2 rounded-2xl transition-colors hover:bg-slate-50"
                  >
                     <div className="flex flex-col items-center justify-center w-16 h-16 rounded-[1.25rem] bg-white shadow-xl shadow-slate-200/50 group-hover/item:shadow-indigo-100 border border-slate-50 transition-all">
                        <span className="text-[10px] font-black text-slate-400">{item.date.split(' ')[0]}</span>
                        <span className="text-lg font-black text-slate-900">{item.date.split(' ')[1]}</span>
                     </div>
                     <div className="flex-1">
                        <h4 className="font-black text-slate-800 text-lg leading-tight group-hover/item:text-indigo-600 transition-colors">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-2">
                           <item.icon size={14} className="text-slate-300" />
                           <div className={cn("h-1 w-12 rounded-full opacity-40", item.color)}></div>
                        </div>
                     </div>
                     <ArrowUpRight size={20} className="text-slate-200 group-hover/item:text-indigo-400 group-hover/item:translate-x-2 transition-all" />
                  </motion.div>
                ))}
                <EduButton 
                  permission="announcements:view" 
                  variant="secondary" 
                  className="w-full h-16 rounded-2xl mt-4"
                >
                  View Full Archive
                </EduButton>
             </EduCardContent>
          </EduCard>

          <EduCard className="border-none shadow-2xl shadow-slate-200/50 group" hoverGlow>
             <EduCardHeader className="p-12">
                <EduCardTitle className="text-3xl font-black">Active Modules</EduCardTitle>
                <EduCardDescription className="font-bold uppercase tracking-widest">Synchronized Environments</EduCardDescription>
             </EduCardHeader>
             <EduCardContent className="p-12 pt-0 space-y-6">
                {[
                  { class: 'Advanced Physics', teacher: 'Dr. Sarah Wilson', students: 32, progress: 65, color: 'bg-indigo-500' },
                  { class: 'Bio-Technology', teacher: 'Prof. John Davis', students: 28, progress: 82, color: 'bg-emerald-500' },
                  { class: 'Modern History', teacher: 'Ms. Emily Stone', students: 45, progress: 40, color: 'bg-amber-500' },
                  { class: 'AI Ethics', teacher: 'Dr. Alan Turing', students: 18, progress: 95, color: 'bg-violet-500' },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-slate-50/50 hover:bg-white hover:shadow-2xl transition-all border border-slate-100 group/module">
                     <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg text-indigo-500 border border-slate-50 group-hover/module:rotate-6 transition-transform">
                              <Layers size={22} />
                           </div>
                           <div>
                              <h4 className="font-black text-slate-900">{item.class}</h4>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.teacher}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="text-xs font-black text-indigo-600">{item.progress}%</span>
                        </div>
                     </div>
                     <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${item.progress}%` }}
                           transition={{ duration: 1.5, ease: "circOut" }}
                           className={cn("h-full rounded-full", item.color)}
                        />
                     </div>
                  </div>
                ))}
             </EduCardContent>
          </EduCard>
        </div>

        <EduCard variant="gradient" className="flex flex-col group min-h-[600px] border-none shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)]" hoverGlow>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <EduCardHeader className="p-12 relative z-10">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mb-10 backdrop-blur-xl border border-white/30 shadow-2xl"
              >
                 <Shield size={36} className="text-white" />
              </motion.div>
              <EduCardTitle className="text-white text-5xl font-black italic tracking-tighter leading-none">
                Enterprise<br/>Security
              </EduCardTitle>
              <EduCardDescription className="text-indigo-100 font-bold uppercase tracking-[0.2em] mt-4 opacity-80">
                Quantum Grade Protection
              </EduCardDescription>
           </EduCardHeader>
           <EduCardContent className="p-12 pt-0 relative z-10 flex-1 flex flex-col justify-between">
              <div className="space-y-8">
                 <p className="text-indigo-50 text-xl font-medium leading-relaxed opacity-90 italic">
                    "Your institutional data is protected by AES-256 encryption and multi-layer biometric authentication protocols."
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                    {[ 
                      { label: 'Uptime', val: '99.9%' }, 
                      { label: 'Scans', val: '12k+' },
                      { label: 'Encryp', val: 'RSA' },
                      { label: 'Threats', val: '0' }
                    ].map((s, i) => (
                      <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                         <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">{s.label}</p>
                         <p className="text-xl font-black text-white">{s.val}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="mt-12">
                 <EduButton 
                   permission="settings:manage"
                   variant="white" 
                   className="w-full h-20 rounded-[2rem] text-sm font-black text-indigo-700 shadow-2xl hover:scale-105 transition-all group"
                 >
                    Audit Security Protocol <Shield size={20} className="ml-3 transition-transform group-hover:scale-125" />
                 </EduButton>
              </div>
           </EduCardContent>
        </EduCard>
      </div>
    </div>
  );
}