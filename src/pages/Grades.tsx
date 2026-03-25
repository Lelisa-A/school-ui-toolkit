import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell
} from 'recharts';
import { EduCard } from '../components/ui/EduCard';
import { EduBadge } from '../components/ui/EduBadge';
import { TrendingUp, Users, BookOpen, Star, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const performanceData = [
  { name: 'Grade 9', score: 85, attendance: 92 },
  { name: 'Grade 10', score: 78, attendance: 88 },
  { name: 'Grade 11', score: 92, attendance: 95 },
  { name: 'Grade 12', score: 88, attendance: 90 },
];

const subjectData = [
  { name: 'Math', students: 400, average: 82 },
  { name: 'Science', students: 300, average: 75 },
  { name: 'History', students: 200, average: 88 },
  { name: 'Arts', students: 150, average: 94 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const Grades: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Academic Analytics</h1>
          <p className="text-slate-500 font-semibold mt-1">Real-time performance metrics and grade distributions.</p>
        </div>
        <div className="flex gap-3">
          <EduCard className="flex items-center gap-3 py-2 px-4 border-2 border-slate-100 shadow-none">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Semester 1 - 2024</span>
          </EduCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Overall GPA', value: '3.8', icon: Star, color: 'indigo' },
          { label: 'Pass Rate', value: '94.2%', icon: TrendingUp, color: 'emerald' },
          { label: 'Total Assessments', value: '1,248', icon: BookOpen, color: 'amber' },
          { label: 'Enrolled Students', value: '850', icon: Users, color: 'blue' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <EduCard className="p-6 relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${stat.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </EduCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EduCard className="p-8 border-none shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Performance by Grade</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score vs Attendance</p>
            </div>
            <EduBadge variant="secondary">LATEST DATA</EduBadge>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 800, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 800, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 700
                  }} 
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={4} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </EduCard>

        <EduCard className="p-8 border-none shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Subject Mastery</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Average Score Distribution</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Grade</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 800, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 800, fill: '#94a3b8' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 700
                  }} 
                />
                <Bar dataKey="average" radius={[12, 12, 12, 12]} barSize={40}>
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </EduCard>
      </div>

      <EduCard className="p-8 border-none shadow-xl shadow-slate-200/50">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex gap-6">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Highest Performing Class</span>
                  <span className="text-xl font-black text-indigo-600">Grade 11-A (92.4%)</span>
               </div>
               <div className="flex flex-col border-l border-slate-100 pl-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subject of the Week</span>
                  <span className="text-xl font-black text-emerald-600">Pure Mathematics</span>
               </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                  <Star fill="currentColor" size={20} />
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">Achievement Unlocked</p>
                  <p className="text-xs text-slate-500 font-medium">95% completion rate for Semester 1 finals.</p>
               </div>
            </div>
         </div>
      </EduCard>
    </div>
  );
};