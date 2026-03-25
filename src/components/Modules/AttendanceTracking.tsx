import React, { useState } from 'react';
import { Calendar, UserCheck, UserX, Clock, ChevronLeft, ChevronRight, FileSpreadsheet, Download } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { cn } from '../../lib/utils';

const students = [
  { id: '1', name: 'Alice Thompson', avatar: 'AT', status: 'present' },
  { id: '2', name: 'Bob Richards', avatar: 'BR', status: 'absent' },
  { id: '3', name: 'Charlie Davis', avatar: 'CD', status: 'present' },
  { id: '4', name: 'Diana Prince', avatar: 'DP', status: 'present' },
  { id: '5', name: 'Ethan Hunt', avatar: 'EH', status: 'late' },
];

export const AttendanceTracking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Register</h1>
          <p className="text-sm text-slate-500">Daily attendance tracking for Grade 10 - Section A</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-100">
            <Download className="w-4 h-4" /> Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-lg">{format(currentDate, 'MMMM yyyy')}</h3>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "aspect-square rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all relative group",
                  isSameDay(day, selectedDay) ? "bg-indigo-600 text-white shadow-lg" : "hover:bg-indigo-50 text-slate-600",
                  !isSameDay(day, selectedDay) && isToday(day) && "text-indigo-600 ring-2 ring-indigo-600 ring-inset"
                )}
              >
                {format(day, 'd')}
                {idx % 5 === 0 && !isSameDay(day, selectedDay) && (
                  <div className="absolute bottom-1 w-1 h-1 bg-rose-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-xl space-y-3">
             <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Working Days</span>
                <span className="font-bold text-slate-900">22</span>
             </div>
             <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Holidays</span>
                <span className="font-bold text-indigo-600">4</span>
             </div>
             <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">School Attendance</span>
                <span className="font-bold text-emerald-600">92.4%</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{format(selectedDay, 'EEEE, MMM d, yyyy')}</h3>
                <p className="text-xs text-slate-500">Class 10A • English Literature</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Present</p>
                <p className="text-lg font-bold text-emerald-600">28</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Absent</p>
                <p className="text-lg font-bold text-rose-500">2</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600">{student.avatar}</div>
                        <span className="font-semibold text-slate-800 text-sm">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                          student.status === 'present' ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-100 text-slate-400 hover:bg-emerald-50"
                        )}>
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                          student.status === 'absent' ? "bg-rose-500 text-white shadow-md shadow-rose-100" : "bg-slate-100 text-slate-400 hover:bg-rose-50"
                        )}>
                          <UserX className="w-4 h-4" />
                        </button>
                        <button className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                          student.status === 'late' ? "bg-amber-500 text-white shadow-md shadow-amber-100" : "bg-slate-100 text-slate-400 hover:bg-amber-50"
                        )}>
                          <Clock className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-500 font-medium">{student.status === 'present' ? '08:45 AM' : student.status === 'late' ? '09:12 AM' : '-'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-bold text-indigo-600 hover:underline">Add Note</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-slate-50/30">
            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};