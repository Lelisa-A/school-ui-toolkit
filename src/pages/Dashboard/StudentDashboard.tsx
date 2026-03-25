import React from 'react';
import { 
  Book, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Star,
  CheckCircle2,
  FileText,
  MessageSquare,
  ChevronRight,
  Zap,
  Award,
  Bell
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { StatCard } from '../../components/ui/StatCard';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from '../../components/ui/EduCard';
import { EduButton } from '../../components/ui/EduButton';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const studyProgressData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.2 },
  { day: 'Fri', hours: 3.0 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 4.0 },
];

export const StudentDashboard = () => {
  return (
    <div className="space-y-10 p-2 lg:p-4 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-violet-700 p-8 lg:p-12 text-white shadow-2xl shadow-indigo-200"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 blur-2xl rounded-full -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-black uppercase tracking-widest">
              <Zap size={14} className="text-amber-400" />
              Academic Year 2024
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to learn,<br />Ethan Hunt?
            </h1>
            <p className="text-indigo-100 max-w-md font-medium text-lg">
              You've completed 85% of your weekly goals. Keep up the amazing work!
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <EduButton variant="secondary" className="rounded-2xl px-8 shadow-xl">
                My Courses
              </EduButton>
              <EduButton variant="ghost" className="text-white hover:bg-white/10 border border-white/20 rounded-2xl">
                View Schedule
              </EduButton>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150" />
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/students-library-1-db587d49-1773641145681.webp" 
                alt="Student" 
                className="w-80 h-80 object-cover rounded-[3rem] shadow-2xl relative z-10 border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="GPA" 
          value="3.8" 
          icon={<Star size={24} />} 
          trend={{ value: 5, isPositive: true }} 
          color="amber"
          description="Out of 4.0"
        />
        <StatCard 
          title="Attendance" 
          value="98%" 
          icon={<Clock size={24} />} 
          trend={{ value: 2, isPositive: true }} 
          color="indigo" 
          description="Current semester"
        />
        <StatCard 
          title="Assignments" 
          value="12/14" 
          icon={<FileText size={24} />} 
          trend={{ value: 0, isPositive: true }} 
          color="indigo"
          description="Due this week"
        />
        <StatCard 
          title="Certificates" 
          value="4" 
          icon={<Award size={24} />} 
          trend={{ value: 1, isPositive: true }} 
          color="rose"
          description="Earned this year"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EduCard className="lg:col-span-2 border-none ring-1 ring-slate-200">
          <EduCardHeader className="flex flex-row items-center justify-between">
            <div>
              <EduCardTitle>Study Hours</EduCardTitle>
              <EduCardDescription>Time spent on learning platforms</EduCardDescription>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </EduCardHeader>
          <EduCardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyProgressData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '20px', 
                      border: 'none', 
                      boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                      padding: '12px 16px',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorHours)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </EduCardContent>
        </EduCard>

        <EduCard className="border-none ring-1 ring-slate-200 bg-gradient-to-br from-white to-slate-50">
          <EduCardHeader>
            <EduCardTitle>Coming Up Next</EduCardTitle>
            <EduCardDescription>Your next scheduled class</EduCardDescription>
          </EduCardHeader>
          <EduCardContent className="space-y-6">
            <div className="p-6 rounded-3xl bg-indigo-600 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mb-1">In 15 Minutes</p>
              <h3 className="text-2xl font-black mb-1 leading-tight">Advanced Quantum Physics</h3>
              <p className="text-indigo-100 text-sm font-medium mb-6">Room 402 \u2022 Prof. Richard Feynman</p>
              <EduButton variant="secondary" size="sm" className="w-full rounded-2xl">
                Join Virtual Class
              </EduButton>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Upcoming Tasks</h4>
              {[
                { title: 'Math Quiz', time: 'Tomorrow, 10:00 AM', color: 'bg-rose-500' },
                { title: 'History Essay', time: 'Wed, 11:30 PM', color: 'bg-amber-500' },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className={cn("w-1.5 h-10 rounded-full", task.color)} />
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900">{task.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{task.time}</p>
                  </div>
                  <CheckCircle2 className="text-slate-200" size={20} />
                </div>
              ))}
            </div>
          </EduCardContent>
        </EduCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EduCard className="border-none ring-1 ring-slate-200">
          <EduCardHeader className="flex flex-row items-center justify-between">
            <EduCardTitle>Messages</EduCardTitle>
            <EduButton variant="ghost" size="icon" className="text-indigo-600">
              <MessageSquare size={18} />
            </EduButton>
          </EduCardHeader>
          <EduCardContent className="space-y-4">
            {[
              { name: 'Dr. Sarah Smith', text: 'Great job on the last project!', time: '10:45 AM', active: true },
              { name: 'Physics Group', text: 'When is the next meet?', time: 'Yesterday', active: false },
            ].map((msg, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.name}`} alt={msg.name} />
                  </div>
                  {msg.active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-900 truncate">{msg.name}</p>
                  <p className="text-xs font-medium text-slate-500 truncate">{msg.text}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
              </div>
            ))}
          </EduCardContent>
        </EduCard>

        <EduCard className="lg:col-span-2 border-none ring-1 ring-slate-200 overflow-hidden">
          <EduCardHeader>
            <EduCardTitle>Recent Grades</EduCardTitle>
            <EduCardDescription>Latest academic evaluations</EduCardDescription>
          </EduCardHeader>
          <EduCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { subject: 'Mathematics', score: '95/100', grade: 'A+', date: 'Oct 20', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { subject: 'History', score: '88/100', grade: 'A', date: 'Oct 18', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                { subject: 'Physics Lab', score: '42/50', grade: 'B+', date: 'Oct 15', color: 'text-amber-500', bg: 'bg-amber-50' },
                { subject: 'English Lit', score: '92/100', grade: 'A', date: 'Oct 12', color: 'text-rose-500', bg: 'bg-rose-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm", item.bg, item.color)}>
                      {item.grade}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{item.subject}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">{item.score}</p>
                    <div className="h-1 w-20 bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div className={cn("h-full", item.color.replace('text', 'bg'))} style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EduCardContent>
        </EduCard>
      </div>
    </div>
  );
};