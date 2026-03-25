import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  GraduationCap, 
  MessageSquare, 
  Trophy,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export function StudentDashboard() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Alex!</h1>
          <p className="text-slate-500">Grade 10-A • Student ID: #EDU-2023-014</p>
        </div>
        <div className="bg-indigo-50 px-4 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Attendance</p>
            <p className="text-xl font-bold text-indigo-700">96.4%</p>
          </div>
          <div className="w-[2px] h-8 bg-indigo-200/50"></div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">GPA</p>
            <p className="text-xl font-bold text-indigo-700">3.82</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Assignments */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Upcoming Tasks</h3>
              <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Calculus Assignment 4', subject: 'Mathematics', due: 'Tomorrow, 11:59 PM', priority: 'high' },
                { title: 'History Essay Draft', subject: 'History', due: 'Nov 18, 2023', priority: 'medium' },
                { title: 'Chemistry Lab Prep', subject: 'Science', due: 'Nov 20, 2023', priority: 'low' },
              ].map((task, i) => (
                <div key={i} className="group p-4 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 border border-transparent hover:border-indigo-100 rounded-2xl transition-all duration-300 flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    task.priority === 'high' ? "bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white" :
                    task.priority === 'medium' ? "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white" :
                    "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  )}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{task.title}</h4>
                    <p className="text-xs font-medium text-slate-500">{task.subject} • Due {task.due}</p>
                  </div>
                  <button className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
                    Submit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Recent Grades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { subject: 'Physics', score: '92/100', grade: 'A', date: '2 days ago', color: 'indigo' },
                { subject: 'English Lit', score: '85/100', grade: 'B+', date: 'Last week', color: 'emerald' },
                { subject: 'French', score: '78/100', grade: 'B-', date: '2 weeks ago', color: 'violet' },
                { subject: 'Geography', score: '98/100', grade: 'A+', date: 'Oct 30', color: 'fuchsia' },
              ].map((grade, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                      grade.color === 'indigo' ? "bg-indigo-500" :
                      grade.color === 'emerald' ? "bg-emerald-500" :
                      grade.color === 'violet' ? "bg-violet-500" : "bg-fuchsia-500"
                    )}>
                      {grade.grade}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{grade.subject}</p>
                      <p className="text-xs text-slate-500">{grade.date}</p>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900">{grade.score}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Class Schedule Card */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-900/20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Today's Class</h3>
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-8">
              <div className="relative pl-6 border-l-2 border-indigo-500">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-500" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Class</p>
                <h4 className="font-bold text-lg">World History</h4>
                <p className="text-sm text-indigo-400 font-medium">Room 302 • Mr. Miller</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="classmate" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">+24 classmates</span>
                </div>
              </div>
              <div className="relative pl-6 border-l-2 border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">11:30 AM</p>
                <h4 className="font-bold text-slate-300">Advanced Mathematics</h4>
                <p className="text-sm text-slate-500 font-medium">Math Hall • Ms. Sarah</p>
              </div>
            </div>
            <button className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20">
              Join Virtual Class
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 bg-white border border-slate-100 rounded-3xl hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col items-center gap-3">
              <div className="p-3 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 transition-colors">
                <BookOpen className="w-6 h-6 text-indigo-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Library</span>
            </button>
            <button className="p-6 bg-white border border-slate-100 rounded-3xl hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/5 transition-all group flex flex-col items-center gap-3">
              <div className="p-3 bg-violet-50 rounded-2xl group-hover:bg-violet-600 transition-colors">
                <MessageSquare className="w-6 h-6 text-violet-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}