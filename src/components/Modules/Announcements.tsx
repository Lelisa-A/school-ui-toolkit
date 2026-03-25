import React from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, Plus, Search, Clock, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const announcements = [
  { id: '1', title: 'Summer Vacation Schedule', content: 'The school will be closed for summer vacation from July 1st to August 15th. Regular classes will resume on August 16th.', date: 'Jun 12, 2024', category: 'General', priority: 'Medium', author: 'Principal Office' },
  { id: '2', title: 'Final Examination Guidelines', content: 'Please read the updated guidelines for the upcoming final examinations. All students must bring their ID cards.', date: 'Jun 10, 2024', category: 'Academic', priority: 'High', author: 'Exam Cell' },
  { id: '3', title: 'Annual Sports Day Registration', content: 'Registration for the annual sports day is now open. Interested students can sign up at the PE department.', date: 'Jun 08, 2024', category: 'Events', priority: 'Low', author: 'Sports Dept' },
];

export const Announcements = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
          <p className="text-sm text-slate-500">Stay updated with the latest news and updates from the institution.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <Plus className="w-5 h-5" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {['All', 'General', 'Academic', 'Events', 'Finance'].map((cat) => (
          <button key={cat} className={cn(
            "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
            cat === 'All' ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300"
          )}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {announcements.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className={cn(
              "absolute left-0 top-0 bottom-0 w-1",
              item.priority === 'High' ? "bg-rose-500" : item.priority === 'Medium' ? "bg-amber-500" : "bg-indigo-500"
            )}></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                    item.priority === 'High' ? "bg-rose-50 text-rose-600" : 
                    item.priority === 'Medium' ? "bg-amber-50 text-amber-600" : 
                    "bg-indigo-50 text-indigo-600"
                  )}>
                    {item.priority} Priority
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">• {item.category}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.content}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3 h-3" /> {item.author}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3 h-3" /> {item.date}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};