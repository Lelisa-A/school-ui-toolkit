import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle, Clock, AlertTriangle, Send, MoreHorizontal, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PermissionGate } from '../auth/PermissionGate';

const assignments = [
  { id: '1', title: 'Calculus III - Integration Techniques', deadline: 'Today, 11:59 PM', submitted: 28, total: 32, status: 'Active' },
  { id: '2', title: 'World War II Historical Essay', deadline: 'Jun 14, 2024', submitted: 15, total: 32, status: 'Active' },
  { id: '3', title: 'Chemical Reactions Lab Report', deadline: 'Jun 10, 2024', submitted: 32, total: 32, status: 'Graded' },
];

export const TeacherPortal = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teacher's Workspace</h1>
          <p className="text-slate-500 text-sm">Manage classes, grade assignments, and track student progress.</p>
        </div>
        <div className="flex gap-3">
           <PermissionGate permission="assignments:manage">
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
               <FileText className="w-4 h-4" /> Lesson Plan
             </button>
             <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center gap-2">
               <Send className="w-4 h-4" /> Post Assignment
             </button>
           </PermissionGate>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
          <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-sm font-medium opacity-80 mb-1">Assigned Tasks</h3>
          <p className="text-3xl font-bold mb-4">12 Pending</p>
          <div className="flex items-center gap-2 text-xs bg-white/20 w-fit px-2 py-1 rounded-lg">
             <AlertTriangle className="w-3 h-3" /> 3 deadlines today
          </div>
        </div>
        <div className="bg-emerald-500 p-6 rounded-3xl text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
          <CheckCircle className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-sm font-medium opacity-80 mb-1">Graded This Week</h3>
          <p className="text-3xl font-bold mb-4">84 Students</p>
          <div className="flex items-center gap-2 text-xs bg-white/20 w-fit px-2 py-1 rounded-lg">
             <CheckCircle className="w-3 h-3" /> 100% completion
          </div>
        </div>
        <div className="bg-amber-500 p-6 rounded-3xl text-white shadow-xl shadow-amber-100 relative overflow-hidden group">
          <User className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-sm font-medium opacity-80 mb-1">Active Classes</h3>
          <p className="text-3xl font-bold mb-4">4 Sections</p>
          <div className="flex items-center gap-2 text-xs bg-white/20 w-fit px-2 py-1 rounded-lg">
             <Clock className="w-3 h-3" /> 18 hours/week
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Current Assignments</h3>
          <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {assignments.map((item) => (
            <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  item.status === 'Graded' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                )}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> Due: {item.deadline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Submissions</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500" 
                        style={{ width: `${(item.submitted / item.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.submitted}/{item.total}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                   <PermissionGate permission="grades:manage">
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">Grade</button>
                   </PermissionGate>
                   <PermissionGate permission="assignments:manage">
                      <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-400">
                         <MoreHorizontal className="w-5 h-5" />
                      </button>
                   </PermissionGate>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};