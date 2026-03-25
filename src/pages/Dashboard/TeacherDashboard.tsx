import React from 'react';
import { 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  MessageSquare,
  Clock,
  ChevronRight,
  TrendingUp,
  Calendar,
  MoreVertical,
  Plus,
  Video,
  FileText,
  CheckCircle2,
  AlertCircle,
  Bell
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from '../../components/ui/EduCard';
import { EduButton } from '../../components/ui/EduButton';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const TeacherDashboard = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 p-2 lg:p-4 pb-20"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Teacher Console</h1>
          <p className="text-slate-500 font-medium mt-1">Good morning, Prof. Sarah. You have 3 classes today.</p>
        </div>
        <div className="flex items-center gap-3">
          <EduButton variant="outline" className="rounded-2xl bg-white">
            <Calendar size={18} className="mr-2 text-indigo-600" />
            Schedule
          </EduButton>
          <EduButton variant="gradient" className="rounded-2xl">
            <Plus size={18} className="mr-2" />
            New Lesson
          </EduButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Classes" value="4" icon={<BookOpen size={24} />} color="blue" description="Current semester" />
        <StatCard title="Total Students" value="128" icon={<Users size={24} />} color="purple" description="Across all sections" />
        <StatCard title="Grading Tasks" value="12" icon={<ClipboardCheck size={24} />} color="orange" trend={{ value: 4, isPositive: false }} />
        <StatCard title="Avg. Attendance" value="96%" icon={<TrendingUp size={24} />} color="green" trend={{ value: 1.2, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <EduCard className="lg:col-span-2 border-none ring-1 ring-slate-200">
          <EduCardHeader className="flex flex-row items-center justify-between">
            <div>
              <EduCardTitle>Today's Lectures</EduCardTitle>
              <EduCardDescription>Your teaching schedule for Monday, Oct 24</EduCardDescription>
            </div>
            <EduButton variant="ghost" size="sm" className="text-indigo-600 font-bold">
              Full Week
            </EduButton>
          </EduCardHeader>
          <EduCardContent className="space-y-4 mt-2">
            {[
              { time: '09:00 AM', end: '10:30 AM', subject: 'Advanced Mathematics', class: 'Grade 10-A', room: 'Room 302', type: 'In-person', color: 'bg-blue-500' },
              { time: '11:00 AM', end: '12:30 PM', subject: 'Physics Lab', class: 'Grade 11-B', room: 'Lab 1', type: 'Practical', color: 'bg-purple-500' },
              { time: '02:00 PM', end: '03:30 PM', subject: 'Calculus II', class: 'Grade 12-A', room: 'Virtual', type: 'Online', color: 'bg-emerald-500' },
            ].map((session, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ x: 5 }}
                className="flex items-center gap-6 p-5 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col items-center justify-center min-w-[100px] py-2 border-r border-slate-200">
                  <span className="text-sm font-black text-slate-900">{session.time}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">to {session.end}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-2 h-2 rounded-full", session.color)} />
                    <p className="text-base font-black text-slate-900 leading-none">{session.subject}</p>
                  </div>
                  <p className="text-xs font-bold text-slate-500">{session.class} • {session.room}</p>
                </div>
                <div className="flex items-center gap-3">
                  {session.type === 'Online' ? (
                    <EduButton variant="secondary" size="sm" className="rounded-xl bg-indigo-50 border-indigo-100 text-indigo-600">
                      <Video size={14} className="mr-1.5" /> Start
                    </EduButton>
                  ) : (
                    <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500">
                      {session.type}
                    </div>
                  )}
                  <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </EduCardContent>
        </EduCard>

        {/* Quick Actions & Notifications */}
        <div className="space-y-8">
          <EduCard className="border-none ring-1 ring-slate-200 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <EduCardHeader>
              <EduCardTitle className="text-white">Quick Actions</EduCardTitle>
            </EduCardHeader>
            <EduCardContent className="grid grid-cols-2 gap-3">
               {[
                 { label: 'Attendance', icon: CheckCircle2, bg: 'bg-white/10' },
                 { label: 'Assignments', icon: FileText, bg: 'bg-white/10' },
                 { label: 'Messages', icon: MessageSquare, bg: 'bg-white/10' },
                 { label: 'Grades', icon: TrendingUp, bg: 'bg-white/10' },
               ].map((action, i) => (
                 <button key={i} className={cn("flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-white hover:text-indigo-600 transition-all group", action.bg)}>
                   <action.icon size={24} className="mb-2 transition-transform group-hover:scale-110" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
                 </button>
               ))}
            </EduCardContent>
          </EduCard>

          <EduCard className="border-none ring-1 ring-slate-200">
            <EduCardHeader>
              <EduCardTitle>Pending Submissions</EduCardTitle>
              <EduCardDescription>Papers awaiting your review</EduCardDescription>
            </EduCardHeader>
            <EduCardContent className="space-y-4">
              {[
                { title: 'Algebra Quiz', count: 24, deadline: 'Today', color: 'text-rose-500' },
                { title: 'Physics Report', count: 18, deadline: 'Tomorrow', color: 'text-amber-500' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-black text-slate-900">{task.title}</p>
                    <p className="text-[10px] font-bold text-slate-400">{task.count} students submitted</p>
                  </div>
                  <div className="text-right">
                    <span className={cn("text-[10px] font-black uppercase", task.color)}>{task.deadline}</span>
                    <EduButton variant="ghost" size="icon" className="h-8 w-8 ml-2">
                      <ChevronRight size={16} />
                    </EduButton>
                  </div>
                </div>
              ))}
            </EduCardContent>
          </EduCard>
        </div>
      </div>

      {/* Student Performance Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EduCard className="border-none ring-1 ring-slate-200">
          <EduCardHeader>
            <EduCardTitle>Alerts & Notices</EduCardTitle>
          </EduCardHeader>
          <EduCardContent className="space-y-4">
            {[
              { icon: AlertCircle, text: 'Faculty meeting at 4 PM in Staff Room', color: 'text-rose-500', bg: 'bg-rose-50' },
              { icon: Bell, text: 'Lab equipment maintenance scheduled for Friday', color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((notice, i) => (
              <div key={i} className={cn("flex gap-3 p-4 rounded-2xl border border-transparent", notice.bg)}>
                <notice.icon size={18} className={notice.color} />
                <p className="text-xs font-bold text-slate-700 leading-tight">{notice.text}</p>
              </div>
            ))}
          </EduCardContent>
        </EduCard>

        <EduCard className="lg:col-span-2 border-none ring-1 ring-slate-200 overflow-hidden">
          <EduCardHeader className="flex flex-row items-center justify-between">
            <div>
              <EduCardTitle>Student Insights</EduCardTitle>
              <EduCardDescription>Performance tracking per section</EduCardDescription>
            </div>
            <EduButton variant="outline" size="sm" className="rounded-xl">Filter by Class</EduButton>
          </EduCardHeader>
          <EduCardContent>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: 'Grade 10-A', progress: 85, trend: 'up', students: 32 },
                 { name: 'Grade 11-B', progress: 72, trend: 'down', students: 28 },
                 { name: 'Grade 12-A', progress: 91, trend: 'up', students: 30 },
                 { name: 'Grade 9-C', progress: 68, trend: 'up', students: 38 },
               ].map((section, i) => (
                 <div key={i} className="p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                   <div className="flex items-center justify-between mb-4">
                     <div>
                       <p className="text-sm font-black text-slate-900">{section.name}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{section.students} Students</p>
                     </div>
                     <div className={cn("p-2 rounded-xl bg-white shadow-sm border border-slate-100", section.trend === 'up' ? 'text-emerald-500' : 'text-rose-500')}>
                        {section.trend === 'up' ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />}
                     </div>
                   </div>
                   <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                       <span>Average Performance</span>
                       <span>{section.progress}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${section.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className={cn("h-full rounded-full", section.progress > 80 ? 'bg-indigo-600' : section.progress > 70 ? 'bg-amber-500' : 'bg-rose-500')} 
                       />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </EduCardContent>
        </EduCard>
      </div>
    </motion.div>
  );
};