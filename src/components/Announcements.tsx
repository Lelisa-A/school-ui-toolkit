import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Tag, 
  Calendar, 
  User, 
  Send, 
  Bold, 
  Italic, 
  Link2, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export function Announcements() {
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const announcements = [
    { 
      id: 1, 
      title: 'Annual Sports Day 2023', 
      content: "We are excited to announce our upcoming Sports Day scheduled for next month. All students are encouraged to participate in at least one event. Registration forms are available in the physical education department.", 
      author: 'Admin Office', 
      date: '2 hours ago', 
      category: 'Event', 
      priority: 'high' 
    },
    { 
      id: 2, 
      title: 'New Library Hours', 
      content: 'The library will now remain open until 7:00 PM on weekdays to support students preparing for mid-term examinations. Weekend hours remain unchanged (9 AM - 2 PM).', 
      author: 'Library Dept', 
      date: '5 hours ago', 
      category: 'Update', 
      priority: 'medium' 
    },
    { 
      id: 3, 
      title: 'Parent-Teacher Meeting', 
      content: 'Reminder for the upcoming PTM for Grade 10-A. Please schedule your slots via the parent portal by Friday afternoon.', 
      author: 'Principal Office', 
      date: 'Yesterday', 
      category: 'Reminder', 
      priority: 'urgent' 
    },
  ];

  const handlePost = () => {
    if (!title || !content) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Announcement posted successfully!');
    setShowEditor(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-500">Broadcast important news and updates to the school community</p>
        </div>
        <button 
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {showEditor && (
            <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Create Announcement</h3>
                <button 
                  onClick={() => setShowEditor(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Announcement Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xl font-bold bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-1 p-2 bg-white border-b border-slate-100">
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Bold className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Italic className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Link2 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><ImageIcon className="w-4 h-4" /></button>
                    <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                    <select className="bg-transparent text-xs font-bold text-slate-500 outline-none px-2 cursor-pointer">
                      <option>Normal Text</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="Write your announcement content here..."
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent p-6 focus:ring-0 outline-none text-slate-700 leading-relaxed resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <select className="flex-1 sm:flex-none bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl px-4 py-2 outline-none">
                      <option>Category: Update</option>
                      <option>Category: Event</option>
                      <option>Category: Reminder</option>
                    </select>
                    <select className="flex-1 sm:flex-none bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl px-4 py-2 outline-none">
                      <option>Audience: All</option>
                      <option>Audience: Teachers</option>
                      <option>Audience: Parents</option>
                      <option>Audience: Students</option>
                    </select>
                  </div>
                  <button 
                    onClick={handlePost}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                  >
                    <Send className="w-4 h-4" />
                    Post Announcement
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {announcements.map((ann) => (
              <div key={ann.id} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1.5",
                  ann.priority === 'urgent' ? "bg-rose-500" :
                  ann.priority === 'high' ? "bg-amber-500" : "bg-indigo-500"
                )}></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">{ann.author}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{ann.date}</span>
                        <span className="text-slate-200">•</span>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{ann.category}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{ann.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{ann.content}</p>
                
                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-6">
                  <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    12 Comments
                  </button>
                  <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-400" />
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Sports', 'Exams', 'Holidays', 'Academics', 'Library', 'Fees', 'Uniforms', 'Graduation'].map(tag => (
                <button key={tag} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors">
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Calendar Events
            </h3>
            <div className="space-y-6">
              {[
                { date: 'NOV 18', title: 'Science Exhibition', time: '09:00 AM' },
                { date: 'NOV 22', title: 'Board Meeting', time: '02:00 PM' },
                { date: 'NOV 25', title: 'Teacher Training', time: 'All Day' },
              ].map((ev, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center justify-center min-w-[50px] h-14 bg-indigo-50 text-indigo-600 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{ev.date.split(' ')[0]}</span>
                    <span className="text-lg font-bold leading-none">{ev.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{ev.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}