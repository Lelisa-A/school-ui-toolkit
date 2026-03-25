import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, Mail, ArrowUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PermissionGate } from '../auth/PermissionGate';
import { usePermissions } from '../../hooks/usePermissions';

const mockStudents = [
  { id: '1', name: 'Alice Thompson', grade: '10th', section: 'A', email: 'alice.t@school.edu', status: 'Active', attendance: '98%' },
  { id: '2', name: 'Bob Richards', grade: '11th', section: 'B', email: 'bob.r@school.edu', status: 'Active', attendance: '94%' },
  { id: '3', name: 'Charlie Davis', grade: '9th', section: 'C', email: 'charlie.d@school.edu', status: 'On Leave', attendance: '88%' },
  { id: '4', name: 'Diana Prince', grade: '12th', section: 'A', email: 'diana.p@school.edu', status: 'Active', attendance: '99%' },
  { id: '5', name: 'Ethan Hunt', grade: '10th', section: 'B', email: 'ethan.h@school.edu', status: 'Suspended', attendance: '72%' },
];

export const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { hasPermission } = usePermissions();

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-sm text-slate-500">Manage, view and track all students in the institution.</p>
        </div>
        <PermissionGate permission="students:manage">
          <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Plus className="w-5 h-5" />
            <span>Register Student</span>
          </button>
        </PermissionGate>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white bg-white/50">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white bg-white/50">
              <ArrowUpDown className="w-4 h-4" /> Sort
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade/Section</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-slate-700">{student.grade}</p>
                      <p className="text-xs text-slate-500">Section {student.section}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      student.status === 'Active' ? "bg-emerald-100 text-emerald-700" :
                      student.status === 'On Leave' ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    )}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[100px] flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: student.attendance }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">{student.attendance}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <Mail className="w-4 h-4" />
                      </button>
                      <PermissionGate permission="students:manage">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </PermissionGate>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing 5 of 1,284 students</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};