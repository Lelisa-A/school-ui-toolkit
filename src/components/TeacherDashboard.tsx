import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ClipboardList
} from 'lucide-react';
import { cn } from '../lib/utils';

export function TeacherView() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teacher Portal</h1>
          <p className="text-slate-500">Managing Grade 10-A Science Class</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            <ClipboardList className="w-4 h-4" />
            Mark Attendance
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all">
            <Plus className="w-4 h-4" />
            New Assignment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Active Assignments */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Current Assignments</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { title: 'Photosynthesis Lab Report', subject: 'Biology', submissions: 24, total: 30, due: 'In 2 days', status: 'active' },
                { title: 'Periodic Table Quiz', subject: 'Chemistry', submissions: 28, total: 30, due: 'Tomorrow', status: 'urgent' },
                { title: 'Newtonian Physics Problems', subject: 'Physics', submissions: 12, total: 30, due: 'In 5 days', status: 'active' },
              ].map((assignment, i) => (
                <div key={i} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          assignment.status === 'urgent' ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"
                        )}>
                          {assignment.subject}
                        </span>
                        <span className="text-xs text-slate-400">• {assignment.due}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{assignment.title}</h4>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500">Submissions</span>
                      <span className="text-xs font-bold text-indigo-600">{assignment.submissions}/{assignment.total} Students</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          assignment.status === 'urgent' ? "bg-rose-500" : "bg-indigo-500"
                        )}
                        style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Performance Mini Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Student Progress</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search student..."
                    className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Grade Avg</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Alex Thompson', avatar: 'AT', attendance: '98%', grade: 'A+', status: 'excel' },
                    { name: 'Sarah Miller', avatar: 'SM', attendance: '85%', grade: 'B', status: 'avg' },
                    { name: 'James Wilson', avatar: 'JW', attendance: '72%', grade: 'C-', status: 'risk' },
                    { name: 'Emily Chen', avatar: 'EC', attendance: '94%', grade: 'A', status: 'excel' },
                  ].map((student, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                            {student.avatar}
                          </div>
                          <span className="text-sm font-semibold text-slate-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{student.attendance}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{student.grade}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                          student.status === 'excel' ? "bg-emerald-100 text-emerald-700" :
                          student.status === 'avg' ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
                        )}>
                          {student.status === 'excel' ? 'Excelling' : student.status === 'avg' ? 'Stable' : 'At Risk'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Upcoming Schedule */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-500" />
              Today's Classes
            </h3>
            <div className="space-y-6">
              {[
                { time: '08:00 AM', subject: 'Advanced Physics', room: 'Lab 2', active: true },
                { time: '10:30 AM', subject: 'Basic Chemistry', room: 'Hall A', active: false },
                { time: '01:00 PM', subject: 'Biology Seminar', room: 'Room 302', active: false },
              ].map((session, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                  {session.active && <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />}
                  <div className="mb-1 text-xs font-bold text-slate-400 uppercase tracking-widest">{session.time}</div>
                  <div className="font-bold text-slate-900">{session.subject}</div>
                  <div className="text-xs text-slate-500">{session.room}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-600/20">
            <h3 className="text-lg font-bold mb-4">Teaching Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-indigo-100 text-sm">Class Attendance</span>
                <span className="font-bold">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-100 text-sm">Grading Completed</span>
                <span className="font-bold">14/20</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-100 text-sm">Active Discussions</span>
                <span className="font-bold">8</span>
              </div>
              <div className="pt-4 mt-4 border-t border-indigo-500/50">
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}