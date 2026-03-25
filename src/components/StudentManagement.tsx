import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Download, 
  Eye, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { cn } from '../lib/utils';

export function StudentManagement() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { id: 'STU001', name: 'Alex Thompson', grade: '10th', section: 'A', status: 'Active', gpa: '3.8', email: 'alex.t@school.edu' },
    { id: 'STU002', name: 'Sarah Miller', grade: '10th', section: 'B', status: 'Active', gpa: '3.5', email: 's.miller@school.edu' },
    { id: 'STU003', name: 'James Wilson', grade: '11th', section: 'A', status: 'On Leave', gpa: '3.2', email: 'j.wilson@school.edu' },
    { id: 'STU004', name: 'Emily Chen', grade: '9th', section: 'C', status: 'Active', gpa: '3.9', email: 'e.chen@school.edu' },
    { id: 'STU005', name: 'Michael Brown', grade: '12th', section: 'A', status: 'Active', gpa: '3.7', email: 'm.brown@school.edu' },
  ];

  if (selectedStudent) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedStudent(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to list
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-32 bg-indigo-600"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-8">
              <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden bg-slate-100 shadow-lg">
                <img src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&background=6366f1&color=fff&size=128`} alt={selectedStudent.name} />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Message</button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700">Edit Profile</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedStudent.name}</h2>
                  <p className="text-slate-500">Student ID: {selectedStudent.id} • {selectedStudent.grade} Grade, Section {selectedStudent.section}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Attendance', value: '94%' },
                    { label: 'Current GPA', value: selectedStudent.gpa },
                    { label: 'Credits', value: '112/120' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">Academic History</h3>
                  <div className="space-y-3">
                    {['Mathematics - A', 'Physics - A-', 'English Literature - B+'].map((course, i) => (
                      <div key={i} className="flex justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <span className="font-medium text-slate-700">{course.split(' - ')[0]}</span>
                        <span className="font-bold text-indigo-600">{course.split(' - ')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                  <h3 className="font-bold text-slate-900">Contact Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                      <p className="text-sm font-medium text-slate-700">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Phone</p>
                      <p className="text-sm font-medium text-slate-700">+1 (555) 000-0000</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Guardian</p>
                      <p className="text-sm font-medium text-slate-700">Robert {selectedStudent.name.split(' ')[1]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-slate-500">Manage and monitor student records across all grades</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all">
            <UserPlus className="w-4 h-4" />
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Grade/Section</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">GPA</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{student.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.grade}-{student.section}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(parseFloat(student.gpa) / 4) * 100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{student.gpa}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                      student.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 md:p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 1 to 5 of 1,248 students</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-bold">1</button>
            <button className="px-3 py-1 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">2</button>
            <button className="px-3 py-1 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">3</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}